import { configureStore } from "@reduxjs/toolkit";
import encounterReducer from "./slice/encounter.slice";
import summaryReducer from "./slice/summary.slice";
import settingsReducer from "./slice/settings";
import appointmentReducer from "./slice/appointment.slice";
import appointmentSettingsReducer from "./slice/settings.slice";
import practitionerReducer from "./slice/practitioner.slice";
import authReducer from "./slice/auth.slice";
const store = configureStore({
  reducer: {
    authState: authReducer,
    encounters: encounterReducer,
    summarySlice: summaryReducer,
    settingsState: settingsReducer,
    appointmentState: appointmentReducer,
    appointmentSettingsState: appointmentSettingsReducer,
    practitionerState: practitionerReducer,
  },
});

export default store;
