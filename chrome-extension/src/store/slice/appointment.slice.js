import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAppointmentsList: {},
  getAppointmentStatusList: [],
  getUuid: {},
  practitionerById: {},
  filteredValue: [],
  tableLoader: false,
  getDoctorAppointmentList: [],
  allPractitionersNames: {},
  appointmentsSummary: {},
  getconditionlist: {},
  getAppointmentCountDatelist: {},
  scheduleLoader: false,
  newIntakeSummary: null,
  isApptDeleted: false,
  isUUIDover: false,
  appointmentTypeValues: {},
  getConditionsbyType: [],
  patientAutoComplete: {},
  patientNamesOrg: [],
  flagNameOrgValue: {},
  practitionerNamesbyOrgIdList: [],
  settingsOrgValue: {},
  selfAPILoading: false,
  practitionerPreferences: [],
  practitionerEmailTag: false,
  getAppointmentDetailsByUuid: {},
  isApptLoaded: false,
  apptsTotal: "",
  filteredApptsTotal: null,
  practitionersAndPatients: [],
  apptsAPICall: false,
  existingPatientDetails: {},
  notificationHistoryDetails: {},
  bulkAppointmentUploadHistory: {},
  bulkAppointmentUploadHistoryLoading: false,
  recentSearchList: [],
  csvDownloadData: null,
  csvColumnMappings: {},
  csvColumnMappingsLoading: false,
  csvTimezone: null,
  csvTimezoneLoading: false,
  providerMappings: {},
  providerMappingLoading: false,
  CSVUploadEnabledForCurrentUser: false,
  patientNameList: [],
  remainderPatientAppts: null,
  appointmentStatusMappings: {},
  appointmentStatusMappingsLoading: false,
  conditionMappings: {},
  conditionMappingsLoading: false,
  lookbackPeriods: {},
  lookbackPeriodsLoading: false,
  conditionsByPractitionerLoading: false,
};

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    getAllAppointmentSlice: (state, { payload }) => {
      state.getAppointmentsList = payload;
    },
    getAppointmentsByStatusSlice: (state, { payload }) => {
      state.getAppointmentStatusList = payload;
    },
    getAppointmentUuidSlice: (state, { payload }) => {
      state.getUuid = payload;
    },
    getPractitionerByIdSlice: (state, { payload }) => {
      state.practitionerById = payload;
    },
    getAppointmentByFilterSlice: (state, { payload }) => {
      state.filteredValue = payload;
    },
    appointmentLoading: (state, { payload }) => {
      state.tableLoader = payload;
    },

    getDoctorAppointmentStatusSlice: (state, { payload }) => {
      state.getDoctorAppointmentList = payload;
    },

    getAppointmentsSummarySlice: (state, { payload }) => {
      state.appointmentsSummary = payload;
    },
    getAllPractitionersNamesSlice: (state, { payload }) => {
      state.allPractitionersNames = payload;
    },
    getConditionSlice: (state, { payload }) => {
      state.getconditionlist = payload;
    },
    getAppointmentCountDateSlice: (state, { payload }) => {
      state.getAppointmentCountDatelist = payload;
    },
    scheduleLoading: (state, { payload }) => {
      state.scheduleLoader = payload;
    },
    getNewIntakeSummary: (state, { payload }) => {
      state.newIntakeSummary = payload;
    },
    isApptDeleted: (state, { payload }) => {
      state.isApptDeleted = payload;
    },
    isUUIDover: (state, { payload }) => {
      state.isUUIDover = payload;
    },
    appointmentTypesSlice: (state, { payload }) => {
      state.appointmentTypeValues = payload;
    },
    getConditionByAppointmentTypeSlice: (state, { payload }) => {
      state.getConditionsbyType = payload;
    },
    patientAutoCompleteSlice: (state, { payload }) => {
      state.patientAutoComplete = payload;
    },
    patientNamesOrgSlice: (state, { payload }) => {
      state.patientNamesOrg = payload;
    },
    flagNameOrgSlice: (state, { payload }) => {
      state.flagNameOrgValue = payload;
    },
    practitionerNamesOrgbyIdSlice: (state, { payload }) => {
      state.practitionerNamesbyOrgIdList = payload;
    },
    settingsOrgFlagSlice: (state, { payload }) => {
      state.settingsOrgValue = payload;
    },
    getPractitionerPreferencesSlice: (state, { payload }) => {
      state.practitionerPreferences = payload;
    },
    selfAPILoadingSlice: (state, { payload }) => {
      state.selfAPILoading = payload;
    },
    showPractitionerEmailTagSlice: (state, { payload }) => {
      state.practitionerEmailTag = payload;
    },
    getAppointmentDetailsByUuidSlice: (state, { payload }) => {
      state.getAppointmentDetailsByUuid = payload;
    },
    isApptLoadedSlice: (state, { payload }) => {
      state.isApptLoaded = payload;
    },
    apptsTotalSlice: (state, { payload }) => {
      state.apptsTotal = payload;
    },
    filteredApptsTotalSlice: (state, { payload }) => {
      state.filteredApptsTotal = payload;
    },
    getPractitionersAndPatientsSlice: (state, { payload }) => {
      state.practitionersAndPatients = payload;
    },
    apptsAPICallSlice: (state, { payload }) => {
      state.apptsAPICall = payload;
    },
    existingPatientDetailsSlice: (state, { payload }) => {
      state.existingPatientDetails = payload;
    },
    getNotificationHistorySlice: (state, { payload }) => {
      state.notificationHistoryDetails = payload;
    },
    bulkAppointmentHistorySlice: (state, { payload }) => {
      state.bulkAppointmentUploadHistory = payload;
    },
    bulkAppointmentHistoryLoadingSlice: (state, { payload }) => {
      state.bulkAppointmentUploadHistoryLoading = payload;
    },
    getRecentSearchSlice: (state, { payload }) => {
      state.recentSearchList = payload;
    },
    csvDownloadDataSlice: (state, { payload }) => {
      state.csvDownloadData = payload;
    },
    getCSVColumnMappingsSlice: (state, { payload }) => {
      state.csvColumnMappings = payload;
    },
    getProviderMappingsSlice: (state, { payload }) => {
      state.providerMappings = payload;
    },
    getAppointmentStatusMappingsSlice: (state, { payload }) => {
      state.appointmentStatusMappings = payload;
    },
    getAppointmentStatusMappingsLoadingSlice: (state, { payload }) => {
      state.appointmentStatusMappingsLoading = payload;
    },
    providerMappingsLoadingSlice: (state, { payload }) => {
      state.providerMappingLoading = payload;
    },
    CSVUploadEnabledForCurrentUserSlice: (state, { payload }) => {
      state.CSVUploadEnabledForCurrentUser = payload;
    },
    csvColumnMappingsLoadingSlice: (state, { payload }) => {
      state.csvColumnMappingsLoading = payload;
    },
    getPatientNamesListSlice: (state, { payload }) => {
      state.patientNameList = payload;
    },
    remainderPatientApptsSlice: (state, { payload }) => {
      state.remainderPatientAppts = payload;
    },
    getConditionMappingsSlice: (state, { payload }) => {
      state.conditionMappings = payload;
    },
    getConditionMappingsLoadingSlice: (state, { payload }) => {
      state.conditionMappingsLoading = payload;
    },
    getConditionByPractitionerLoadingSlice: (state, { payload }) => {
      state.conditionsByPractitionerLoading = payload;
    },
    getLookbackPeriodsSlice: (state, { payload }) => {
      state.lookbackPeriods = payload;
    },
    getLookbackPeriodsLoadingSlice: (state, { payload }) => {
      state.lookbackPeriodsLoading = payload;
    },
    getCSVTimezoneSlice: (state, { payload }) => {
      state.csvTimezone = payload;
    },
    getCSVTimezoneLoadingSlice: (state, { payload }) => {
      state.csvTimezoneLoading = payload;
    },
  },
});

