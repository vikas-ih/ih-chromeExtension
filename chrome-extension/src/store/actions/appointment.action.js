import moment from "moment";
import { Axios } from "../../lib";
import {
  addRecentSearchConfig,
  appointmentTypeConfig,
  checkPatientDetailsConfig,
  convertAppointmentToAuraEncounterConfig,
  createAppointmentConfig,
  downloadCSVConfig,
  editAppointmentConfig,
  flagNameOrgConfig,
  getAllPractitionersNamesConfig,
  getAppointmentByFiltersConfig,
  getAppointmentByUuidConfig,
  getAppointmentCountDateConfig,
  getAppointmentDetailsbyUuidConfig,
  getAppointmentReminderConfig,
  getAppointmentsSummaryConfig,
  getConditionByAppointmentTypeConfig,
  getConditionsConfig,
  getDoctorAppointmentStatusConfig,
  getIntakeSummaryFeedbackConfig,
  getOrganizationSettingsMappingConfig,
  getPatientDetailsByOrgConfig,
  getPatientNamesConfig,
  getPractionerDetailsByOrgConfig,
  getRecentSearchConfig,
  getRegenerateIntakeConfig,
  notificationHistoryConfig,
  patientAutoCompleteConfig,
  patientNamesOrgConfig,
  practitionerNamesOrgConfig,
  practitionerPreferencesConfig,
  removeAppointmentConfig,
  settingsOrgFlagConfig,
  uploadCSVConfig,
  getAllAppointmentConfig,
  getAppointmentsByStatusConfig,
} from "../../utilities/appointment.url";

import {
  appointmentLoading,
  appointmentTypesSlice,
  apptsAPICallSlice,
  apptsTotalSlice,
  bulkAppointmentHistoryLoadingSlice,
  bulkAppointmentHistorySlice,
  csvColumnMappingsLoadingSlice,
  csvDownloadDataSlice,
  existingPatientDetailsSlice,
  filteredApptsTotalSlice,
  flagNameOrgSlice,
  getAllPractitionersNamesSlice,
  getAppointmentByFilterSlice,
  getAppointmentCountDateSlice,
  getAppointmentDetailsByUuidSlice,
  getAppointmentStatusMappingsLoadingSlice,
  getAppointmentStatusMappingsSlice,
  getAppointmentUuidSlice,
  getAppointmentsByStatusSlice,
  getAppointmentsSummarySlice,
  getCSVColumnMappingsSlice,
  getCSVTimezoneLoadingSlice,
  getCSVTimezoneSlice,
  getConditionByAppointmentTypeSlice,
  getConditionByPractitionerLoadingSlice,
  getConditionMappingsLoadingSlice,
  getConditionMappingsSlice,
  getConditionSlice,
  getDoctorAppointmentStatusSlice,
  getLookbackPeriodsLoadingSlice,
  getLookbackPeriodsSlice,
  getNewIntakeSummary,
  getNotificationHistorySlice,
  getPatientNamesListSlice,
  getPractitionerPreferencesSlice,
  getPractitionersAndPatientsSlice,
  getProviderMappingsSlice,
  getRecentSearchSlice,
  isApptDeleted,
  isUUIDover,
  patientAutoCompleteSlice,
  patientNamesOrgSlice,
  practitionerNamesOrgbyIdSlice,
  providerMappingsLoadingSlice,
  remainderPatientApptsSlice,
  scheduleLoading,
  selfAPILoadingSlice,
  settingsOrgFlagSlice,
  showPractitionerEmailTagSlice,
} from "../slice/appointment.slice";
import { getAuthHeaders } from "../apiConfig";
import { getFromStorage, storeInLocal } from "../../lib/storage";
import { currentPractitionerJson } from "../../mocks/currentPractitoner";
import { showToastError } from "../../utilities/errortoast";
import { showToastSuccess } from "../../utilities/toast";
import store from "../store";
import { getErrorCode } from "../slice/auth.slice";

export const editAppointmentAction = (
  appt_uuid,
  payload,
  setIsOpen,
  setConditionByType,
  setNotifications,
  setUpdatedEmailsArray,
  startIndex,
  setSendNow,
  isfilterOn,
  setSubmitLoading,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = editAppointmentConfig(appt_uuid);
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.put(url, payload, { headers });
      if (result?.status === 200) {
        setIsOpen(false);
        setSubmitLoading(false);
        showToastSuccess("Appointment edited successfully");
        setConditionByType([]);
        setNotifications([]);
        setUpdatedEmailsArray([]);
        setSendNow(false);
        dispatch(getSettingsNotificationsSlice(null));
        if (isfilterOn) {
          dispatch(
            getAppointmentByFilter(
              null,
              null,
              null,
              null,
              null,
              "reload",
              startIndex,
              accessToken
            )
          );

          dispatch(appointmentLoading(true));
        } else {
          dispatch(getAppointmentsByStatus(startIndex, accessToken));
        }
        dispatch(getAppointmentPractitionerAndPatients(accessToken));
      }
    } catch (e) {}
  };
};

