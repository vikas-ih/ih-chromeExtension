import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTemplateListLoading: false,
  templateList: [],

  isTemplateOverridesListLoading: false,
  templateOverridesList: [],

  currentTemplateLoading: false,
  currentTemplate: {},

  dotPhraseOverridesList: [],
  selectedDotPhraseOverrides: null,
  isDotPhraseOverridesListLoading: false,
  dotPhraseOverridesUpdateLoading: false,
  dotPhraseOverridesCreateLoading: false,
  dotPhraseOverridesDeleteLoading: false,
  childOrganizations: [],
  practitionersByOrgs: [],
  practitionersByOrgsLoading: false,
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    templateListLoading: (state, { payload }) => {
      state.isTemplateListLoading = payload;
    },
    templateListSlice: (state, { payload }) => {
      state.templateList = payload;
    },
    templateOverridesListLoading: (state, { payload }) => {
      state.isTemplateOverridesListLoading = payload;
    },
    templateOverridesListSlice: (state, { payload }) => {
      state.templateOverridesList = payload;
    },
    currentTemplateLoadingSlice: (state, { payload }) => {
      state.currentTemplateLoading = payload;
    },
    currentTemplateSlice: (state, { payload }) => {
      state.currentTemplate = payload;
    },
    resetSummaryState: () => {
      return initialState;
    },
    dotPhraseOverridesListSlice: (state, { payload }) => {
      state.dotPhraseOverridesList = payload;
    },
    selectedDotPhraseOverridesSlice: (state, { payload }) => {
      state.selectedDotPhraseOverrides = payload;
    },
    dotPhraseOverridesListLoading: (state, { payload }) => {
      state.isDotPhraseOverridesListLoading = payload;
    },
    dotPhraseOverridesUpdateLoadingSlice: (state, { payload }) => {
      state.dotPhraseOverridesUpdateLoading = payload;
    },
    dotPhraseOverridesCreateLoadingSlice: (state, { payload }) => {
      state.dotPhraseOverridesCreateLoading = payload;
    },
    dotPhraseOverridesDeleteLoadingSlice: (state, { payload }) => {
      state.dotPhraseOverridesDeleteLoading = payload;
    },
    childOrganizationsSlice: (state, { payload }) => {
      state.childOrganizations = payload;
    },
    practitionersByOrgsSlice: (state, { payload }) => {
      state.practitionersByOrgs = payload;
    },
    practitionersByOrgsLoadingSlice: (state, { payload }) => {
      state.practitionersByOrgsLoading = payload;
    },
  },
});

const { actions, reducer } = settingsSlice;

export const {
  templateListLoading,
  templateListSlice,
  templateOverridesListLoading,
  templateOverridesListSlice,
  currentTemplateLoadingSlice,
  currentTemplateSlice,
  resetSummaryState,
  dotPhraseOverridesListSlice,
  selectedDotPhraseOverridesSlice,
  dotPhraseOverridesListLoading,
  dotPhraseOverridesUpdateLoadingSlice,
  dotPhraseOverridesCreateLoadingSlice,
  dotPhraseOverridesDeleteLoadingSlice,
  childOrganizationsSlice,
  practitionersByOrgsSlice,
  practitionersByOrgsLoadingSlice,
} = actions;

export default reducer;
