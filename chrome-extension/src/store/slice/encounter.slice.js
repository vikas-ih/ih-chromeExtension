import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeaders } from "../apiConfig";
import { showToastSuccess } from "../../utilities/toast";
import { AxiosAmbient } from "../../lib";
import { showToastError } from "../../utilities/errortoast";

// Thunks
export const listEncounters = createAsyncThunk(
  "encounters/listEncounters",
  async ({ searchFilters, accessToken }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders(accessToken);
      const queryParams = new URLSearchParams(searchFilters).toString();

      const { data, status } = await AxiosAmbient.get(
        `/encounters?${queryParams}`,
        { headers }
      );

      if (status === 200) {
        return { encounters: data.encounters, total: data.total };
      } else {
        showToastError("Failed to load encounters");
        return rejectWithValue("Failed to load encounters");
      }
    } catch (error) {
      showToastError("Failed to load encounters");
      return rejectWithValue(error.message);
    }
  }
);

// New async thunk for getting encounter details
export const getEncounter = createAsyncThunk(
  "encounters/getEncounter",
  async (
    { encounter_id, callback, accessToken },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const headers = getAuthHeaders(accessToken);

      const result = await AxiosAmbient.get(`/encounters/${encounter_id}`, {
        headers,
      });
      const response = result?.data;

      if (result?.status === 200) {
        dispatch(encounterDetailsSlice(response));
        dispatch(setMobileRecord(true));

        // Check if the encounter is completed and has a summary
        if (response?.status === "completed" && response?.summary_id) {
          dispatch(getSummary(response?.summary_id, accessToken));
        }

        // Invoke callback if provided
        if (callback) callback(response);
        return response;
      } else {
        showToastError("Failed to load encounters");
        return rejectWithValue("Failed to load encounters");
      }
    } catch (error) {
      showToastError("Failed to load encounters");
      return rejectWithValue(error.message);
    }
  }
);

export const createEncounter = createAsyncThunk(
  "encounters/createEncounter",
  async ({ data, accessToken, callback }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(encounterCreateLoading(true)); // Start loading
      const headers = getAuthHeaders(accessToken);

      const result = await AxiosAmbient.post(`/encounters`, data, { headers });
      const response = result?.data;

      if (result?.status === 201) {
        dispatch(encounterDetailsSlice(response));
        if (callback) callback(response);
        return response;
      } else {
        showToastError("Failed to create encounter");
        return rejectWithValue("Failed to create encounter");
      }
    } catch (exception) {
      showToastError(`Error creating encounter: ${exception.message}`);
      return rejectWithValue(exception.message);
    } finally {
      dispatch(encounterCreateLoading(false)); // End loading
    }
  }
);

export const completeEncounter = createAsyncThunk(
  "encounters/completeEncounter",
  async (
    { encounter_id, encounterPhase, storedParams, accessToken },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(encounterCompleteLoading(true)); // Start loading
      const headers = getAuthHeaders(accessToken);
      const params = {
        encounter_phase: encounterPhase,
      };

      const result = await AxiosAmbient.post(
        `/encounters/${encounter_id}/complete`,
        {},
        { headers, params }
      );
      const response = result?.data;

      if (result?.status === 200) {
        dispatch(encounterDetailsSlice(response));
        dispatch(getEncounter({ encounter_id, accessToken }));
        dispatch(listEncounters({ searchFilters: storedParams, accessToken }));
        showToastSuccess("Generated note will be available shortly.");
        return response;
      } else {
        showToastError("Failed to complete encounter");
        return rejectWithValue("Failed to complete encounter");
      }
    } catch (error) {
      showToastError(`Error completing encounter: ${error.message}`);
      return rejectWithValue(error.message);
    } finally {
      dispatch(encounterCompleteLoading(false)); // End loading
    }
  }
);
export const updateEncounter = createAsyncThunk(
  "encounters/updateEncounter",
  async (
    {
      encounter_id,
      encounterPhase,
      data,
      params,
      showToastMessage = true,
      accessToken,
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const headers = getAuthHeaders(accessToken);
      const query_params = { encounter_phase: encounterPhase };

      const result = await AxiosAmbient.put(
        `/encounters/${encounter_id}`,
        data,
        { headers, params: query_params }
      );

      if (result?.status === 200) {
        showToastSuccess("Updated encounter");
        dispatch(listEncounters({ searchFilters: params, accessToken }));
        return result.data;
      } else {
        showToastError("Failed to update encounter");
        return rejectWithValue("Failed to update encounter");
      }
    } catch (error) {
      showToastError("Failed to update encounter");
      return rejectWithValue(error.message);
    }
  }
);

