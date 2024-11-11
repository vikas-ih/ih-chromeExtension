import { configureStore } from "@reduxjs/toolkit";
import encounterReducer from "./slice/encounter.slice";
import summaryReducer from "./slice/summary.slice";

const store = configureStore({
  reducer: {
    encounters: encounterReducer,
    summarySlice: summaryReducer,
  },
});

export default store;
