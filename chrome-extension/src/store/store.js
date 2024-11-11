import { configureStore } from "@reduxjs/toolkit";
import encounterReducer from "./slice/encounter.slice";

const store = configureStore({
  reducer: {
    encounters: encounterReducer,
  },
});

export default store;
