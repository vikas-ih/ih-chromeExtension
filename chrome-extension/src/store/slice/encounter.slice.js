import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthHeaders } from "../apiConfig";
// import { showToastError } from "../../utilities/toast";
// import { AxiosAmbient } from "../../lib";
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
      });
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