export const removeEncounter = createAsyncThunk(
  "encounters/removeEncounter",
  async (
    { encounter_id, storedParams, setSubmitLoading, accessToken },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const headers = getAuthHeaders(accessToken);
      const result = await AxiosAmbient.delete(`/encounters/${encounter_id}`, {
        headers,
      });

      if (result?.status === 200) {
        dispatch(listEncounters({ searchFilters: storedParams, accessToken }));
        showToastSuccess("Removed encounter");
        setSubmitLoading(false);
        return result.data;
      } else {
        showToastError("Failed to delete encounter");
        return rejectWithValue("Failed to delete encounter");
      }
    } catch (error) {
      showToastError("Failed to delete encounter");
      return rejectWithValue(error.message);
    }
  }
);
export const startEncounter = (
  encounter_id,
  encounter_phase,
  data,
  params,
  callback,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(encounterDetailsLoading(true)); // Start loading
    const headers = getAuthHeaders(accessToken);
    const query_params = { encounter_phase };

    try {
      const result = await AxiosAmbient.post(
        `/encounters/${encounter_id}/start`,
        data,
        { params: query_params, headers }
      );

      if (result?.status === 200) {
        dispatch(getEncounter({encounter_id, callback,accessToken}));
        dispatch(listEncounters({params,accessToken}));
      } else {
        showToastError("Failed to start encounter");
      }
    } catch (error) {
      showToastError(`Error starting encounter: ${error.message}`);
    } finally {
      dispatch(encounterDetailsLoading(false)); // End loading
    }
  };
};


export const getTranscription = createAsyncThunk(
  "encounters/getTranscription",
  async (
    { encounter_id, encounter_phase, accessToken },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(transcriptionLoading(true)); // Start loading
      const headers = getAuthHeaders(accessToken);

      const params = {
        encounter_id: encounter_id,
        encounter_phase: encounter_phase,
      };
      const result = await AxiosAmbient.get(`/transcriptions`, {
        headers,
        params,
      });
      const response = result?.data?.transcriptions;

      if (result?.status === 200) {
        dispatch(transcriptionbyIdSlice(response));
      } else {
        showToastError("Failed to load transcriptions");
        return rejectWithValue("Failed to load transcriptions");
      }
    } catch (error) {
      showToastError("Failed to load transcriptions");
      return rejectWithValue(error.message);
    } finally {
      dispatch(transcriptionLoading(false)); 
    }
  }
);

export const updateTranscription = createAsyncThunk(
  "encounters/updateTranscription",
  async (
    { transcription_id, data, accessToken, onSuccess, onError },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(transcriptionLoading(true)); // Start loading
      const headers = getAuthHeaders(accessToken);

      const result = await AxiosAmbient.put(
        `/transcriptions/${transcription_id}`,
        data,
        { headers }
      );
      const response = result?.data;

      if (result?.status === 200) {
        dispatch(transcriptionbyIdSlice([response]));
        if (onSuccess) onSuccess(response);
        return response;
      } else {
        if (onError) onError();
        return rejectWithValue("Failed to update transcription");
      }
    } catch (error) {
      if (onError) onError();
      showToastError("Failed to update transcription");
      return rejectWithValue(error.message);
    } finally {
      dispatch(transcriptionLoading(false)); // End loading
    }
  }
);


export const AuraDemoEncounter = createAsyncThunk(
  "encounters/AuraDemoEncounter",
  async ({ accessToken, cb }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(encounterDetailsLoading(true)); // Start loading
      const headers = getAuthHeaders(accessToken);

      const result = await AxiosAmbient.put(
        `/onboarding_demo`,
        {},
        { headers }
      );

      if (result?.status === 200) {
        if (cb) cb();
        // dispatch(settingsOrgFlag()); check
        return result.data;
      } else {
        return rejectWithValue("Failed to complete Aura demo encounter");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(encounterDetailsLoading(false)); // End loading
    }
  }
);

const initialState = {
  isEncounterListLoading: false,
  encounterList: [],
  encounterListCount: 0,
  isEncounterDetailsLoading: false,
  encounterDetails: "",
  isEncounterCreateLoading: false,
  newEncounter: "",
  isEncounterCompleteLoading: false,
  isEncounterRemoveLoading: false,
  selectedEncounter: "",
  istranscriptionLoading: false,
  transcriptionbyIdValue: [],
  mobileViewStatus: {},
  isMobileRecord: false,
  newEncounterfromMic: false,
  auraDemoConversation: [],
  error: null,
};

