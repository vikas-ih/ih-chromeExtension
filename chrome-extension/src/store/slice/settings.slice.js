import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listPractitionerNames: {},
  getNotificationsDetails: {},
};

const appointmentSettingsSlice = createSlice({
  name: "appointmentSettingsSlice",
  initialState,
  reducers: {
    getSettingsNotificationsSlice: (state, { payload }) => {
      state.getNotificationsDetails = payload;
    },
    listPractitionerNamesSlice: (state, { payload }) => {
      state.listPractitionerNames = payload;
    },
  },
});

const { actions, reducer } = appointmentSettingsSlice;

export const { getSettingsNotificationsSlice, listPractitionerNamesSlice } =
  actions;

export default reducer;
