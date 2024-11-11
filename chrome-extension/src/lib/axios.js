import axiosMain from "axios";

export const axios = axiosMain.create({
  baseURL: "https://api.lumi.build/care",
});

export const axiosAmbient = axiosMain.create({
  baseURL: "https://ambient.api.lumi.build",
});

export const axiosAdmin = axiosMain.create({
  baseURL: "https://admin.api.lumi.build",
});

//env