const encounterSlice = createSlice({
  name: "encounters",
  initialState,
  reducers: {
    encounterListLoading: (state, { payload }) => {
      state.isEncounterListLoading = payload;
    },
    encounterListSlice: (state, { payload }) => {
      state.encounterList = payload;
    },
    encounterListCountSlice: (state, { payload }) => {
      state.encounterListCount = payload;
    },
    encounterDetailsLoading: (state, { payload }) => {
      state.isEncounterDetailsLoading = payload;
    },
    encounterDetailsSlice: (state, { payload }) => {
      state.encounterDetails = payload;
    },
    encounterCreateLoading: (state, { payload }) => {
      state.isEncounterCreateLoading = payload;
    },
    selectedEncounterSlice: (state, { payload }) => {
      state.selectedEncounter = payload;
    },
    newEncounterSlice: (state, { payload }) => {
      state.newEncounter = payload;
    },
    encounterCompleteLoading: (state, { payload }) => {
      state.isEncounterCompleteLoading = payload;
    },
    encounterRemoveLoading: (state, { payload }) => {
      state.isEncounterRemoveLoading = payload;
    },
    transcriptionLoading: (state, { payload }) => {
      state.istranscriptionLoading = payload;
    },
    resetEncounterState: () => initialState,
    partialResetEncounterState: (state) => {
      state.encounterDetails = "";
      state.transcriptionbyIdValue = [];
    },
    transcriptionbyIdSlice: (state, { payload }) => {
      state.transcriptionbyIdValue = payload;
    },
    mobileViewStatusSlice: (state, { payload }) => {
      state.mobileViewStatus = payload;
    },
    setMobileRecord: (state, { payload }) => {
      state.isMobileRecord = payload;
    },
    newEncounterfromMicSlice: (state, { payload }) => {
      state.newEncounterfromMic = payload;
    },
    getAuraDemoConversationSlice: (state, { payload }) => {
      state.auraDemoConversation = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listEncounters.pending, (state) => {
        state.isEncounterListLoading = true;
        state.error = null;
      })
      .addCase(listEncounters.fulfilled, (state, action) => {
        state.isEncounterListLoading = false;
        state.encounterList = action.payload.encounters;
        state.encounterListCount = action.payload.total;
      })
      .addCase(listEncounters.rejected, (state, action) => {
        state.isEncounterListLoading = false;
        state.error =
          action.payload || "An error occurred while loading encounters";
      })
      .addCase(getEncounter.pending, (state) => {
        state.isEncounterDetailsLoading = true;
        state.error = null;
      })
      .addCase(getEncounter.fulfilled, (state, action) => {
        state.isEncounterDetailsLoading = false;
        state.encounterDetails = action.payload;
      })
      .addCase(getEncounter.rejected, (state, action) => {
        state.isEncounterDetailsLoading = false;
        state.error = action.payload || "Failed to load encounter details";
      })
      .addCase(updateEncounter.pending, (state) => {
        state.isEncounterDetailsLoading = true;
        state.error = null;
      })
      .addCase(updateEncounter.fulfilled, (state) => {
        state.isEncounterDetailsLoading = false;
      })
      .addCase(updateEncounter.rejected, (state, action) => {
        state.isEncounterDetailsLoading = false;
        state.error =
          action.payload || "An error occurred while updating the encounter";
      })
      .addCase(removeEncounter.pending, (state) => {
        state.isEncounterRemoveLoading = true;
        state.error = null;
      })
      .addCase(removeEncounter.fulfilled, (state) => {
        state.isEncounterRemoveLoading = false;
      })
      .addCase(removeEncounter.rejected, (state, action) => {
        state.isEncounterRemoveLoading = false;
        state.error =
          action.payload || "An error occurred while deleting the encounter";
      })
      .addCase(createEncounter.pending, (state) => {
        state.isEncounterCreateLoading = true;
        state.error = null;
      })
      .addCase(createEncounter.fulfilled, (state, action) => {
        state.isEncounterCreateLoading = false;
        state.encounterDetails = action.payload;
      })
      .addCase(createEncounter.rejected, (state, action) => {
        state.isEncounterCreateLoading = false;
        state.error = action.payload || "Failed to create encounter";
      })
      .addCase(completeEncounter.pending, (state) => {
        state.isEncounterCompleteLoading = true;
        state.error = null;
      })
      .addCase(completeEncounter.fulfilled, (state, action) => {
        state.isEncounterCompleteLoading = false;
        state.encounterDetails = action.payload;
      })
      .addCase(completeEncounter.rejected, (state, action) => {
        state.isEncounterCompleteLoading = false;
        state.error = action.payload || "Failed to complete encounter";
      })
      .addCase(getTranscription.pending, (state) => {
        state.istranscriptionLoading = true;
        state.error = null;
      })
      .addCase(getTranscription.fulfilled, (state, action) => {
        state.istranscriptionLoading = false;
        state.transcriptionbyIdValue = action.payload;
      })
      .addCase(getTranscription.rejected, (state, action) => {
        state.istranscriptionLoading = false;
        state.error = action.payload || "Failed to load transcriptions";
      })
     
  },
});

export const {
  encounterListLoading,
  encounterListSlice,
  encounterListCountSlice,
  encounterDetailsLoading,
  encounterDetailsSlice,
  encounterCreateLoading,
  selectedEncounterSlice,
  newEncounterSlice,
  encounterCompleteLoading,
  encounterRemoveLoading,
  transcriptionLoading,
  resetEncounterState,
  partialResetEncounterState,
  transcriptionbyIdSlice,
  mobileViewStatusSlice,
  setMobileRecord,
  newEncounterfromMicSlice,
  getAuraDemoConversationSlice,
} = encounterSlice.actions;

export default encounterSlice.reducer;