export const settingsOrgFlag = (accessToken) => {
  return async (dispatch) => {
    dispatch(selfAPILoadingSlice(true));
    try {
      const { url } = settingsOrgFlagConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(settingsOrgFlagSlice(response));
      }
    } catch (e) {
    } finally {
      dispatch(selfAPILoadingSlice(false));
    }
  };
};

export const getAppointmentPractitionerAndPatients = (accessToken) => {
  return async (dispatch) => {
    try {
      const { url: urlPatient } = getPatientDetailsByOrgConfig();
      const { url: urlPractitioner } = getPractionerDetailsByOrgConfig();
      const headers = getAuthHeaders(accessToken);

      const [resultPatient, resultPractitioner] = await Promise.all([
        Axios.get(urlPatient, { headers }),
        Axios.get(urlPractitioner, { headers }),
      ]);

      const patients = resultPatient?.data?.patients ?? [];
      const practitioners = resultPractitioner?.data?.practitioners ?? [];

      const response = {
        practitioner: practitioners,
        patient: patients,
      };

      dispatch(getPractitionersAndPatientsSlice(response));
    } catch (e) {}
  };
};

export const getAppointmentsByStatus = (
  itemsPerPage,
  fetchCounter,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(filteredApptsTotalSlice(null));
    fetchCounter === 0 ? dispatch(apptsAPICallSlice(true)) : "";
    fetchCounter === undefined ? dispatch(appointmentLoading(true)) : "";
    let { currentPractitioner } = store.getState().practitionerState;
    // let currentPractitioner = currentPractitionerJson;
    try {
      const tz = moment.tz.guess();
      const { url } = getAppointmentsByStatusConfig(itemsPerPage, tz);
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);
      const result = await Axios.get(url, { headers });
      dispatch(appointmentLoading(false));
      const response = result?.data?.appointments;
      if (result?.status === 200 && response) {
        await dispatch(getAppointmentsByStatusSlice(response));
        dispatch(apptsTotalSlice(result?.data?.total));
        dispatch(getAppointmentUuidSlice(""));
        dispatch(getNewIntakeSummary(null));
        dispatch(revaiResponse(null));
        dispatch(physicalExamRevAiResponseSlice(null));
        dispatch(diagnosticsRevAiResponseSlice(null));
        dispatch(assessmentRevAiResponseSlice(null));
        dispatch(physicalExaminationSlice(null));
        dispatch(diagnosticImagingSlice(null));
        dispatch(planSlice(null));
        dispatch(appointmentLoading(false));

        if (localStorage.getItem("appointment_view") !== "CALENDAR") {
          storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_practitioner_id`,
            ""
          );
          storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_patient_name`,
            ""
          );
        }
        storeInLocal(`${currentPractitioner?.org_uuid}_filter_startDate`, "");
        storeInLocal(`${currentPractitioner?.org_uuid}_filter_endDate`, "");
        storeInLocal(`${currentPractitioner?.org_uuid}_filter_birthDate`, "");
        storeInLocal(`${currentPractitioner?.org_uuid}_filter_status`, "");
        storeInLocal(
          `${currentPractitioner?.org_uuid}_isPatientSelected`,
          false
        );

        dispatch(apptsAPICallSlice(false));
      }
    } catch (e) {
      dispatch(appointmentLoading(false));
      getErrorCode(500);
    }
  };
};

export const getAppointmentDetailsByUuidAction = (
  appt_uuid,
  setEditAppointmentOpen,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(appointmentLoading(true));
    try {
      const { url } = getAppointmentDetailsbyUuidConfig(appt_uuid);
      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(appointmentLoading(false));
        setEditAppointmentOpen(true);
        dispatch(getAppointmentDetailsByUuidSlice(response));
        dispatch(
          getConditionByAppointmentType(
            response?.appointment_details?.practitioner_id,
            response?.appointment_details?.appointment_type_id,
            false,
            accessToken
          )
        );
        const body = {
          practitioner_id: response?.appointment_details?.practitioner_id,
          condition_id: response?.appointment_details?.condition_id,
        };
        dispatch(getPractitionerPreferences(body, accessToken));
      }
    } catch (e) {
      dispatch(appointmentLoading(false));
      showToastError("Unable to view the appointment");
    }
  };
};

