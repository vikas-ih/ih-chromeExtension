import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSummaryDetailsLoading: false,
  summaryDetails: "",

  isSummaryListLoading: false,
  summaryList: [],

  icd10SummaryLoading: false,
  icd10Summary: [],

  isSummaryRegenerationLoading: false,
  summaryExportLoading: false,
  summaryRating: 0,

  cptCodesSummaryLoading: false,
  cptCodesSummary: [],
};

const summarySlice = createSlice({
  name: "summarySlice",
  initialState,
  reducers: {
    summaryDetailsLoading: (state, { payload }) => {
      state.isSummaryDetailsLoading = payload;
    },
    summaryDetailsSlice: (state, { payload }) => {
      state.summaryDetails = payload;
    },
    summaryListLoading: (state, { payload }) => {
      state.isSummaryListLoading = payload;
    },
    summaryListSlice: (state, { payload }) => {
      state.summaryList = payload;
    },
    icd10SummaryLoading: (state, { payload }) => {
      state.icd10SummaryLoading = payload;
    },
    icd10SummarySlice: (state, { payload }) => {
      state.icd10Summary = payload;
    },
    cptCodesSummarySlice: (state, { payload }) => {
      state.cptCodesSummary = payload;
    },
    cptCodesSummaryLoading: (state, { payload }) => {
      state.cptCodesSummaryLoading = payload;
    },
    summaryRegenerationLoading: (state, { payload }) => {
      state.isSummaryRegenerationLoading = payload;
    },
    summaryExportLoading: (state, { payload }) => {
      state.summaryExportLoading = payload;
    },
    resetSummaryState: () => {
      return initialState;
    },
    summaryRatingSlice: (state, { payload }) => {
      state.summaryRating = payload;
    },
  },
});

const { actions, reducer } = summarySlice;

export const {
  summaryDetailsLoading,
  summaryDetailsSlice,
  summaryListLoading,
  summaryListSlice,
  icd10SummaryLoading,
  icd10SummarySlice,
  summaryRegenerationLoading,
  summaryExportLoading,
  resetSummaryState,
  summaryRatingSlice,
  cptCodesSummarySlice,
  cptCodesSummaryLoading,
} = actions;

export default reducer;
