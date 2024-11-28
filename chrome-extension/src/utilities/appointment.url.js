export const getAllAppointmentConfig = () => ({
  url: `/get_all_appointments`,
});

// Get Appointments By Status

export const getAppointmentsByStatusConfig = (itemsPerPage, tz) => ({
  url: `/get_appointment/status?page=1&per_page=${itemsPerPage}&sort_by=start_date&sort_direction=desc&tz=${tz}`,
});

//  Get Appointment by UUID

export const getAppointmentByUuidConfig = () => ({
  url: `/get_appointment/uuid`,
});

export const getAppointmentByFiltersConfig = (itemsPerPage, tz) => ({
  url: `/get_appointment/filters?page=1&per_page=${itemsPerPage}&sort_by=start_date&sort_direction=desc&tz=${tz}`,
});

// creating a appointment url
export const createAppointmentConfig = () => ({
  url: `/patientAppointment`,
});

// Get Appointment Status
export const getDoctorAppointmentStatusConfig = () => ({
  url: `/appointmentStatus`,
});

// Get All Practitioners Name
export const getAllPractitionersNamesConfig = () => ({
  url: `/practitioner_names`,
});

// Get Condition
export const getConditionsConfig = () => ({
  url: `/condition/specialty`,
});

// Get Appointment Count Datewise For Anymonth
export const getAppointmentCountDateConfig = (year, month) => ({
  url: `/appointmentCount/${year}/${month}`,
});

//Regenerate Intake Summary
export const getRegenerateIntakeConfig = () => ({
  url: `/regenerate_summary`,
});

//Update Intake Summary feedback
export const getIntakeSummaryFeedbackConfig = () => ({
  url: `/intake_summary_feedback`,
});

//send Intake reminders via email & sms
export const getAppointmentReminderConfig = () => ({
  url: `/send_appointment_reminders`,
});

// Remove Appointments
export const removeAppointmentConfig = (id) => ({
  url: `/delete_appointment/${id}`,
});

export const appointmentTypeConfig = () => ({
  url: `/appointment_types`,
});

export const getConditionByAppointmentTypeConfig = () => ({
  url: `/appointment/type`,
});

export const patientAutoCompleteConfig = (id) => ({
  url: `/autocomplete/${id}`,
});

export const patientNamesOrgConfig = () => ({
  url: `/get_patients`,
});

export const practitionerNamesOrgConfig = () => ({
  url: `/practitioner/org/`,
});

export const flagNameOrgConfig = () => ({
  url: `/organization/`,
});

export const settingsOrgFlagConfig = () => ({
  url: `/self`,
});

export const practitionerPreferencesConfig = () => ({
  url: `/notification_preference`,
});

export const getAppointmentDetailsbyUuidConfig = (id) => ({
  url: `/get_appointment/${id}`,
});

export const editAppointmentConfig = (id) => ({
  url: `/edit_appointment/${id}`,
});

export const convertAppointmentToAuraEncounterConfig = (id) => ({
  url: `/appointment_convert_to_aura_encounter/${id}`,
});

export const practitionerPatientsConfig = (id) => ({
  url: `/get_appointment/names`,
});

export const checkPatientDetailsConfig = () => ({
  url: `/patient/check`,
});

export const notificationHistoryConfig = () => ({
  url: `/appointment_notifications`,
});

export const getRecentSearchConfig = () => ({
  url: `/get_recent_search`,
});
// test formatter
export const addRecentSearchConfig = () => ({
  url: `/add_recent_search`,
});

export const downloadCSVConfig = () => ({
  url: `/download_csv`,
});

export const uploadCSVConfig = () => ({
  url: `/upload_csv`,
});

export const getPatientNamesConfig = () => ({
  url: `/get_patient/names`,
});

export const getOrganizationSettingsMappingConfig = (key) => ({
  url: `/organization_settings?key=${key}`,
});

export const getAppointmentsSummaryConfig = () => ({
  url: '/get_appointments_summary',
});

export const getPatientDetailsByOrgConfig = () => ({
  url: '/v2/patients',
});

export const getPractionerDetailsByOrgConfig = () => ({
  url: '/v2/practitioners',
});