export const getPractitionerPreferences = (
  body,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = practitionerPreferencesConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, body, { headers });
      let response = result?.data?.response?.preferences;
      let notification_reponse = result?.data;
      if (result?.status === 200) {
        if (response?.length == 0) {
          response = [{ notification: "", number_of: "", duration: "" }];
        }
        dispatch(
          getPractitionerPreferencesSlice(
            response.error
              ? {
                  notification_preference: [
                    { notification: "", number_of: "", duration: "" },
                  ],
                  emails: [],
                }
              : response
          )
        );
        // setFieldValue(
        //   "notifications",
        //   response?.notification_preference &&
        //     response?.notification_preference.length
        //     ? response?.notification_preference
        //     : []
        // );
      }
    } catch (e) {
      showToastError("Unable to edit the appointment", e);
      console.log("error", e);
    }
  };
};

export const patientNamesOrgAction = (accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = patientNamesOrgConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(patientNamesOrgSlice(response));
      }
    } catch (e) {}
  };
};
export const patientAutoCompleteAction = (
  patientId,
  setFieldValue,
  setShowExistingFlag,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = patientAutoCompleteConfig(patientId);
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data;
      const digits = response?.birth_date.replace(/-/g, "");
      const rearrangedDigits =
        digits.slice(4, 6) + digits.slice(6) + digits.slice(0, 4);
      if (result?.status === 200) {
        dispatch(patientAutoCompleteSlice(response));
        setFieldValue("first_name", response?.first_name);
        setFieldValue("last_name", response?.last_name);
        setFieldValue("preferred_name", response?.preferred_name);
        setFieldValue("phone_text", response?.phone_text.replace(/^(\+1)/, ""));
        setFieldValue("email_text", response?.email_text);
        setFieldValue("birth_date", rearrangedDigits);
        setShowExistingFlag(true);
      }
    } catch (e) {}
  };
};

export const getConditionByAppointmentType = (
  practitionerId,
  radioButtonValue,
  type,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(getConditionByPractitionerLoadingSlice(true));
    try {
      const { url } = getConditionByAppointmentTypeConfig();
      const token = FronteggContext.getAccessToken();
      const body = {
        practitioner_id: practitionerId,
        appointment_type_id: radioButtonValue,
        appt_creation: type,
      };
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, body, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(getConditionByAppointmentTypeSlice(response));
        dispatch(showPractitionerEmailTagSlice(true));
        dispatch(getConditionByPractitionerLoadingSlice(false));
      }
    } catch (e) {
      dispatch(getConditionByPractitionerLoadingSlice(false));
    }
  };
};

// Notification History
export const notificationHistory = (
  payload,
  setIsnotificationHistoryOpen,
  accessToken
) => {
  return async (dispatch) => {
    dispatch(appointmentLoading(true));
    try {
      let { url } = notificationHistoryConfig();

      //   const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, payload, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(appointmentLoading(false));
        setIsnotificationHistoryOpen(true);
        dispatch(getNotificationHistorySlice(response));
      }
    } catch (e) {
      showToastError("Error occurred");
      dispatch(appointmentLoading(false));
      setIsnotificationHistoryOpen(false);
    }
  };
};

