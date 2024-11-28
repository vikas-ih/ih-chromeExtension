import axiosMain from "axios";

export const axios = axiosMain.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const axiosAmbient = axiosMain.create({
  baseURL: import.meta.env.VITE_AMBIENT_API_BASE_URL,
});

export const axiosAdmin = axiosMain.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
});

//env