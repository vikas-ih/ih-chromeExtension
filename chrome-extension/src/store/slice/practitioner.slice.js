import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPractitioner: '',
  currentPractitionerLoading: false,
  currentPractitionerSettings: '',
  currentPractitionerSettingsLoading: false,
  currentPractitionerEntitlements: '',
  currentPractitionerEntitlementsLoading: false,
  practitionerList: [],
  practitionerListLoading: false,
  allPractitionerNames: [],
  allPractitionerNamesLoading: false,
};

const practitionerSlice = createSlice({
  name: 'practitionerSlice',
  initialState,
  reducers: {
    currentPractitioner: (state, { payload }) => {
      state.currentPractitioner = payload;
    },
    currentPractitionerLoading: (state, { payload }) => {
      state.currentPractitionerLoading = payload;
    },
    currentPractitionerSettings: (state, { payload }) => {
      state.currentPractitionerSettings = payload;
    },
    currentPractitionerSettingsLoading: (state, { payload }) => {
      state.currentPractitionerSettingsLoading = payload;
    },
    currentPractitionerEntitlements: (state, { payload }) => {
      state.currentPractitionerEntitlements = payload;
    },
    currentPractitionerEntitlementsLoading: (state, { payload }) => {
      state.currentPractitionerEntitlementsLoading = payload;
    },
    practitionerListSlice: (state, { payload }) => {
      state.practitionerList = payload;
    },
    practitionerListLoading: (state, { payload }) => {
      state.practitionerListLoading = payload;
    },
    allPractitionerNamesSlice: (state, { payload }) => {
      state.allPractitionerNames = payload;
    },
    allPractitionerNamesLoadingSlice: (state, { payload }) => {
      state.allPractitionerNamesLoading = payload;
    },
  },
});

const { actions, reducer } = practitionerSlice;

export const {
  currentPractitioner,
  currentPractitionerLoading,
  currentPractitionerSettings,
  currentPractitionerSettingsLoading,
  currentPractitionerEntitlements,
  currentPractitionerEntitlementsLoading,
  practitionerListSlice,
  practitionerListLoading,
  allPractitionerNamesSlice,
  allPractitionerNamesLoadingSlice,
} = actions;

export default reducer;
