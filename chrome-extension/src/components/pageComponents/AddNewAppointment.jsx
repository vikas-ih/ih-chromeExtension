// import { useFeatureEntitlements } from '@frontegg/react';
import moment from 'moment';
import 'moment-timezone';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchIcon } from '../../icons';
import { getFromStorage } from '../../lib/storage';
import {
  checkPatientDetailsAction,
  createAppointment,
  getConditionByAppointmentType,
  getPractitionerPreferences,
  patientAutoCompleteAction,
} from "../../store/actions/appointment.action";
import { getConditionByAppointmentTypeSlice,  getPractitionerPreferencesSlice, patientAutoCompleteSlice, } from '../../store/slice/appointment.slice';
import { getSettingsNotificationsSlice } from '../../store/slice/settings.slice';
import { isAuraOnlyAppointmentType } from '../../utilities/commonFunction';
import { ModalComponent } from '../baseComponents/Modal';
import * as Yup from 'yup';

export const AddNewAppointment = ({
  isOpen,
  onCancel,
  setIsOpen,
  startIndex,
  isfilterOn,
  defaultAppointmentType,
  accessToken,
}) => {
  const phoneCountryCode = "+1";

  // const { isEntitled: followUpFlag } = useFeatureEntitlements("followup"); //check
 const followUpFlag=1;
  const today = new Date();
  const dispatch = useDispatch();
  const [orgDoctorsDropdown, setOrgDoctorsDropdown] = useState([]);
  const [allPractitionersDropdown, setAllPractitionersDropdown] = useState([]);
  const [isPractitionerSelected, setIsPractitionerSelected] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [radioButtonValue, setRadioButtonvalue] = useState(1);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("");
  const [conditionByType, setConditionByType] = useState([]);
  const [patientNameOrg, setPatientNamesOrg] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [showExistingFlag, setShowExistingFlag] = useState(false);
  const currentYear = new Date().getFullYear();
  const [sendNow, setSendNow] = useState(false);
  const cachedUserEmail = getFromStorage(`user_email`);

  const [checkFirstName, setCheckFirstName] = useState("");
  const [checkLastName, setCheckLastName] = useState("");
  const [checkDOB, setCheckDOB] = useState("");
  const [checkPhone, setCheckPhone] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [checkExistingButtonFlag, setCheckExistingButtonFlag] = useState(true);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [checkPatientId, setCheckPatientId] = useState(null);
  const [updatedEmailsArray, setUpdatedEmailsArray] = useState([]);
  const isMobile = window.innerWidth < 1260;
  const [submitLoading, setSubmitLoading] = useState(false);

  const handlePatientModalClose = () => {
    setPatientModalOpen(false);
    setCheckExistingButtonFlag(true);
  };

  const {
    appointmentTypeValues,
    getConditionsbyType,
    patientAutoComplete,
    patientNamesOrg,
    practitionerNamesbyOrgIdList,
    allPractitionersNames,
    settingsOrgValue,
    practitionerPreferences,
    practitionerEmailTag,
    conditionsByPractitionerLoading,
  } = useSelector((state) => state?.appointmentState);
  const { currentPractitioner } = useSelector(
    (state) => state?.practitionerState
  );
  const org_id = currentPractitioner.org_id;

  const newAppointmentPayload = {
    practitioner_id: "",
    start_date: "",
    status_id: "Booked",
    condition_id: "",
    existing_id: "",
    birth_date: "",
    first_name: "",
    last_name: "",
    preferred_name: "",
    preferred_language: "en-US",
    line_1: "",
    line_2: "",
    country: "USA",
    zip: "",
    state: "",
    city: "",
    phone_text: "",
    email_text: "",
    physicianEmails: "",
    email_sent_flag: false,
    notifications: [
      {
        preference: "",
        number_of: "",
        duration: "",
      },
    ],
  };

  // flag to check if selectedEncounterType is Aura Only
  const isAuraEncounterAppointmentType = isAuraOnlyAppointmentType(
    radioButtonValue,
    appointmentTypes
  );

  const validationSchemaField = Yup.object().shape({
    practitioner_id: Yup.string().required(" "),
    condition_id: isAuraEncounterAppointmentType
      ? Yup.string()
      : Yup.string().required(" "),
    start_date: Yup.string().required(" "),
    birth_date: Yup.string()
      .required(" ")
      .test(" ", " ", function (value) {
        const parts = value.match(/(\d{2})(\d{2})(\d{4})/);
        if (!parts) return false;

        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const year = parseInt(parts[3], 10);

        return (
          month >= 1 &&
          month <= 12 &&
          day >= 1 &&
          day <= 31 &&
          year >= 1000 &&
          year <= currentYear
        );
      }),
    first_name: Yup.string()
      .required(" ")
      .matches(/[A-Za-z]+$/, " ")
      .matches(/^[^\s].*$/, " "),
    last_name: Yup.string()
      .required(" ")
      .matches(/[A-Za-z]+$/, " ")
      .matches(/^[^\s].*$/, " "),
    phone_text: isAuraEncounterAppointmentType
      ? Yup.string().matches(/^\d{10}$/, " ")
      : Yup.string()
          .required(" ")
          .matches(/^\d{10}$/, " "),
    email_text: isAuraEncounterAppointmentType
      ? Yup.string()
          .matches(/^.+@.+\..+$/, " ")
          .matches(/^[^\s].*$/, " ")
      : Yup.string()
          .required(" ")
          .matches(/^.+@.+\..+$/, " ")
          .matches(/^[^\s].*$/, " "),
  });

  // Doctor Name in dropdown by Org Id
  useEffect(() => {
    if (patientNamesOrg && Array.isArray(patientNamesOrg)) {
      const dataArr = patientNamesOrg.map((item) => ({
        value: item?.patient_id,
        label: `${item?.first_name} ${item?.last_name}`,
      }));
      setPatientNamesOrg(dataArr);
    }
  }, [patientNamesOrg]);

  // Radio Button Intake or Followup values
  useEffect(() => {
    if (appointmentTypeValues && Array.isArray(appointmentTypeValues)) {
      const dataArr = [];

      appointmentTypeValues.forEach((item) => {
        dataArr.push({
          value: item?.appointment_type_id,
          label: item?.appointment_type_text,
        });

        if (
          defaultAppointmentType &&
          item?.appointment_type_text === defaultAppointmentType
        ) {
          setRadioButtonvalue(item?.appointment_type_id);
        }
      });

      setAppointmentTypes(dataArr);
    }
  }, [appointmentTypeValues, defaultAppointmentType]);

  // Get Practitioner Names by orgId
  useEffect(() => {
    if (
      practitionerNamesbyOrgIdList &&
      Array.isArray(practitionerNamesbyOrgIdList)
    ) {
      let dataArr = [];
      practitionerNamesbyOrgIdList.forEach((key, index) => {
        dataArr.push({
          value: key?.practitioners_id,
          label: `${key?.title ? key.title + ". " : ""}${
            key?.practitioner_name
          }`,
        });
      });
      setOrgDoctorsDropdown(dataArr);
    }
  }, [practitionerNamesbyOrgIdList]);

  // Get All Practitioner Names
  useEffect(() => {
    if (allPractitionersNames && Array.isArray(allPractitionersNames)) {
      let dataArr = [];
      allPractitionersNames.forEach((key, index) => {
        dataArr.push({
          value: key?.practitioner_id,
          label: `${
            key?.practitioner_title ? key.practitioner_title + ". " : ""
          }${key?.practitioner_name}`,
        });
      });
      setAllPractitionersDropdown(dataArr);
    }
  }, [allPractitionersNames]);

  // Get conditions by Org Id and Practitioner id (from org id or All Practitioner)
  useEffect(() => {
    if (
      getConditionsbyType?.conditions &&
      Array.isArray(getConditionsbyType?.conditions)
    ) {
      let dataArr = [];
      getConditionsbyType?.conditions.forEach((key, index) => {
        dataArr.push({
          value: key?.condition_id,
          label: key?.condition_name,
        });
      });
      setConditionByType(dataArr);
    }
  }, [getConditionsbyType?.conditions]);

  const handleRadioButton = (e) => {
    const selectedAppointmentTypeId = e.target.value;
    setRadioButtonvalue(selectedAppointmentTypeId);
  };

  useEffect(() => {
    practitionerPreferences?.emails &&
      setUpdatedEmailsArray([
        ...practitionerPreferences.emails.map((emailObj) => emailObj),
      ]);
  }, [practitionerPreferences]);

  const checked_patient_payload = {
    first_name: checkFirstName,
    last_name: checkLastName,
    birth_date: checkDOB,
    email_text: checkEmail,
    phone_text: phoneCountryCode + checkPhone,
  };

  const autoApiCall = (e) => {
    if (e.target.value !== "") {
      dispatch(
        checkPatientDetailsAction(
          checked_patient_payload,
          setPatientModalOpen,
          setCheckExistingButtonFlag,
          setCheckPatientId,
          accessToken
        )
      );
    }
  };

  // if appointmentType is Aura Encounter, then show only some fields
  const sections = isAuraEncounterAppointmentType
    ? [
        {
          heading: "radio_group",
          className: "grid grid-cols-3 gap-4",
          fields: [
            {
              name: "practitioner_id",
              type: "select",
              title: "Practitioner name",
              placeholder: "Select practitioner name",
              options: allPractitionersDropdown.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              onChange: (value, option, setFieldValue) => {
                setUpdatedEmailsArray([]);
                setConditionByType([]);
                const practitionerId = parseInt(value, 10);
                setIsPractitionerSelected(true);
                setSelectedPractitioner(practitionerId);
                followUpFlag
                  ? dispatch(
                      getConditionByAppointmentType(
                        practitionerId,
                        radioButtonValue,
                        true,
                        accessToken
                      )
                    )
                  : dispatch(
                      getConditionByAppointmentType(practitionerId, 1, true,accessToken)
                    );
              },
            },
            {
              name: "start_date",
              type: "datepicker",
              title: "Appointment date",
              placement: "bottomStart",
              placeholder: "MM/DD/YYYY",
              disabledDate: (date) =>
                date && date < today.setHours(0, 0, 0, 0, 0),
            },
          ],
        },
        {
          heading: "Add patient details",
          className: "grid grid-cols-3 gap-5",
          fields: [
            {
              name: "first_name",
              type: "text",
              title: "First name",
              placeholder: "Enter first name",
              className: "",
              autoComplete: "off",
              onChange: (e, setFieldValue) => {
                setCheckFirstName(e.target.value);
                setFieldValue("first_name", e.target.value);
              },
            },
            {
              name: "last_name",
              type: "text",
              title: "Last name",
              placeholder: "Enter last name",
              className: "",
              autoComplete: "off",
              onChange: (e, setFieldValue) => {
                setCheckLastName(e.target.value);
                setFieldValue("last_name", e.target.value);
              },
            },
            {
              name: "birth_date",
              type: "dobText",
              title: "Date of birth",
              placeholder: "MM/DD/YYYY",
              autoComplete: "off",
              onChange: (e) => {
                const birthDate = e;
                const birth_year = birthDate.slice(4);
                const birth_day = birthDate.slice(2, 4);
                const birth_month = birthDate.slice(0, 2);
                const birth_finalFormat = `${birth_year}-${birth_month}-${birth_day}`;
                setCheckDOB(birth_finalFormat);
              },
            },
          ],
        },
      ]
    : [
        {
          heading: "radio_group",
          className: "grid grid-cols-3 gap-4",
          fields: [
            {
              name: "practitioner_id",
              type: "select",
              title: "Practitioner name",
              placeholder: "Select practitioner name",
              options: allPractitionersDropdown.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              onChange: (value, option, setFieldValue) => {
                setUpdatedEmailsArray([]);
                setConditionByType([]);
                const practitionerId = parseInt(value, 10);
                setIsPractitionerSelected(true);
                setSelectedPractitioner(practitionerId);
                followUpFlag
                  ? dispatch(
                      getConditionByAppointmentType(
                        practitionerId,
                        radioButtonValue,
                        true,
                        accessToken
                      )
                    )
                  : dispatch(
                      getConditionByAppointmentType(
                        practitionerId,
                        1,
                        true,
                        accessToken
                      )
                    );
              },
            },
            {
              name: "condition_id",
              type: "select",
              title: "Condition",
              placeholder: "Condition",
              options: conditionsByPractitionerLoading
                ? [{ label: "Loading...", value: "" }]
                : conditionByType.length > 0
                ? conditionByType
                : [],
              onChange: (value, option, setFieldValue) => {
                setIsPractitionerSelected(true);
                const body = {
                  practitioner_id: selectedPractitioner,
                  condition_id: value,
                };
                dispatch(getPractitionerPreferences(body, setFieldValue,accessToken));
              },
            },
            {
              name: "start_date",
              type: "datepicker",
              title: "Appointment date",
              placement: "bottomStart",
              placeholder: "MM/DD/YYYY",
              disabledDate: (date) =>
                date && date < today.setHours(0, 0, 0, 0, 0),
            },
          ],
        },
        {
          heading: followUpFlag && radioButtonValue !== 1 && "Search Patient",
          className: "grid grid-cols-3 gap-5",
          fields:
            followUpFlag && radioButtonValue !== 1
              ? [
                  {
                    name: "search_patient_name",
                    type: "select",
                    placeholder: "Search patient name",
                    title: "",
                    extraIcon: <SearchIcon />,
                    options: patientNameOrg,
                    onChange: (value, option, setFieldValue) => {
                      if (value) {
                        dispatch(
                          patientAutoCompleteAction(
                            value,
                            setFieldValue,
                            setShowExistingFlag,
                            accessToken
                          )
                        );
                      }
                    },
                    autoComplete: "off",
                  },
                  {
                    name: "label_name",
                    type: "label",
                    title: "or Add New Patient below",
                    className: "py-2",
                  },
                ]
              : [],
        },
        {
          heading: "Add patient details",
          className: "grid grid-cols-3 gap-5",
          fields: [
            {
              name: "first_name",
              type: "text",
              title: "First name",
              placeholder: "Enter first name",
              className: "",
              autoComplete: "off",
              onChange: (e, setFieldValue) => {
                setCheckFirstName(e.target.value);
                setFieldValue("first_name", e.target.value);
              },
            },
            {
              name: "last_name",
              type: "text",
              title: "Last name",
              placeholder: "Enter last name",
              className: "",
              autoComplete: "off",
              onChange: (e, setFieldValue) => {
                setCheckLastName(e.target.value);
                setFieldValue("last_name", e.target.value);
              },
            },
            {
              name: "preferred_name",
              type: "text",
              title: "Preferred name",
              placeholder: "Enter preferred name",
              autoComplete: "off",
            },
            {
              name: "birth_date",
              type: "dobText",
              title: "Date of birth",
              placeholder: "MM/DD/YYYY",
              autoComplete: "off",
              onChange: (e) => {
                const birthDate = e;
                const birth_year = birthDate.slice(4);
                const birth_day = birthDate.slice(2, 4);
                const birth_month = birthDate.slice(0, 2);
                const birth_finalFormat = `${birth_year}-${birth_month}-${birth_day}`;
                setCheckDOB(birth_finalFormat);
              },
            },
            {
              name: "phone_text",
              type: "phonenumber_text",
              title: "Mobile number",
              placeholder: "Enter mobile number",
              autoComplete: "off",
              onChange: (e) => {
                setCheckPhone(e);
              },
            },
            {
              name: "email_text",
              type: "text",
              title: "Email",
              placeholder: "Enter email id",
              autoComplete: "off",
              onChange: (e, setFieldValue) => {
                setCheckEmail(e.target.value);
                setFieldValue("email_text", e.target.value);
              },
            },
            ...(currentPractitioner?.org_settings?.enable_language_selection
              ? [
                  {
                    name: "preferred_language",
                    type: "select",
                    title: "Preferred Language",
                    placeholder: "Select language",
                    options: [
                      { label: "English", value: "en-US" },
                      { label: "Spanish", value: "es" },
                    ],
                    onChange: (value, option, setFieldValue) => {
                      setFieldValue("preferred_language", value);
                    },
                  },
                ]
              : []),
          ],
        },
        {
          fields: [
            {
              helperTitle: <span>Send a patient reminder immediately</span>,
              name: "email_sent_flag",
              type: "switch",
              onChange: (value, option, setFieldValue) => {
                setSendNow(value);
                setFieldValue("email_sent_flag", value);
              },
            },
          ],
        },
      ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalComponent
        open={isOpen}
        centered={true}
        initialValues={newAppointmentPayload}
        className={"add-appointment"}
        validationSchema={validationSchemaField}
        followUpFlag={followUpFlag}
        appointmentTypes={appointmentTypes}
        handleRadioButton={handleRadioButton}
        getConditionsbyType={getConditionsbyType}
        practitionerEmailTag={practitionerEmailTag}
        setShowExistingFlag={setShowExistingFlag}
        radioButtonValue={radioButtonValue}
        sections={sections}
        submitButtonText="Submit"
        cancelButtonText="Cancel"
        sendNow={sendNow}
        submitLoading={submitLoading}
        setConditionByType={setConditionByType}
        handleCancel={() => {
          setSubmitLoading(false);
          setSendNow(false);
          dispatch(patientAutoCompleteSlice({}));
          dispatch(getConditionByAppointmentTypeSlice({}));
          setIsPractitionerSelected(false);
          setConditionByType([]);
          onCancel();
          dispatch(getPractitionerPreferencesSlice([]));
          dispatch(getSettingsNotificationsSlice(null));
          setShowExistingFlag(false);
          setRadioButtonvalue(1);
          setCheckDOB("");
          setCheckPhone("");
          setSelectedPractitioner(null);
        }}
        handleSubmit={(values) => {
          setSubmitLoading(true);
          const formattedStartDate =
            values?.start_date &&
            moment(values.start_date).format("YYYY-MM-DD");
          const browserTimezone = moment.tz.guess();
          const formattedDateTime = moment.tz(
            `${formattedStartDate} 08:00:00`,
            "YYYY-MM-DD HH:mm:ss",
            browserTimezone
          );
          const finalAppointmentTime = formattedDateTime.format(
            "YYYY-MM-DD HH:mm:ss"
          );
          const processNotificationData = () => {
            let preferenceCounter = 1;
            return values?.notifications.map((item) => {
              if (item.hasOwnProperty("notification_sequence_id")) {
                return { ...item, notification_sequence: preferenceCounter++ };
              } else {
                return { ...item, preference: preferenceCounter++ };
              }
            });
          };
          const processedData = processNotificationData();
          const notification_schedule_payload = processedData.map(
            ({ duration, number_of, preference }) => ({
              duration,
              number_of,
              preference,
            })
          );
          const emailArray = updatedEmailsArray.filter((email) => email !== "");
          const payload = {
            appointment: {
              appointment_type: radioButtonValue ? radioButtonValue : 1,
              start_date: finalAppointmentTime,
              time_zone: browserTimezone,
              status_id: values?.status_id === "Booked" ? 3 : values?.status_id,
              practitioner_id: values?.practitioner_id,
              condition_id: values?.condition_id || null,
              org_id: org_id,
              send_now: values?.email_sent_flag,
              created_by: cachedUserEmail,
            },
            patient: {
              birth_date: checkDOB,
              first_name: values?.first_name ? values?.first_name : "",
              last_name: values?.last_name,
              preferred_name: values?.preferred_name,
              is_newpatient:
                radioButtonValue === 1
                  ? checkExistingButtonFlag
                  : !showExistingFlag,
              address: {
                line_1: "",
                line_2: "",
                country: "",
                zip: "",
                state: "",
                city: "",
              },
              phone: { phone_text: phoneCountryCode + checkPhone },
              email: { email_text: values?.email_text },
              preferred_language: values?.preferred_language,
            },
            notification: {
              schedule: notification_schedule_payload,
              emails: emailArray?.length > 0 ? emailArray : [],
            },
          };
          if (showExistingFlag) {
            payload.patient.existing_followup_patientid =
              patientAutoComplete?.patient_id || "";
          }
          if (checkPatientId !== null) {
            payload.patient.existing_intake_patientid = checkPatientId;
          }
          const selectedPractitioner = orgDoctorsDropdown.find(
            (doctor) => doctor.value === values?.practitioner_id
          );
          const practitionerName = selectedPractitioner
            ? selectedPractitioner.label
            : "";
          analytics.track("Created New Appointment", {
            appointment_date: values?.start_date,
            appointment_status: "Booked",
            practitioner_name: practitionerName,
          });
          dispatch(
            createAppointment(
              payload,
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
            )
          );
        }}
      />
    </>
  );
};