// Appointment Table Filter values API
export const getAppointmentByFilter = (
  practitioner_ids = [],
  patient_name = "",
  startDate = "",
  endDate = "",
  status = "",
  type,
  itemsPerPage,
  accessToken
) => {
  return async (dispatch) => {
    type === "normal" ? dispatch(appointmentLoading(true)) : null;
    try {
      const tz = moment.tz.guess();
      const { url } = getAppointmentByFiltersConfig(itemsPerPage, tz);
      // let { currentPractitioner } = store
      let { currentPractitioner } = store.getState().practitionerState;

      // let currentPractitione r = currentPractitionerJson;

      type === "normal"
        ? storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_practitioner_id`,
            practitioner_ids
          )
        : null;
      type === "normal" &&
      localStorage.getItem("appointment_view") !== "CALENDAR"
        ? storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_patient_name`,
            patient_name || ""
          )
        : "";
      type === "normal"
        ? storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_startDate`,
            startDate || ""
          )
        : "";
      type === "normal"
        ? storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_endDate`,
            endDate || ""
          )
        : "";
      type === "normal"
        ? storeInLocal(
            `${currentPractitioner?.org_uuid}_filter_status`,
            status || ""
          )
        : "";
      const storedPractitionerIds = getFromStorage(
        `${currentPractitioner?.org_uuid}_filter_practitioner_id`
      );
      const splitIDS =
        storedPractitionerIds && storedPractitionerIds !== ""
          ? storedPractitionerIds.split(",")
          : [];
      const today = moment().format("YYYY-MM-DD");

      if (patient_name !== null) {
        patient_name === ""
          ? storeInLocal(
              `${currentPractitioner?.org_uuid}_isPatientSelected`,
              false
            )
          : storeInLocal(
              `${currentPractitioner?.org_uuid}_isPatientSelected`,
              true
            );
      }

      const data =
        type === "normal"
          ? {
              practitioner_ids: practitioner_ids || [],
              patient_name: patient_name || "",
              start_date: startDate !== "All Time" ? startDate : "",
              end_date: endDate !== "All Time" ? endDate : "",
              chat_completion_status: status || "",
            }
          : type === "reload"
          ? {
              practitioner_ids: splitIDS || [],
              patient_name:
                localStorage.getItem("appointment_view") !== "CALENDAR"
                  ? getFromStorage(
                      `${currentPractitioner?.org_uuid}_filter_patient_name`
                    ) || ""
                  : "",
              start_date:
                getFromStorage(
                  `${currentPractitioner?.org_uuid}_filter_startDate`
                ) === "All Time"
                  ? ""
                  : getFromStorage(
                      `${currentPractitioner?.org_uuid}_filter_startDate`
                    ) === null
                  ? today
                  : getFromStorage(
                      `${currentPractitioner?.org_uuid}_filter_startDate`
                    ),
              end_date:
                getFromStorage(
                  `${currentPractitioner?.org_uuid}_filter_endDate`
                ) === "All Time"
                  ? ""
                  : getFromStorage(
                      `${currentPractitioner?.org_uuid}_filter_endDate`
                    ) === null
                  ? today
                  : getFromStorage(
                      `${currentPractitioner?.org_uuid}_filter_endDate`
                    ),
              chat_completion_status:
                getFromStorage(
                  `${currentPractitioner?.org_uuid}_filter_status`
                ) || "",
            }
          : "";

      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, data, { headers });
      const response = result?.data?.Appointments;
      const remainderPatientAppts = result?.data?.reminder_patient_appt_count;
      if (result?.status === 200) {
        dispatch(remainderPatientApptsSlice(remainderPatientAppts));
        dispatch(getAppointmentByFilterSlice(response));
        dispatch(filteredApptsTotalSlice(result?.data?.total));
      }
      dispatch(appointmentLoading(false));
    } catch (e) {
      getErrorCode(500);
      console.log("e", e);
      dispatch(appointmentLoading(false));
    }
  };
};

// Remove Appointment by Id
export const removeAppointmentAction = (
  appt_uuid,
  setIsOpen,
  startIndex,
  isfilterOn,
  setSubmitLoading,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = removeAppointmentConfig(appt_uuid);
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.delete(url, { headers });
      if (result?.status === 200) {
        showToastSuccess("Appointment removed successfully");
        if (isfilterOn) {
          dispatch(
            getAppointmentByFilter(
              null,
              null,
              null,
              null,
              null,
              "reload",
              startIndex,
              accessToken
            )
          );
        } else {
          dispatch(getAppointmentsByStatus(startIndex, accessToken));
        }
        dispatch(getAppointmentPractitionerAndPatients(accessToken));
        setIsOpen(false);
        setSubmitLoading(false);
      }
    } catch (e) {
      showToastError("Failed to remove appointment");
      setIsOpen(false);
      setSubmitLoading(false);
    }
  };
};

// Get Appointment by UUID
export const getAppointmentByUuid = (uuid, accessToken) => {
  return async (dispatch) => {
    dispatch(scheduleLoading(true));
    try {
      const { url } = getAppointmentByUuidConfig();
      //   const token = FronteggContext.getAccessToken();
      // let currentPractitioner = currentPractitionerJson;
      let { currentPractitioner } = store.getState().practitionerState;
      const body = {
        appt_uuid: encodeURI(uuid),
      };
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, body, { headers });
      const response = result?.data;
      if (result?.status === 200 && response?.appointment_details) {
        // analytics.track('Viewed CareConnect Summary', {
        //   appointment_date: response?.appointment_details?.start_date,
        //   appointment_id: response?.appointment_details?.appointment_id,
        //   appointment_status:
        //     response?.appointment_details?.chat_completion_status,
        //   is_careconnect_summary_generated: 'True',
        //   practitioner_name: `${response?.appointment_details?.practitioner_firstName} ${response?.appointment_details?.practitioner_last_name}`,
        // });
        dispatch(getAppointmentUuidSlice(response));
        storeInLocal(
          `${currentPractitioner?.org_uuid}_practitioner_id`,
          response?.appointment_details?.practitioner_id
        );
        storeInLocal(
          `${currentPractitioner?.org_uuid}_condition_id`,
          response?.appointment_details?.condition_id
        );
        dispatch(scheduleLoading(false));
        dispatch(isUUIDover(true));
      }
      if (result?.status === 200 && response?.message) {
        dispatch(getAppointmentUuidSlice(response));
        dispatch(isApptDeleted(true));
        dispatch(isUUIDover(true));
      }
    } catch (e) {
      dispatch(scheduleLoading(false));
      getErrorCode(500);
    }
  };
};

