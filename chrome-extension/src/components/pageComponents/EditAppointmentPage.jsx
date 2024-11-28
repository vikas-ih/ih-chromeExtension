import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureEntitlements } from "@frontegg/react";

import * as Yup from "yup";
// import { ModalComponent } from '../baseComponents';
import dayjs from "dayjs";
import {
  AmbientAiIcon,
  FollowUpIcon,
  IntakeIcon,
  SearchIcon,
} from "../../icons";
import { getFromStorage } from "../../lib/storage";
import { ModalComponent } from "../baseComponents/Modal";
import {
  getConditionByAppointmentTypeSlice,
  getPractitionerPreferencesSlice,
  patientAutoCompleteSlice,
} from "../../store/slice/appointment.slice";
import { getSettingsNotificationsSlice } from "../../store/slice/settings.slice";
import {
  editAppointmentAction,
  getConditionByAppointmentType,
  patientAutoCompleteAction,
} from "../../store/actions/appointment.action";

export const EditAppointment = ({
  isOpen,
  onCancel,
  setIsOpen,
  startIndex,
  isfilterOn,
  accessToken,
}) => {
  const phoneCountryCode = "+1";

  // const { isEntitled: followUpFlag } = useFeatureEntitlements("followup");
 const followUpFlag=true;
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
    getAppointmentDetailsByUuid,
    // conditionsByPractitionerLoading,
  } = useSelector((state) => state?.appointmentState);
  
  const { currentPractitioner } = useSelector(
    (state) => state?.practitionerState
  );




  const today = new Date();
  const dispatch = useDispatch();
  const [orgDoctorsDropdown, setOrgDoctorsDropdown] = useState([]);
  const [allPractitionersDropdown, setAllPractitionersDropdown] = useState([]);
  const [isPractitionerSelected, setIsPractitionerSelected] = useState(false);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [radioButtonValue, setRadioButtonvalue] = useState(1);
  const [conditionByType, setConditionByType] = useState([]);
  const [patientNameOrg, setPatientNamesOrg] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState(
    getAppointmentDetailsByUuid?.practitioner_details?.practitioner_id
  );
  const [sendNow, setSendNow] = useState(false);
  const currentYear = new Date().getFullYear();
  const cachedUserEmail = getFromStorage(`user_email`);
  const [updatedEmailsArray, setUpdatedEmailsArray] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const startDateValue =
    getAppointmentDetailsByUuid?.appointment_details?.start_date;
  const startDateField = moment(startDateValue).format("MM-DD-YYYY");
  const localTime = moment(startDateValue).format("LT");
  const startDateTime = dayjs(localTime, "h:mm A");

  const digits =
    getAppointmentDetailsByUuid?.patient_details?.birth_date.replace(/-/g, "");
  const dateOfBirth = digits.slice(4, 6) + digits.slice(6) + digits.slice(0, 4);
  const isMobile = window.innerWidth < 1260;
  const chatCompleteStatus =
    getAppointmentDetailsByUuid?.appointment_details?.chat_completion_status;
  const isExpired = getAppointmentDetailsByUuid?.appointment_details?.isExpired;
  const validationSchemaField = Yup.object().shape({
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
      .matches(/[A-Za-z]+$/, " "),
    last_name: Yup.string()
      .required(" ")
      .matches(/[A-Za-z]+$/, " "),
    phone_text: Yup.string()
      .required(" ")
      .matches(/^\d{10}$/, " "),
    email_text: Yup.string()
      .required(" ")
      .matches(/^.+@.+\..+$/, " "),
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
      const dataArr = appointmentTypeValues.map((item) => ({
        value: item?.appointment_type_id,
        label: item?.appointment_type_text,
      }));
      setAppointmentTypes(dataArr);
    }
  }, [appointmentTypeValues]);

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
    dispatch(
      getConditionByAppointmentType(
        selectedPractitioner,
        selectedAppointmentTypeId,
        false,
        accessToken
      )
    );
  };

  useEffect(() => {
    practitionerPreferences?.emails &&
      setUpdatedEmailsArray([
        ...practitionerPreferences.emails.map((emailObj) => emailObj),
      ]);
  }, [practitionerPreferences]);

  const getAppointmentType = () => {
    const appointment_id =
      getAppointmentDetailsByUuid?.appointment_details?.appointment_type_id;
    if (appointment_id === 1) {
      return "Intake";
    } else if (appointment_id === 2) {
      return "Followup";
    } else {
      return "Aura Only";
    }
  };

  const getAppointmentTypeContent = () => (
    <>
      <div className="flex">
        <div className="font-change">Appointment type</div>
        <div
          className={`flex mx-2 ${
            getAppointmentType() == "Intake"
              ? "edit-intake-radio-outlook"
              : getAppointmentType() == "Followup"
              ? "edit-followup-radio-outlook"
              : "edit-auraonly-radio-outlook"
          }`}
        >
          <span className="mx-1 mt-1">
            {getAppointmentType() == "Intake" ? (
              <IntakeIcon />
            ) : getAppointmentType() == "Followup" ? (
              <FollowUpIcon />
            ) : (
              <AmbientAiIcon />
            )}
          </span>
          <span className="mx-1 edit-font-size">{getAppointmentType()}</span>
        </div>
      </div>
    </>
  );

  let sections = [];
  {
    chatCompleteStatus === "Completed" || isExpired
      ? (sections = [
          {
            heading: "Edit appointment",
            fields: [],
          },
          {
            heading: getAppointmentTypeContent(),
            className: "mt-4 flex gap-6",
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
                options: conditionByType,
                onChange: (value, option, setFieldValue) => {},
              },
            ],
          },
          {
            className: "grid grid-cols-3 gap-4",
            fields: [
              {
                name: "start_date",
                type: "datepicker",
                title: "Appointment date",
                placement: "bottomStart",
                placeholder: startDateField ? (
                  <span className="field-placeholder">{startDateField}</span>
                ) : (
                  "MM/DD/YYYY"
                ),
                disabledDate: (date) =>
                  date && date < today.setHours(0, 0, 0, 0, 0),
              },
              {
                name: "time",
                type: "TimePicker",
                title: "Appointment time",
                placeholder: "",
                defaultValue: startDateTime,
                // eslint-disable-next-line no-unused-vars
                onChange: (value, time, setFieldValue) => {
                  setFieldValue("time", time);
                },
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
                disabled: "true",
              },
              {
                name: "last_name",
                type: "text",
                title: "Last name",
                placeholder: "Enter last name",
                className: "",
                autoComplete: "off",
                disabled: "true",
              },
              {
                name: "preferred_name",
                type: "text",
                title: "Preferred name",
                placeholder: "Enter preferred name",
                autoComplete: "off",
                disabled: "true",
              },
              {
                name: "birth_date",
                type: "dobText",
                title: "Date of birth",
                placeholder: "MM/DD/YYYY",
                autoComplete: "off",
                disabled: "true",
              },
              {
                name: "phone_text",
                type: "phonenumber_text",
                title: "Mobile number",
                placeholder: "Enter mobile number",
                autoComplete: "off",
                disabled: "true",
              },
              {
                name: "email_text",
                type: "text",
                title: "Email",
                placeholder: "Enter email id",
                autoComplete: "off",
                disabled: "true",
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
                      disabled: "true",
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
                disabled: "true",
              },
            ],
          },
        ])
      : (sections = [
          {
            heading: "Edit appointment",
            fields: [],
          },
          {
            heading: getAppointmentTypeContent(),
            className: "mt-4 flex gap-6",
            fields: [
              {
                name: "practitioner_id",
                type: "custom",
                disabled: true,

                options: allPractitionersDropdown.map((option) => ({
                  label: option.label,
                  value: option.value,
                })),
                className: "font-normal text-sm items-center justify-center",
                render: () => (
                  <span className="justify-center">
                    <b>Practitioner name :</b> {initialValues.practitioner_id}
                  </span>
                ),
              },
              {
                name: "condition_id",
                type: "custom",
                options: conditionByType,
                className: "font-normal text-sm items-center justify-center",
                render: () => (
                  <span className="justify-center">
                    <b>Condition :</b> {initialValues.condition_id}
                  </span>
                ),
              },
            ],
          },
          {
            className: "grid grid-cols-3 gap-4",
            fields: [
              {
                name: "start_date",
                type: "datepicker",
                title: "Appointment date",
                placement: "bottomStart",
                placeholder: startDateField ? (
                  <span className="field-placeholder">{startDateField}</span>
                ) : (
                  "MM/DD/YYYY"
                ),
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
              },
              {
                name: "last_name",
                type: "text",
                title: "Last name",
                placeholder: "Enter last name",
                className: "",
                autoComplete: "off",
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
              },
              {
                name: "phone_text",
                type: "phonenumber_text",
                title: "Mobile number",
                placeholder: "Enter mobile number",
                autoComplete: "off",
              },
              {
                name: "email_text",
                type: "text",
                title: "Email",
                placeholder: "Enter email id",
                autoComplete: "off",
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
        ]);
  }
  const [notifications, setNotifications] = useState([
    { preference: "", number_of: "", duration: "" },
  ]);

  useEffect(() => {
    if (practitionerPreferences?.notification_preference) {
      const notificationDetailsArray =
        practitionerPreferences?.notification_preference?.map(
          (notification) => ({
            preference: notification?.notification_sequence,
            number_of: notification?.number_of,
            duration: notification?.duration,
          })
        );
      setNotifications([...notificationDetailsArray]);
    }
  }, [practitionerPreferences]);

  const initialValues = {
    practitioner_id:
      getAppointmentDetailsByUuid?.practitioner_details?.practitioner_id,
    condition_id:
      getAppointmentDetailsByUuid?.appointment_details?.condition_name,
    first_name: getAppointmentDetailsByUuid?.patient_details?.patient_firstName,
    last_name: getAppointmentDetailsByUuid?.patient_details?.patient_lastName,
    preferred_name:
      getAppointmentDetailsByUuid?.patient_details?.preferred_name || "",
    birth_date: dateOfBirth,
    phone_text:
      getAppointmentDetailsByUuid?.patient_details?.phone_text?.replace(
        /^(\+1)/,
        ""
      ),
    email_text: getAppointmentDetailsByUuid?.patient_details?.email_text || "",
    notifications: [...notifications],
    email_sent_flag: false,
    preferred_language:
      getAppointmentDetailsByUuid?.patient_details?.preferred_language,
  };
  return (
    <ModalComponent
      open={isOpen}
      initialValues={initialValues}
      validationSchema={validationSchemaField}
      centered={true}
      className={"edit-appointment"}
      followUpFlag={followUpFlag}
      updatedEmailsArray={updatedEmailsArray}
      appointmentTypes={appointmentTypes}
      handleRadioButton={handleRadioButton}
      getConditionsbyType={getConditionsbyType}
      practitionerEmailTag={practitionerEmailTag}
      sendNow={sendNow}
      sections={
        getAppointmentType() == "Aura Only" ? sections.slice(0, -1) : sections
      }
      submitButtonText="Submit"
      cancelButtonText="Cancel"
      submitLoading={submitLoading}
      handleCancel={() => {
        dispatch(patientAutoCompleteSlice({}));
        dispatch(getConditionByAppointmentTypeSlice({}));
        setIsPractitionerSelected(false);
        setConditionByType([]);
        setUpdatedEmailsArray([]);
        onCancel();
        dispatch(getPractitionerPreferencesSlice(null));
        dispatch(getSettingsNotificationsSlice(null));
        setSendNow(false);
        setSubmitLoading(false);
      }}
      handleSubmit={(values) => {
        setSubmitLoading(true);
        const dateInput = values?.birth_date;
        const year = dateInput.slice(4);
        const day = dateInput.slice(2, 4);
        const month = dateInput.slice(0, 2);
        const finalFormat = `${year}-${month}-${day}`;
        const formattedSenddate = moment(values?.start_date).format(
          "YYYY-MM-DD"
        );
        const formattedStartDate =
          startDateField && moment(startDateField).format("YYYY-MM-DD");
        const isNewDate =
          values?.start_date === undefined
            ? formattedStartDate
            : formattedStartDate === formattedSenddate
            ? formattedStartDate
            : formattedSenddate;
        const browserTimezone = moment.tz.guess();
        const formattedDateTime = moment.tz(
          `${isNewDate} ${values?.time || "08:00:00"}`,
          `${values?.time ? "YYYY-MM-DD hh:mm:ss a" : "YYYY-MM-DD HH:mm:ss"}`,
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
            appointment_id:
              getAppointmentDetailsByUuid?.appointment_details?.appointment_id,
            condition_id: values?.condition_id || null,
            start_date: formattedDateTime,
            status_id: values?.status_id === "Booked" ? 3 : values?.status_id,
            practitioner_id: values?.practitioner_id,
            send_now: values?.email_sent_flag,
            last_modified_by: cachedUserEmail,
          },
          patient: {
            birth_date: finalFormat,
            first_name: values?.first_name,
            last_name: values?.last_name,
            preferred_name: values?.preferred_name,
            phone: { phone_text: phoneCountryCode + values?.phone_text },
            email: { email_text: values?.email_text },
            address: {
              line_1: "",
              line_2: "",
              country: "",
              zip: "",
              state: "",
              city: "",
            },
            preferred_language: values?.preferred_language,
          },
          notification: {
            schedule: notification_schedule_payload,
            emails: emailArray?.length > 0 ? emailArray : [],
          },
        };
        const selectedPractitioner = orgDoctorsDropdown.find(
          (doctor) => doctor.value === values?.practitioner_id
        );
        const practitionerName = selectedPractitioner
          ? selectedPractitioner.label
          : "";
        // analytics.track("Created New Appointment", {
        //   appointment_date: values?.start_date,
        //   appointment_status: "Booked",
        //   practitioner_name: practitionerName,
        // });
        dispatch(
          editAppointmentAction(
            getAppointmentDetailsByUuid?.appointment_details?.appt_uuid,
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
          )
        );
      }}
    />
  );
};
