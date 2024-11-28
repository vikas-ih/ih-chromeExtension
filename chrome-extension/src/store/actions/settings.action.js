// import { FronteggContext } from "@frontegg/rest-api";
import { Axios } from "../../lib";
import {
  addPractitionerSettingsConfig,
  createSettingsConfig,
  getSettingsConfig,
  listSettingsPractitionersConfig,
  organizationTimeConfig,
} from "../../utilities/settings.url";
// import { showToastError } from "src/utilities/errortoast";
// import { showToastSuccess } from "src/utilities/toast";
// import {
//   getConditionByAppointmentTypeSlice,
//   getPractitionerPreferencesSlice,
// } from "../slices/appointments.slice";
import {
  getSettingsNotificationsSlice,
  listPractitionerNamesSlice,
} from "../slice/settings.slice";
// import { getAllPractitionersNames } from "./appointment.action";
import { showToastError } from "../../utilities/errortoast";
import { showToastSuccess } from "../../utilities/toast";
import {
  getConditionByAppointmentTypeSlice,
  getPractitionerPreferencesSlice,
} from "../slice/appointment.slice";
import { getAllPractitionersNames } from "./appointment.action";
import { getAuthHeaders } from "../apiConfig";

export const createSettingsAction = (
  payload,
  setUpdatedEmailsArray,
  setNotifications,
  setStoreConditionId,
  setStorePractitionerId,
  setStoreRadioButton,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = createSettingsConfig();
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, payload, { headers });
      if (result?.status === 200) {
        dispatch(getPractitionerPreferencesSlice(null));
        dispatch(getConditionByAppointmentTypeSlice(null));
        dispatch(getSettingsNotificationsSlice([]));
        setUpdatedEmailsArray([]);
        setNotifications([{ number_of: "", duration: "" }]);
        setStoreConditionId(undefined);
        setStorePractitionerId(undefined);
        setStoreRadioButton(1);
        showToastSuccess("Notification settings saved");
        const payload = {
          is_new_appointment: false,
        };
        dispatch(getAllPractitionersNames(payload, accestoken));
      }
    } catch (e) {
      showToastError("Notification settings not saved");
    }
  };
};

export const getSettingsNotifications = (body, accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = getSettingsConfig();
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, body, { headers });
      const response = result?.data;
      if (result?.status === 200 && response) {
        dispatch(getSettingsNotificationsSlice(response));
      }
    } catch (e) {}
  };
};

export const listSettingsPractitionersAction = (accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = listSettingsPractitionersConfig();
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data?.practitioners_data;
      if (result?.status === 200) {
        dispatch(listPractitionerNamesSlice(response));
      }
    } catch {}
  };
};

export const addPractitionerSettings = (payload, accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = addPractitionerSettingsConfig();
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, payload, { headers });
      if (result?.status === 200) {
        // dispatch(getAllPractitionersNames())
        // dispatch(listSettingsPractitionersAction())
        showToastSuccess("Saved");
      }
    } catch {
      showToastError("Error occurred");
    }
  };
};

export const createOrganizationTime = (payload, accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = organizationTimeConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, payload, { headers });
      if (result?.status === 200) {
        showToastSuccess("Organization settings saved");
      }
    } catch (e) {
      showToastError("Error occurred");
    }
  };
};

// export const getOrgSetting = (org_uuid, accessToken) => {
//   return async () => {
//     try {
//       const token = FronteggContext.getAccessToken();
//       const headers = {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//         "Impersonate-Org-UUID": `${org_uuid}`,
//       };
//       const result = await Axios.get(`/organization_setting`, { headers });
//       if (result?.status === 200) {
//         const setting = result?.data?.setting ?? {};
//         return setting;
//       }
//     } catch {
//       showToastError("Error occurred");
//       return {};
//     }
//   };
// };

// export const setBulkCSVUploadSetting = (org_uuid, payload, accessToken) => {
//   return async (dispatch) => {
//     try {
//       const token = FronteggContext.getAccessToken();
//       const headers = {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//         "Impersonate-Org-UUID": `${org_uuid}`,
//       };
//       const result = await Axios.put(`/organization_setting`, payload, {
//         headers,
//       });
//       if (result?.status === 200) {
//         showToastSuccess(
//           `CSV bulk uploads ${
//             payload?.settings?.enable_bulk_appointment_upload
//               ? "enabled"
//               : "disabled"
//           }`
//         );
//       }
//     } catch (e) {
//       showToastError("Error occurred");
//     }
//   };
// };