// Get All Practitioners Names
export const getAllPractitionersNames = (body, accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = getAllPractitionersNamesConfig();
      // const token = FronteggContext.getAccessToken();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, body, { headers });
      const response = result?.data?.practitioners;
      if (result?.status === 200 && response) {
        dispatch(getAllPractitionersNamesSlice(response));
      }
    } catch (e) {
      getErrorCode(500);
    }
  };
};

export const sendAppointmentReminders = (
  appt_uuid,
  cachedUserEmail,
  accessToken
) => {
  return async (dispatch) => {
    try {
      let { url } = getAppointmentReminderConfig();
      url += `/${appt_uuid}`;

      const headers = getAuthHeaders(accessToken);

      const body = {
        sent_by: cachedUserEmail,
      };

      const result = await Axios.post(url, body, { headers });
      if (result?.status === 200) {
        showToastSuccess("Reminder sent to patient");
      }
    } catch (e) {
      showToastError("Could not send reminders", e);
    }
  };
};

export const appointmentTypesAction = (accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = appointmentTypeConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.get(url, { headers });
      const response = result?.data;
      if (result?.status === 200) {
        dispatch(appointmentTypesSlice(response?.appointment_types));
      }
    } catch (e) {}
  };
};

export const getRecentSearchAction = (screen, accessToken) => {
  return async (dispatch) => {
    try {
      const { url } = getRecentSearchConfig();
      const headers = getAuthHeaders(accessToken);

      const body = {
        screen: screen,
      };
      const result = await Axios.post(url, body, { headers });
      const response = result?.data;
      if (result.status === 200 && response) {
        dispatch(getRecentSearchSlice(response));
      }
    } catch (e) {
      showToastError("Error occurred");
    }
  };
};

export const checkPatientDetailsAction = (
  payload,
  setPatientModalOpen,
  setCheckExistingButtonFlag,
  setCheckPatientId,
  accessToken
) => {
  return async (dispatch) => {
    const { url } = checkPatientDetailsConfig();
    const headers = getAuthHeaders(accessToken);

    const result = await Axios.post(url, payload, { headers });
    const response = result?.data;
    if (result?.status === 200) {
      dispatch(existingPatientDetailsSlice(response));
      setPatientModalOpen(true);
      setCheckExistingButtonFlag(true);
      setCheckPatientId(null);
    }
  };
};

// Create Appointment
export const createAppointment = (
  data,
  setIsOpen,
  setConditionByType,
  setUpdatedEmailsArray,
  setRadioButtonvalue,
  startIndex,
  setSendNow,
  setCheckDOB,
  setCheckPhone,
  isfilterOn,
  setSubmitLoading,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const { url } = createAppointmentConfig();
      const headers = getAuthHeaders(accessToken);

      const result = await Axios.post(url, data, { headers });
      const response = result?.data;
      if (result?.status === 201 && response) {
        setSendNow(false);
        setIsOpen(false);
        setConditionByType([]);
        showToastSuccess("Patient appointment created");
        dispatch(getConditionByAppointmentTypeSlice({}));
        dispatch(patientAutoCompleteSlice({}));
        dispatch(getPractitionerPreferencesSlice([]));
        dispatch(getSettingsNotificationsSlice(null));
        setUpdatedEmailsArray([]);
        setRadioButtonvalue(1);
        dispatch(showPractitionerEmailTagSlice(false));
        setCheckDOB("");
        setCheckPhone("");
        setSubmitLoading(false);
        if (isfilterOn) {
          dispatch(
            getAppointmentByFilter(
              null,
              null,
              null,
              null,
              null,
              "reload",
              startIndex
            )
          );

          dispatch(appointmentLoading(true));
        } else {
          dispatch(getAppointmentsByStatus(startIndex, accessToken));
        }
        dispatch(getAppointmentPractitionerAndPatients(accessToken));
      }
    } catch (e) {
      getErrorCode(500);
      showToastError("Error creating appointment");
      dispatch(appointmentLoading(true));
      setSubmitLoading(false);
    }
  };
};
