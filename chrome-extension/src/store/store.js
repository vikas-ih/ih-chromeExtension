import { configureStore } from "@reduxjs/toolkit";
import encounterReducer from "./slice/encounter.slice";
import summaryReducer from "./slice/summary.slice";
import settingsReducer from "./slice/settings";
import appointmentReducer from "./slice/appointment.slice";
import appointmentSettingsReducer from "./slice/settings.slice";


const store = configureStore({
  reducer: {
    encounters: encounterReducer,
    summarySlice: summaryReducer,
    settingsState: settingsReducer,
    appointmentState: appointmentReducer,
    appointmentSettingsState: appointmentSettingsReducer,
  },
});

export default store;
