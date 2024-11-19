import { Axios } from "../../lib";

import { showToastError } from "../../utilities/errortoast";
import { showToastSuccess } from "../../utilities/toast";
import { currentPractitioner, currentPractitionerLoading } from "../slice/practitioner.slice";
import {
  CSVUploadEnabledForCurrentUserSlice,
  settingsOrgFlagSlice,
} from "../slice/appointment.slice";
import {
  allPractitionerNamesLoadingSlice,
  allPractitionerNamesSlice,
  currentPractitionerEntitlements,
  currentPractitionerEntitlementsLoading,
  currentPractitionerSettings,
  currentPractitionerSettingsLoading,
  practitionerListLoading,
  practitionerListSlice,
} from "../slice/practitioner.slice";
import { getAuthHeaders } from "../apiConfig";

// Get details about the logged in practitioner
export const getCurrentPractitioner = (accessToken) => {
  return async (dispatch) => {
    dispatch(currentPractitionerLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(`/self`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(currentPractitioner(response));
      dispatch(settingsOrgFlagSlice(response));
      dispatch(
        CSVUploadEnabledForCurrentUserSlice(
          response?.org_settings?.enable_bulk_appointment_upload ?? false
        )
      );
    } else {
      currentPractitioner({});
      showToastError("Failed to fetch details about logged in practitioner.");
    }
    dispatch(currentPractitionerLoading(false));
  };
};

export const getCurrentPractitionerSettings = (accessToken) => {
  return async (dispatch) => {
    dispatch(currentPractitionerSettingsLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(`/self/settings`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(currentPractitionerSettings(response));
    } else {
      currentPractitioner({});
      showToastError("Failed to fetch practitioner settings.");
    }
    dispatch(currentPractitionerSettingsLoading(false));
  };
};

export const getCurrentPractitionerEntitlements = (accessToken) => {
  return async (dispatch) => {
    dispatch(currentPractitionerEntitlementsLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(`/self/entitlements`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(currentPractitionerEntitlements(response));
    } else {
      currentPractitionerEntitlements({});
      showToastError("Failed to fetch practitioner entitlements.");
    }
    dispatch(currentPractitionerEntitlementsLoading(false));
  };
};

export const updateCurrentPractitionerSettings = (data, accessToken) => {
  return async (dispatch) => {
    dispatch(currentPractitionerSettingsLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.put(`/self/settings`, data, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(currentPractitionerSettings(response));
    } else {
      currentPractitionerSettings({});
      showToastError("Failed to update practitioner settings.");
    }
    dispatch(currentPractitionerSettingsLoading(false));
  };
};

export const listPractitioners = (accessToken) => {
  return async (dispatch) => {
    dispatch(practitionerListLoading(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(`/practitioners`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(practitionerListSlice(response?.practitioners));
    } else {
      practitionerListSlice([]);
      showToastError("Failed to fetch details about logged in practitioner.");
    }
    dispatch(practitionerListLoading(false));
  };
};

export const listPractitionersFromOrg = (org_uuid, accessToken) => {
  return async (dispatch) => {
    dispatch(allPractitionerNamesLoadingSlice(true));
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.get(`/practitioner/all`, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(allPractitionerNamesSlice(response?.practitioners_data));
    } else {
      allPractitionerNamesSlice([]);
      showToastError("Failed to fetch details about logged in practitioner.");
    }
    dispatch(allPractitionerNamesLoadingSlice(false));
  };
};