const { actions, reducer } = appointmentSlice;

export const {
  getAllAppointmentSlice,
  getAppointmentsByStatusSlice,
  getAppointmentUuidSlice,
  getPractitionerByIdSlice,
  getAppointmentByFilterSlice,
  appointmentLoading,
  getDoctorAppointmentStatusSlice,
  getAppointmentsSummarySlice,
  getAllPractitionersNamesSlice,
  getConditionSlice,
  getAppointmentCountDateSlice,
  scheduleLoading,
  getNewIntakeSummary,
  isApptDeleted,
  isUUIDover,
  appointmentTypesSlice,
  getConditionByAppointmentTypeSlice,
  patientAutoCompleteSlice,
  patientNamesOrgSlice,
  flagNameOrgSlice,
  practitionerNamesOrgbyIdSlice,
  settingsOrgFlagSlice,
  getPractitionerPreferencesSlice,
  showPractitionerEmailTagSlice,
  getAppointmentDetailsByUuidSlice,
  isApptLoadedSlice,
  apptsTotalSlice,
  getPractitionersAndPatientsSlice,
  apptsAPICallSlice,
  filteredApptsTotalSlice,
  existingPatientDetailsSlice,
  getNotificationHistorySlice,
  bulkAppointmentHistorySlice,
  bulkAppointmentHistoryLoadingSlice,
  getRecentSearchSlice,
  getCSVColumnMappingsSlice,
  csvDownloadDataSlice,
  getProviderMappingsSlice,
  providerMappingsLoadingSlice,
  CSVUploadEnabledForCurrentUserSlice,
  csvColumnMappingsLoadingSlice,
  getPatientNamesListSlice,
  remainderPatientApptsSlice,
  getAppointmentStatusMappingsSlice,
  getAppointmentStatusMappingsLoadingSlice,
  getConditionMappingsSlice,
  getConditionMappingsLoadingSlice,
  selfAPILoadingSlice,
  getConditionByPractitionerLoadingSlice,
  getLookbackPeriodsSlice,
  getLookbackPeriodsLoadingSlice,
  getCSVTimezoneSlice,
  getCSVTimezoneLoadingSlice,
} = actions;

export default reducer;
