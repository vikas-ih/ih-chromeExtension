import { configureStore } from "@reduxjs/toolkit";
import encounterReducer from "./slice/encounter.slice";
import summaryReducer from "./slice/summary.slice";
import settingsReducer from "./slice/settings";

const store = configureStore({
  reducer: {
    encounters: encounterReducer,
    summarySlice: summaryReducer,
    settingsState: settingsReducer,
  },
});

export default store;
