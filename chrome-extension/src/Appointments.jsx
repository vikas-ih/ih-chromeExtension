import React, { useEffect, useMemo, useRef,useState } from "react";
import BaseNavBar from "./components/baseComponents/BaseNavBar";
import TopNavBar from "./components/TopNavBar";
import { Table } from "./components/baseComponents/Table";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

import {
  ActionMenuIcon,
  AmbientAiIcon,
  BinIcon,
  CalendarMobileIcon,
  EditAppointmentIcon,
  EmailOpenedTooltipIcon,
  EmailOpenIcon,
  EmailTooltipIcon,
  ExpandIcon,
  FailedEmailIcon,
  NotificationsHistoryIcon,
  PatientIcon,
  PlusIcon,
  QRCodeIcon,
  SendIntakeIcon,
  SmsTooltipIcon,
  StethMobileIcon,
  SummaryIcon,
  UndeliveredSmsIcon,
  VisibilityOffIcon,
  WarningIcon,
} from "./icons";
import { Dropdown, Menu, Progress, Select, Tooltip } from "antd";
import moment from "moment";
import { getFromStorage, storeInLocal } from "./lib/storage";
import { ProfileLogo } from "./components/baseComponents/ProfileLogo";
import { currentPractitionerJson } from "./mocks/currentPractitoner";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentTypesAction,
  getAllPractitionersNames,
  getAppointmentByFilter,
  getAppointmentDetailsByUuidAction,
  getAppointmentPractitionerAndPatients,
  getAppointmentsByStatus,
  getRecentSearchAction,
  notificationHistory,
  sendAppointmentReminders,
} from "./store/actions/appointment.action";
import { DeleteAppointment } from "./components/pageComponents/DeleteAppointment";
import { EditAppointment } from "./components/pageComponents/EditAppointmentPage";
import { getAppointmentAllEndDateFilter, getAppointmentAllStartDateFilter } from "./utilities/commonFunction";
import { TreeSelectDropdown } from "./components/baseComponents/TreeSelect";
import { filteredApptsTotalSlice } from "./store/slice/appointment.slice";
import { AddNewAppointment } from "./components/pageComponents/AddNewAppointment";

export const Appointments = () => {
  //   const { currentPractitioner } = useSelector(
  //     (state) => state?.practitionerState
  //   );
  const {
    getAppointmentStatusList,
    filteredValue,
    tableLoader,
    apptsAPICall,
    filteredApptsTotal,
    apptsTotal,
    practitionersAndPatients,
  } = useSelector((state) => state?.appointmentState);
  console.log("practitionersAndPatients", practitionersAndPatients);
  const nonVCAIntakeStatus = "Aura Only";
  const nonVCACondition = "Not Available";
  //   const isAdmin = settingsOrgValue?.roles?.includes("admin"); //check
  const isAdmin = true;
  const cachedUserEmail = getFromStorage("user_email");
  let fetchCounterRef = useRef(0);

  const today = moment().format("YYYY-MM-DD");
  const navigate = useNavigate();
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentPractitioner = currentPractitionerJson; //check
  //   const filteredData = appointmentJson;
  const [showProfileLogo, setShowProfileLogo] = useState(true);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectDates, setSelectDates] = useState([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showUploadHistory, setShowUploadHistory] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const [filteredPatientNames, setFilteredPatientNames] = useState([]);
  const [showNoData, setShowNoData] = useState(false);
  const denominator =
    filteredApptsTotal != null ? filteredApptsTotal : apptsTotal;
  const [startIndex, setStartIndex] = useState(25);

  const [deleteText, setDeleteText] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editAppointmentOpen, setEditAppointmentOpen] = useState(false);
  const [isnotificationHistoryOpen, setIsnotificationHistoryOpen] =
    useState(false);

  const beforepercent = filteredData?.length / denominator;
  const [isPatientSelected, setIsPatientSelected] = useState(false);
  //   const [showProfileLogo, setShowProfileLogo] = useState(true);
  const [dateValue, setDateValue] = useState(
    localStorage.getItem(`${currentPractitioner?.org_uuid}_dateValue`)
  );

  const filter_status =
    getFromStorage(`${currentPractitioner?.org_uuid}_filter_status`) || "";
  const filter_startDate =
    getFromStorage(`${currentPractitioner?.org_uuid}_filter_startDate`) ===
    "All Time"
      ? ""
      : getFromStorage(`${currentPractitioner?.org_uuid}_filter_startDate`) ===
        null
      ? today
      : getFromStorage(`${currentPractitioner?.org_uuid}_filter_startDate`);
  const filter_endDate =
    getFromStorage(`${currentPractitioner?.org_uuid}_filter_endDate`) ===
    "All Time"
      ? ""
      : getFromStorage(`${currentPractitioner?.org_uuid}_filter_endDate`) ===
        null
      ? today
      : getFromStorage(`${currentPractitioner?.org_uuid}_filter_endDate`);
  const filter_practitioner_id =
    getFromStorage(`${currentPractitioner?.org_uuid}_filter_practitioner_id`) ||
    "";
  const filter_patient_name =
    getFromStorage(`${currentPractitioner?.org_uuid}_filter_patient_name`) ||
    "";
  const storage_condition =
    filter_status !== "" ||
    filter_startDate !== "" ||
    filter_endDate !== "" ||
    filter_patient_name !== "" ||
    filter_practitioner_id !== "";

  const storedPractitionerNamesLocal = localStorage.getItem(
    `${currentPractitioner?.org_uuid}_storedPractitionerNames`
  );
  const parseStoredNames = useMemo(() => {
    return storedPractitionerNamesLocal
      ? JSON.parse(
          localStorage.getItem(
            `${currentPractitioner?.org_uuid}_storedPractitionerNames`
          )
        )
      : [];
  }, [storedPractitionerNamesLocal]);

   const addAppointmentOptions = () => {
     return (
       <Menu>
         <Menu.Item
           className="font-sans"
           key="bulk-upload"
           onClick={() => {
             setShowUpload(true);
             setUploadKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
            //  analytics.track("Clicked Bulk Upload Appointments", {});
           }}
         >
           <UploadOutlined /> Bulk upload appointments
         </Menu.Item>
       </Menu>
     );
   };

  const initialfilterValue = useMemo(() => {
    return {
      practitionerNames: parseStoredNames,
      doctorName:
        storage_condition && filter_practitioner_id
          ? filter_practitioner_id?.split(",")
          : [],
      patientName: storage_condition ? filter_patient_name : "",
      datefilter:
        storage_condition && dateValue
          ? dateValue
          : !storage_condition
          ? "All time"
          : "Today",
      status: storage_condition ? filter_status : "",
    };
  }, [
    dateValue,
    filter_patient_name,
    filter_practitioner_id,
    filter_status,
    parseStoredNames,
    storage_condition,
  ]);

  const initialfilterOptions = {
    doctorNames: [],
    patientNames: [],
  };
  const [isfilterOn, setIsFilterOn] = useState(false);
  const [filterValue, setFilterValue] = useState(initialfilterValue);
  const [filterOptions, setFilterOptions] = useState(initialfilterOptions);

  const [patientSearchKeyword, setPatientSearchKeyword] = useState("");
  const [practitionerSearchKeyword, setpractitionerSearchKeyword] =
    useState(null);
  const [selectedPractitioners, setSelectedPractitioners] = useState(() => {
    const storedPractitioners = localStorage.getItem(
      `${currentPractitioner?.org_uuid}_selectedPractitioners`
    );
    try {
      return storedPractitioners ? JSON.parse(storedPractitioners) : [];
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  });
  const [selectedPractitionerNamesLocal, setSelectedPractitionerNamesLocal] =
    useState(() => {
      const storedNames = localStorage.getItem(
        `${currentPractitioner?.org_uuid}_selectedPractitionerNamesLocal`
      );
      return storedNames ? storedNames.split(",") : [];
    });

  const [selectedPractitionerNamesRecent, setSelectedPractitionerNamesRecent] =
    useState(() => {
      const storedNames = localStorage.getItem(
        `${currentPractitioner?.org_uuid}_selectedPractitionerNamesRecent`
      );
      return storedNames ? storedNames.split(",") : [];
    });

  function hasMultiplePractitionersWithSameName(firstName) {
    const practitionersWithSameName =
      practitionersAndPatients?.practitioner.filter(
        (practitioner) => practitioner.practitioner_firstName === firstName
      );
    return practitionersWithSameName.length > 1;
  }

   const statusOptions = [
    {
      title: 'All',
      value: 'All',
      className:
        'flex justify-center items-center h-8 rounded-full hover:bg-[#f7f7f7]',
    },
    {
      title: 'Completed',
      value: 'Completed',
      className:
        'text-[#1ec990] bg-[#eefaf4] flex items-center justify-center rounded-full hover:bg-[#A2EFC9]  h-8',
    },
    {
      title: 'In Progress',
      value: 'InProgress',
      className:
        'text-[#ff6f00] bg-[#ffe1ca] flex items-center justify-center rounded-full hover:bg-[#F7CFB1]  h-8',
    },
    {
      title: 'Not Started',
      value: 'New',
      className:
        'text-[#5a8dda] bg-[#e7f1ff] flex items-center justify-center rounded-full hover:bg-[#BCD4F7] status-options h-8',
    },
    {
      title: nonVCAIntakeStatus,
      value: 'Unavailable',
      className:
        'text-[#018749] bg-[#caffca] flex items-center justify-center rounded-full hover:bg-[#a8ffa8] status-options h-8',
    },
    {
      title: 'Partial Summary',
      value: 'partial_completed',
      className:
        'text-[#ff6f00] bg-[#ffe1ca] flex items-center justify-center rounded-full hover:bg-[#F7CFB1]  h-8',
    },
  ];

  const getReminderTime = (responseTime) => {
    if (!responseTime) {
      return null;
    }

    const currentTime = moment.utc();
    const tooltipTime = moment.utc(responseTime);
    let tooltipTimeText = null;

    if (currentTime.isSame(tooltipTime, "day")) {
      tooltipTimeText = "Today";
    } else if (currentTime.diff(tooltipTime, "days") === 1) {
      tooltipTimeText = "1 day ago";
    } else {
      const daysDifference = currentTime.diff(tooltipTime, "days");
      tooltipTimeText = `${
        daysDifference > 0 ? `${daysDifference} days ago` : "Today"
      }`;
    }

    return tooltipTimeText;
  };

  const handleDeleteOpen = (appt_uuid, record) => {
    //    analytics.track("Clicked Remove Appointment", {
    //      appointment_date: record?.appointmentDateTime,
    //      appointment_id: record?.appointment_id,
    //      appointment_status: record?.intakeStatus,
    //      practitioner_name: record?.practitioner_Name,
    //    });
    setDeleteText(record);
    setIsDeleteOpen(true);
  };
  const handlePatientChatOpen = (url, record) => {
    // if (url) {
    //   analytics.track("Opened Lumi Chat", {
    //     appointment_date: record?.appointmentDateTime,
    //     appointment_id: record?.appointment_id,
    //     appointment_status: record?.intakeStatus,
    //     practitioner_name: record?.practitioner_Name,
    //   });
    window.open(url, "_blank"); // Open the virtual care site URL
  };

  const handleEditAppointmentModal = (appt_uuid, record) => {
    //  analytics.track("Clicked Edit Appointment", {
    //    appointment_date: record?.appointmentDateTime,
    //    appointment_id: record?.appointment_id,
    //    appointment_status: record?.intakeStatus,
    //    practitioner_name: record?.practitioner_Name,
    //  });
    dispatch(
      getAppointmentDetailsByUuidAction(
        appt_uuid,
        setEditAppointmentOpen,
        accessToken
      )
    );
  };
  const handleSendReminder = (uuid, record) => {
    //   analytics.track("Send Intake Reminder", {
    //     appointment_date: record?.appointmentDateTime,
    //     appointment_id: record?.appointment_id,
    //     appointment_status: record?.intakeStatus,
    //     practitioner_name: record?.practitioner_Name,
    //   });
    dispatch(sendAppointmentReminders(uuid, cachedUserEmail, accessToken));
  };

  const handleNotificationHistoryModal = (appointmentId, record) => {
    setStoreRecord(record);
    const notificationHistory_payload = {
      appointment_id: appointmentId,
    };
    dispatch(
      notificationHistory(
        notificationHistory_payload,
        setIsnotificationHistoryOpen,
        accessToken
      )
    );
  };

  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const handleRowClick = (record, type) => {
    storeInLocal("uuid", record?.appt_uuid);
    navigate(`/schedule/${record?.appt_uuid}`);
  };

  const onCellClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        handleRowClick(record, "Cell");
      },
    };
  };

   const showModal = () => {
     setIsModalOpen(true);
    //  analytics.track("Clicked Create New Appointment", {});
     dispatch(patientNamesOrgAction(accessToken));
   };
   const handleCancel = () => {
     setIsModalOpen(!isModalOpen);
   };
  const menuOptions = (id, viewAppointment) => {
    const conditionForReminder = viewAppointment?.actions;
    const canEditAppointments =
      (!viewAppointment?.isExpired &&
        viewAppointment?.intakeStatus !== "Completed") ||
      (isAdmin &&
        (viewAppointment?.intakeStatus === "Completed" ||
          viewAppointment?.isExpired));

    return (
      <Menu
        onClick={({ key }) => {
          if (key === "reminder" && conditionForReminder) {
            handleSendReminder(id, viewAppointment);
          }
          if (key === "delete") {
            //yes
            handleDeleteOpen(id, viewAppointment);
          }
          //   if (key === "patientChat") {
          //     //yes
          //     handlePatientChatOpen(
          //       viewAppointment?.llm_chat_url,
          //       viewAppointment
          //     );
          //   }
          // if (key === "showQRCode") {
          //   handleShowQRCode(viewAppointment?.llm_chat_url, viewAppointment);
          // }
          if (key === "editAppointment") {
            //yes
            handleEditAppointmentModal(
              viewAppointment?.appt_uuid,
              viewAppointment
            );
          }
          //   if (key === "notificationHistory") {
          //     //yes
          //     handleNotificationHistoryModal(
          //       viewAppointment?.appointment_id,
          //       viewAppointment
          //     );
          //   }
          if (key === "intake") {
            handleRowClick(viewAppointment, "Menu");
          }
          //   if (key === "convertToAuraEncounter") {
          //     handleConvertAppointmentToAuraModal(
          //       viewAppointment?.appointment_id,
          //       viewAppointment
          //     );
          //   }
        }}
      >
        {conditionForReminder &&
          viewAppointment?.isExpired === false &&
          viewAppointment?.intakeStatus != "Unavailable" &&
          viewAppointment?.intakeStatus != "Completed" && (
            <Menu.Item key="reminder">
              <span className="flex items-center dropdown-text space-x-2">
                <SendIntakeIcon /> <span>Send intake reminder</span>
              </span>
            </Menu.Item>
          )}
        <Menu.Item key="intake">
          <span className="dropdown-text flex items-center space-x-2">
            <SummaryIcon /> <span>View summary</span>
          </span>
        </Menu.Item>
        {/* {viewAppointment?.isExpired === false &&
          viewAppointment?.intakeStatus != "Unavailable" && (
            <Menu.Item key="patientChat">
              <span className="dropdown-text flex items-center space-x-1">
                <PatientIcon /> <span>Open chat as patient</span>
              </span>
            </Menu.Item>
          )} */}
        {/* {viewAppointment?.isExpired === false &&
          currentPractitioner?.org_settings?.show_qr_code && (
            <Menu.Item key="showQRCode">
              <span className="dropdown-text flex items-center space-x-1">
                <QRCodeIcon /> <span>Show QR Code</span>
              </span>
            </Menu.Item>
          )} */}

        {/* {viewAppointment?.intakeStatus === "New" &&
          !!viewAppointment.llm_chat_url &&
          !viewAppointment?.isExpired && (
            <Menu.Item key="convertToAuraEncounter">
              <span className="dropdown-text flex items-center space-x-2">
                <AmbientAiIcon /> <span>Convert to Aura Encounter</span>
              </span>
            </Menu.Item>
          )} */}
        {canEditAppointments && (
          <Menu.Item key="editAppointment">
            <span className="dropdown-text flex items-center space-x-2">
              <EditAppointmentIcon /> <span>Edit appointment</span>
            </span>
          </Menu.Item>
        )}
        {/* <Menu.Item key="notificationHistory">
          <span className="dropdown-text flex items-center space-x-2">
            <NotificationsHistoryIcon /> <span>Show notification history</span>
          </span>
        </Menu.Item> */}
        <Menu.Item key="delete">
          <span className="dropdown-text flex items-center space-x-2">
            <BinIcon /> <span>Remove appointment</span>
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: <span className="font-[700]"></span>,
      dataIndex: "practitioner_Name",
      key: "practitioner_Name",
      // sorter: doctor_nameSorter,
      onCell: onCellClick,
      width: "22%",
      render: (text, record) => {
        const textColorClass = record?.isExpired
          ? "expired-appointment-color"
          : "";
        const { date, time } = record?.appointmentDateTime || {};

        // status
        const responseTime =
          record?.notification_status?.email?.patient_intake_reminder?.time;
        let statusResponseText = "Not Started";
        let statusResponseColor = "new-response";
        let additionalIcon = null;
        if (record?.intakeStatus === "Completed") {
          statusResponseText = "Completed";
          statusResponseText = (
            <div className="icon">
              Completed
              <NavLink to={`/schedule/${record?.appt_uuid}`}></NavLink>
            </div>
          );
          statusResponseColor = "completed-response";
        } else if (record?.intakeStatus === "Unavailable") {
          statusResponseText = nonVCAIntakeStatus;
          statusResponseColor = "unavailable-response";
        } else if (record?.intakeStatus === "InProgress") {
          statusResponseText = <div className="icon">In Progress</div>;
          statusResponseColor = "inprogress-response";
        } else if (record?.intakeStatus === "partial_completed") {
          statusResponseText = "Partial Summary";
          statusResponseColor = "partial-response";
        } else if (
          record?.intakeStatus === "New" &&
          record?.notification_status?.email?.patient_intake_reminder?.event ===
            "clicked"
        ) {
          statusResponseText = "Not Started";
          statusResponseColor = "new-response";
          const reminderTime = getReminderTime(responseTime);
          const tooltipTitle = (
            <div className="flex">
              <EmailClickedTooltipIcon className={`mr-1 mt-1`} />
              <span>
                Email: Last Clicked{" "}
                <span className="tooltip-text"> {reminderTime} </span>
              </span>
            </div>
          );
          additionalIcon = (
            <Tooltip title={tooltipTitle} placement="topRight">
              <ClickedIcon className="chat-icon ml-2" />{" "}
            </Tooltip>
          );
        } else if (
          record?.intakeStatus === "New" &&
          record?.notification_status?.email?.patient_intake_reminder?.event ===
            "opened"
        ) {
          statusResponseText = "Not Started";
          statusResponseColor = "new-response";
          const reminderTime = getReminderTime(responseTime);

          const tooltipTitle = (
            <div className="flex">
              <EmailOpenedTooltipIcon className={`mr-1 mt-0.5`} />
              <span>
                Email: Last Opened{" "}
                <span className="tooltip-text"> {reminderTime} </span>
              </span>
            </div>
          );
          additionalIcon = (
            <Tooltip title={tooltipTitle} placement="topRight">
              {" "}
              <EmailOpenIcon className="chat-icon ml-2" />{" "}
            </Tooltip>
          );
        } else if (
          (record?.intakeStatus === "New" &&
            record?.notification_status?.email?.patient_intake_reminder
              ?.event === "delivered") ||
          record?.notification_status?.sms?.patient_intake_reminder?.event ===
            "delivered"
        ) {
          statusResponseText = "Not Started";
          statusResponseColor = "new-response";
          const reminderTime = getReminderTime(responseTime);
          additionalIcon = (
            <Tooltip
              title={
                <>
                  {record?.notification_status?.email
                    ?.patient_intake_reminder ? (
                    <div className="flex">
                      {" "}
                      <EmailTooltipIcon className={`mr-1`} />
                      Email :{" "}
                      {record?.notification_status?.email
                        ?.patient_intake_reminder?.event === "exception"
                        ? "Undelivered"
                        : record?.notification_status?.email
                            ?.patient_intake_reminder?.event !== "exception"
                        ? record?.notification_status?.email
                            ?.patient_intake_reminder?.event === "delivered"
                          ? "Not Seen. Last Delivered"
                          : record?.notification_status?.email
                              ?.patient_intake_reminder?.event !==
                              "exception" &&
                            record?.notification_status?.email
                              ?.patient_intake_reminder?.event !== "delivered"
                          ? capitalizeFirstLetter(
                              record?.notification_status?.email
                                ?.patient_intake_reminder?.event
                            )
                          : null
                        : null}
                      <span className="ml-1 tooltip-text">
                        {record?.notification_status?.email
                          ?.patient_intake_reminder?.event === "exception"
                          ? ""
                          : reminderTime}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {record?.notification_status?.sms?.patient_intake_reminder ? (
                    <div className="mt-1 flex">
                      <SmsTooltipIcon className={`mr-1 mt-0.5`} />
                      Text :{" "}
                      {record?.notification_status?.sms?.patient_intake_reminder
                        ?.event === "exception"
                        ? "Undelivered"
                        : record?.notification_status?.sms
                            ?.patient_intake_reminder?.event !== "exception"
                        ? record?.notification_status?.sms
                            ?.patient_intake_reminder?.event === "sent"
                          ? "Last Delivered"
                          : record?.notification_status?.sms
                              ?.patient_intake_reminder?.event !==
                              "exception" &&
                            record?.notification_status?.sms
                              ?.patient_intake_reminder?.event !== "sent"
                          ? capitalizeFirstLetter(
                              record?.notification_status?.sms
                                ?.patient_intake_reminder?.event
                            )
                          : null
                        : null}
                      <span className="ml-1 tooltip-text">
                        {record?.notification_status?.email
                          ?.patient_intake_reminder?.event === "exception"
                          ? ""
                          : reminderTime}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              }
              placement="topRight"
            >
              {""}
              <VisibilityOffIcon className="chat-icon ml-3" />
            </Tooltip>
          );
        } else if (
          (record?.intakeStatus === "New" &&
            record?.notification_status?.email?.patient_intake_reminder
              ?.event === "failed") ||
          record?.notification_status?.email?.patient_intake_reminder?.event ===
            "bounced" ||
          record?.notification_status?.sms?.patient_intake_reminder?.event ===
            "exception"
        ) {
          statusResponseText = "Not Started";
          statusResponseColor = "new-response";
          const reminderTime = getReminderTime(responseTime);

          additionalIcon = (
            <Tooltip
              title={
                <>
                  {record?.notification_status?.email
                    ?.patient_intake_reminder ? (
                    <div className="flex">
                      <FailedEmailIcon className={`mr-1 mt-1`} />
                      Email :{" "}
                      {record?.notification_status?.email
                        ?.patient_intake_reminder?.event === "exception"
                        ? "Undelivered"
                        : record?.notification_status?.email
                            ?.patient_intake_reminder?.event !== "exception"
                        ? record?.notification_status?.email
                            ?.patient_intake_reminder?.event === "delivered"
                          ? "Not Seen. Last Delivered"
                          : record?.notification_status?.email
                              ?.patient_intake_reminder?.event !==
                              "exception" &&
                            record?.notification_status?.email
                              ?.patient_intake_reminder?.event !== "delivered"
                          ? capitalizeFirstLetter(
                              record?.notification_status?.email
                                ?.patient_intake_reminder?.event
                            )
                          : null
                        : null}
                      <span className="ml-3 tooltip-text">
                        {record?.notification_status?.email
                          ?.patient_intake_reminder?.event === "exception"
                          ? ""
                          : reminderTime}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {record?.notification_status?.sms?.patient_intake_reminder ? (
                    <div className="flex mt-1">
                      <UndeliveredSmsIcon className={`mr-1 mt-1`} />
                      Text :{" "}
                      {record?.notification_status?.sms?.patient_intake_reminder
                        ?.event === "exception"
                        ? "Undelivered"
                        : record?.notification_status?.sms
                            ?.patient_intake_reminder?.event !== "exception"
                        ? record?.notification_status?.sms
                            ?.patient_intake_reminder?.event === "sent"
                          ? "Last Delivered"
                          : record?.notification_status?.sms
                              ?.patient_intake_reminder?.event !==
                              "exception" &&
                            record?.notification_status?.sms
                              ?.patient_intake_reminder?.event !== "sent"
                          ? capitalizeFirstLetter(
                              record?.notification_status?.sms
                                ?.patient_intake_reminder?.event
                            )
                          : null
                        : null}
                      <span className="ml-3 tooltip-text">
                        {record?.notification_status?.email
                          ?.patient_intake_reminder?.event === "exception"
                          ? ""
                          : reminderTime}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              }
              placement="topRight"
            >
              {""}
              <WarningIcon className="chat-icon ml-2" />
            </Tooltip>
          );
        } else if (record?.intakeStatus === "Summary InProgress") {
          statusResponseText = "Summarizing";
          statusResponseColor = "summary-inprogress-response";
        }
        const localDateString = moment
          .utc(record?.appointmentDateTime?.date, "MMM Do, YYYY hh:mm A")
          .format("MMM Do, YYYY");
        const localTimeString = moment.utc(time, "hh:mm A").format("h:mm A");

        return (
          <>
            <div className="flex w-full items-center">
              <div className="flex items-center ">
                <ProfileLogo
                  filteredData={filteredData}
                  name={`${record.practitioner_firstName} ${record.practitioner_lastName}`}
                  className={"profile-popover-logo mr-2 sm:mr-2 lg:mr-3 "}
                  practitioner_name={record?.practitioner_Name}
                />
                <div>
                  <div className="flex-grow">
                    {/* Patient Name and DOB  */}
                    <div>
                      <div className="icon">
                        <div
                          className="name"
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          {record?.patient_Name}
                        </div>
                      </div>
                      <div className="dob">DOB : {record?.dateofBirth}</div>
                    </div>
                    {/* Condition */}
                    <div>
                      <div>{record?.condition_name}</div>
                    </div>
                    {/* status */}
                    <div className="notification-icons">
                      <span className={statusResponseColor}>
                        {statusResponseText}
                      </span>
                      {/* <span>{additionalIcon}</span> */}
                    </div>

                    {/* practitioner Name */}
                    <div className="dob flex">
                      <span>
                        <StethMobileIcon />
                      </span>
                      <span className="ml-1">{record.practitioner_Name}</span>
                    </div>

                    {/* Appointment Date and time  */}
                    <div>
                      {record.isExpired ? (
                        <Tooltip title="Appointment is expired" placement="top">
                          <div>
                            <div className="flex">
                              <span className="">
                                <CalendarMobileIcon />
                              </span>
                              {currentPractitioner?.org_settings
                                ?.show_appointment_time ? (
                                <span className="dob ml-1">
                                  {localDateString}
                                  <span
                                    className="ml-1"
                                    style={{
                                      fontSize: "13px",
                                      color: "#777777",
                                    }}
                                  >
                                    {localTimeString}
                                  </span>
                                </span>
                              ) : (
                                <span className="dob ml-1">
                                  {moment(date, "MMM Do, YYYY hh:mm A").format(
                                    "MMM Do, YYYY"
                                  )}
                                </span>
                              )}
                            </div>
                            {currentPractitioner?.org_settings
                              ?.show_appointment_time && (
                              <div className={`${textColorClass} start-time`}>
                                {localTimeString}
                                <span
                                  className="ml-1"
                                  style={{
                                    fontSize: "13px",
                                    color: "#777777",
                                  }}
                                >
                                  {localTimeString}
                                </span>
                              </div>
                            )}
                          </div>
                        </Tooltip>
                      ) : (
                        <div>
                          <div className="flex">
                            <span className="">
                              <CalendarMobileIcon />
                            </span>
                            {currentPractitioner?.org_settings
                              ?.show_appointment_time ? (
                              <span className="dob ml-1">
                                {localDateString}
                                <span
                                  className="ml-1"
                                  style={{
                                    fontSize: "13px",
                                    color: "#777777",
                                  }}
                                >
                                  {localTimeString}
                                </span>
                              </span>
                            ) : (
                              <span className="dob ml-1">
                                {moment(date, "MMM Do, YYYY hh:mm A").format(
                                  "MMM Do, YYYY"
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: " ",
      key: "actions",
      dataIndex: "actions",
      width: "1%",

      render: (text, record) => {
        return (
          <Dropdown
            className="actionMenu"
            overlay={menuOptions(record?.appt_uuid, record)}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <ActionMenuIcon />
            </a>
          </Dropdown>
        );
      },
    },
  ].filter(Boolean);


  useEffect(() => {
    if (currentPractitioner?.org_uuid) {
      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_dateValue`,
        dateValue
      );
      setDateValue(dateValue);
    }
  }, [currentPractitioner?.org_uuid, dateValue]);

  useEffect(() => {
    localStorage.setItem(
      `${currentPractitioner?.org_uuid}_selectedPractitionerNamesLocal`,
      selectedPractitionerNamesLocal
    );
  }, [currentPractitioner?.org_uuid, selectedPractitionerNamesLocal]);

  useEffect(() => {
    localStorage.setItem(
      `${currentPractitioner?.org_uuid}_selectedPractitionerNamesRecent`,
      selectedPractitionerNamesRecent
    );
  }, [selectedPractitionerNamesRecent]);

  useEffect(() => {
    let isFetching = false;
    const fetchAppointments = async () => {
      try {
        await dispatch(getAppointmentsByStatus(25, 0, accessToken));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
      isFetching = false;
    };
    fetchAppointments();
  }, [getAppointmentsByStatus]);

  useEffect(() => {
    if (
      getAppointmentStatusList &&
      Array.isArray(getAppointmentStatusList) &&
      getAppointmentStatusList.length > 0
    ) {
      let doctorNames = [
          {
            label: "All",
            value: "All",
          },
        ],
        patientNames = [];
      let newData = null;
      newData = getAppointmentStatusList?.map((list, index) => {
        const practitionerName =
          list?.practitioner_firstName || list?.practitioner_lastName
            ? `${list.practitioner_firstName} ${list.practitioner_lastName}`
            : "N/A";

        const patientName =
          list?.patient_firstName || list?.patient_lastName
            ? `${list.patient_firstName} ${list.patient_lastName}`
            : "N/A";

        !doctorNames.some(
          (doctor) =>
            doctor.value ===
            `${list?.practitioner_title} ${practitionerName.trim()}`
        ) &&
          doctorNames.push({
            id: list?.practitioner_id,
            label: `${
              list?.practitioner_title ? list?.practitioner_title + ". " : ""
            }${practitionerName.trim()}`,
            value: `${
              list?.practitioner_title ? list?.practitioner_title + ". " : ""
            }${practitionerName.trim()}`,
          });
        !patientNames.some((patient) => patient.value === patientName.trim()) &&
          patientNames.push({
            id: patientName.trim(),
            value: patientName.trim(),
            patient_id: list?.patient_id,
          });
        return {
          key: index,
          practitioner_Name: `${
            list?.practitioner_title ? list?.practitioner_title + ". " : ""
          } ${practitionerName?.trim()}`,

          patient_Name: patientName.trim(),
          appointmentDateTime: {
            date: list?.start_date ? list?.start_date : "N/A",
            time: list?.start_time ? list?.start_time : "N/A",
          },
          practitioner_firstName: list?.practitioner_firstName,
          practitioner_lastName: list?.practitioner_lastName,
          dateofBirth: list?.birth_date ? list?.birth_date : "N/A",
          patient_lastName: list?.patient_lastName,
          appointment_id: list?.appointment_id,
          intakeStatus: list?.chat_completion_status,
          llm_chat_url: list?.llm_chat_url,
          appt_uuid: list?.appt_uuid,
          settings: list?.settings,
          patient_id: list?.patient_id,
          condition_name: list?.condition_name
            ? list?.condition_name == "Unknown"
              ? nonVCACondition
              : list?.condition_name
            : "N/A",
          notification_status: list?.notification_status,
          isExpired: list?.isExpired,
          actions:
            list?.settings?.enable_patient_email_notifications ||
            list?.settings?.enable_patient_sms_notifications,
        };
      });
      if (newData && Array.isArray(newData) && newData.length > 0) {
        setData(newData);
        setFilteredData(newData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [getAppointmentStatusList]);

  const payload = {
    is_new_appointment: true,
  };

  useEffect(() => {
    dispatch(appointmentTypesAction(accessToken));
    dispatch(getRecentSearchAction("appointments", accessToken));
    dispatch(getAllPractitionersNames(payload, accessToken));
    dispatch(getAppointmentPractitionerAndPatients(accessToken));
  }, [dispatch]);


    useEffect(() => {
      const DoctorArray = practitionersAndPatients?.practitioner?.map(
        (practitioner, index, array) => ({
          id: practitioner?.practitioner_id,
          value:
            array.filter(
              (p) =>
                p.practitioner_firstName === practitioner.practitioner_firstName
            ).length > 1
              ? `${practitioner.practitioner_firstName}`
              : practitioner.practitioner_firstName,
          key: practitioner?.practitioner_id,
        })
      );

      DoctorArray?.unshift({ label: "All", value: "All" });

      const uniquePatientNames = new Set();
      const PatientArray = practitionersAndPatients?.patient?.reduce(
        (accumulator, patient) => {
          const patientName = patient?.patient_Name;
          if (!uniquePatientNames.has(patientName)) {
            uniquePatientNames.add(patientName);
            accumulator.push({
              id: patientName,
              value: patientName,
            });
          }
          return accumulator;
        },
        []
      );

      setFilterOptions({
        doctorNames: DoctorArray,
        patientNames: PatientArray,
      });
    }, [practitionersAndPatients]);

  useEffect(() => {
    if (
      filteredValue &&
      Array.isArray(filteredValue) &&
      filteredValue?.length > 0
    ) {
      let newData = filteredValue?.map((list, index) => {
        const practitionerName =
          list?.practitioner_firstName || list?.practitioner_lastName
            ? `${list.practitioner_firstName} ${list.practitioner_lastName}`
            : "N/A";
        const patientName =
          list?.patient_firstName || list?.patient_lastName
            ? `${list.patient_firstName} ${list.patient_lastName}`
            : "N/A";
        return {
          key: index,
          practitioner_Name: `${
            list?.practitioner_title ? list?.practitioner_title + ". " : ""
          }${practitionerName.trim()}`,
          patient_Name: patientName.trim(),
          appointmentDateTime: {
            date: list?.start_date ? list?.start_date : "N/A",
            time: list?.start_time ? list?.start_time : "N/A",
          },
          dateofBirth: list?.birth_date ? list?.birth_date : "N/A",
          patient_lastName: list?.patient_lastName,
          practitioner_firstName: list?.practitioner_firstName,
          practitioner_lastName: list?.practitioner_lastName,
          appointment_id: list?.appointment_id,
          intakeStatus: list?.chat_completion_status,
          llm_chat_url: list?.llm_chat_url,
          appt_uuid: list?.appt_uuid,
          condition_name: list?.condition_name
            ? list?.condition_name == "Unknown"
              ? "Not Available"
              : list?.condition_name
            : "N/A",
          notification_status: list?.notification_status,
          isExpired: list?.isExpired,
          patient_id: list?.patient_id,
          actions:
            list?.settings?.enable_patient_email_notifications ||
            list?.settings?.enable_patient_sms_notifications,
        };
      });
      if (newData && Array.isArray(newData) && newData.length > 0) {
        setFilteredData(newData);
        setIsLoading(false);
      }
    } else {
      setFilteredData([]);
      setIsLoading(false);
    }
  }, [filteredValue]);

  const onChangeHandler = async (value, fieldName, dates) => {
    console.log("onChangeHandler")
    storeInLocal(
      `${currentPractitioner?.org_uuid}_show_current_practitioner`,
      false
    );
    if (fieldName === "datefilter") {
      analytics.track("Entered Date Filter", {
        date_filter: value,
      });
      let startDate = "";
      let endDate = "";
      if (value === "Custom…🗓️") {
        handleCustomSelect();
      } else {
        setIsCustomSelected(false);

        if (value === "Today") {
          startDate = moment().format("YYYY-MM-DD");
          endDate = startDate;
        } else if (value === "Yesterday") {
          startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
          endDate = startDate;
        } else if (value === "Tomorrow") {
          startDate = moment().add(1, "days").format("YYYY-MM-DD");
          endDate = startDate;
        } else if (value === "Past 7 days") {
          startDate = moment().subtract(6, "days").format("YYYY-MM-DD");
          endDate = moment().format("YYYY-MM-DD");
        } else if (value === "Next 7 days") {
          startDate = moment().format("YYYY-MM-DD");
          endDate = moment().add(6, "days").format("YYYY-MM-DD");
        } else if (value === "All time") {
          startDate = getAppointmentAllStartDateFilter("");
          endDate = getAppointmentAllEndDateFilter("");
          setFilterValue({
            ...filterValue,
            startDate: "All Time",
            endDate: "All Time",
            datefilter: value,
          });
        }
        if (
          (startDate && endDate) ||
          filterValue?.doctorName?.length > 0 ||
          filterValue?.patientName ||
          filterValue.status
        ) {
          dispatch(
            getAppointmentByFilter(
              filterValue?.doctorName?.[0] === ""
                ? []
                : filterValue?.doctorName,
              filterValue.patientName === null ? "" : filterValue.patientName,
              getAppointmentAllStartDateFilter(startDate),
              getAppointmentAllEndDateFilter(endDate),
              filterValue?.status === null ? "" : filterValue.status,
              "normal",
              startIndex
            )
          ) && setIsFilterOn(true);
        } else if (value === "All time") {
          if (
            filterValue?.doctorName?.length === 0 &&
            filterValue?.patientName === "" &&
            filterValue?.status === ""
          ) {
            setIsFilterOn(false);
            await dispatch(getAppointmentsByStatus(startIndex, undefined));
          } else {
            dispatch(
              getAppointmentByFilter(
                filterValue?.doctorName?.[0] === ""
                  ? []
                  : filterValue?.doctorName,
                filterValue.patientName === null ? "" : filterValue.patientName,
                getAppointmentAllStartDateFilter(""),
                getAppointmentAllEndDateFilter(""),
                filterValue?.status === null ? "" : filterValue.status,
                "normal",
                startIndex
              )
            ) && setIsFilterOn(true);
          }
        }
      }
      setFilterValue({
        ...filterValue,
        ["datefilter"]: value,
        startDate: startDate,
        endDate: endDate,
      });
    } else if (fieldName === "doctorName") {
      let globalDoctorIds = [];
      let startDate = "";
      let endDate = "";
      if (dateValue === "Custom") {
        startDate = filter_startDate;
        endDate = filter_endDate;
      } else {
        startDate = filterValue?.startDate;
        endDate = filterValue?.endDate;
      }
      value.forEach((val) => {
        if (isNaN(val)) {
          const doctor = filterOptions?.doctorNames?.find(
            (doc) => doc.value.trim() === val.trim()
          );
          if (doctor) {
            globalDoctorIds.push(doctor.id);
          }
        } else {
          globalDoctorIds.push(val);
        }
      });
      const patientName = filterOptions?.patientNames?.filter(
        (data) => data.value === filterValue.patientName
      )?.[0]?.id;
      setFilterValue({
        ...filterValue,
        doctorName: value !== "All" ? globalDoctorIds : [],
        practitionerNames: parseStoredNames,
      });

      if (
        value?.length === 0 &&
        !filterValue.patientName &&
        !filterValue.startDate &&
        !filterValue.endDate &&
        !filterValue.status
      ) {
        setIsFilterOn(false);
        fetchCounterRef.current = 0;
      } else if (value?.length === 0) {
        dispatch(
          getAppointmentByFilter(
            [],
            patientName,
            getAppointmentAllStartDateFilter(startDate),
            getAppointmentAllEndDateFilter(endDate),
            filterValue.status === null ? "" : filterValue.status,
            "normal",
            startIndex,
            accessToken
          )
        ) && setIsFilterOn(true);
      } else {
        value &&
          dispatch(
            getAppointmentByFilter(
              globalDoctorIds,
              patientName,
              getAppointmentAllStartDateFilter(startDate),
              getAppointmentAllEndDateFilter(endDate),
              filterValue.status === null ? "" : filterValue.status,
              "normal",
              startIndex,
              accessToken
            )
          ) &&
          setIsFilterOn(true);
      }
      if (fieldName === "doctorName" && !isfilterOn) {
        setFilterValue({
          ...filterValue,
          [fieldName]: value !== "All" ? value : [],
        });
        fetchCounterRef.current = 0;
      }
      const selectedPractitionerNames = value
        .map((id) => {
          const practitioner = filterOptions?.doctorNames?.find(
            (doc) => doc.id === id
          );
          return practitioner ? practitioner.value : "";
        })
        .filter((name) => name !== "");

      const updatedSelectedPractitionerNames = [
        ...parseStoredNames,
        ...selectedPractitionerNames,
      ];

      localStorage.setItem(
        `${currentPractitioner?.org_uuid}_selectedPractitionerNamesLocal`,
        JSON.stringify(updatedSelectedPractitionerNames)
      );
      const newValues = value.map((item) => {
        if (typeof item === "string") {
          return item;
        } else if (typeof item === "number") {
          const practitioner = filterOptions?.doctorNames?.find(
            (doc) => doc.id === item
          );
          return practitioner ? practitioner.value : item;
        }
        return item;
      });
      setSelectedPractitionerNamesLocal(updatedSelectedPractitionerNames);
    } else if (fieldName === "patientName") {
      analytics.track("Entered Patient Name Search", {});
      setFilterValue({
        ...filterValue,
        ["patientName"]: value,
      });
      let startDate = "";
      let endDate = "";
      if (dateValue === "Custom") {
        startDate = filter_startDate;
        endDate = filter_endDate;
      } else {
        startDate = filterValue?.startDate;
        endDate = filterValue?.endDate;
      }

      if (value === "") {
        setFilteredPatientNames([]);
        const patientName = "";
        if (
          (filterValue?.doctorName?.length === 0 ||
            filterValue?.doctorName?.[0] === "") &&
          !patientName &&
          !startDate &&
          !endDate &&
          !filterValue.status
        ) {
          fetchCounterRef.current = 0;
          setIsFilterOn(false);
          setFilterValue({
            ...filterValue,
            patientName: "",
          });
        } else {
          dispatch(
            getAppointmentByFilter(
              filterValue?.doctorName?.[0] === ""
                ? []
                : filterValue?.doctorName,
              patientName,
              getAppointmentAllStartDateFilter(startDate),
              getAppointmentAllEndDateFilter(endDate),
              filterValue?.status === null ? "" : filterValue.status,
              "normal",
              startIndex
            )
          ) && setIsFilterOn(true);
        }
      } else {
        const patientName = filterOptions?.patientNames?.filter(
          (data) => data.value === value
        )?.[0]?.id;
        if (patientName) {
          dispatch(
            getAppointmentByFilter(
              filterValue?.doctorName?.[0] === ""
                ? []
                : filterValue?.doctorName,
              patientName,
              getAppointmentAllStartDateFilter(startDate),
              getAppointmentAllEndDateFilter(endDate),
              filterValue?.status === null ? "" : filterValue.status,
              "normal",
              startIndex
            )
          ) && setIsFilterOn(true);
        }
      }
    } else if (fieldName === "dateRange") {
      const [start, end] = dates;
      const startDate = start ? moment(start).format("YYYY-MM-DD") : "";
      const endDate = end ? moment(end).format("YYYY-MM-DD") : "";

      setFilterValue({
        ...filterValue,
        startDate: startDate,
        endDate: endDate,
      });

      const patientName = filterOptions?.patientNames?.filter(
        (data) => data.value === filterValue.patientName
      )?.[0]?.id;

      if (
        (startDate && endDate) ||
        filterValue?.doctorName?.length > 0 ||
        patientName ||
        filterValue.status
      ) {
        analytics.track("Applied Date Range Filter", {
          start_date: start,
          end_date: end,
        });
        dispatch(
          getAppointmentByFilter(
            filterValue?.doctorName?.[0] === "" ? [] : filterValue?.doctorName,
            patientName,
            getAppointmentAllStartDateFilter(startDate),
            getAppointmentAllEndDateFilter(endDate),
            filterValue?.status === null ? "" : filterValue.status,
            "normal",
            startIndex
          )
        );
        setIsFilterOn(true);
      } else {
        fetchCounterRef.current = 0;
        setIsFilterOn(false);
      }
    } else if (fieldName === "status") {
    //   analytics.track("Selected Status Filter", {
    //     status: value,
    //   });
      let startDate = "";
      let endDate = "";
      if (dateValue === "Custom") {
        startDate = filter_startDate;
        endDate = filter_endDate;
      } else {
        startDate = filterValue?.startDate;
        endDate = filterValue?.endDate;
      }
      if (value === "All") {
        setFilterValue({
          ...filterValue,
          status: "",
        });

        if (
          (filterValue?.doctorName?.length === 0 ||
            filterValue?.doctorName?.[0] === "") &&
          !filterValue?.patientName &&
          !filterValue?.startDate &&
          !filterValue?.endDate
        ) {
          setIsFilterOn(false);
          fetchCounterRef.current = 0;
        } else {
          setIsFilterOn(true);
        }

        dispatch(
          getAppointmentByFilter(
            filterValue?.doctorName?.[0] === "" ? [] : filterValue?.doctorName,
            filterValue.patientName === null ? "" : filterValue.patientName,
            getAppointmentAllStartDateFilter(startDate),
            getAppointmentAllEndDateFilter(endDate),
            "",
            "normal",
            startIndex,
            accessToken
          )
        );
      } else {
        setFilterValue({
          ...filterValue,
          status: value,
        });
        dispatch(
          getAppointmentByFilter(
            filterValue?.doctorName?.[0] === "" ? [] : filterValue?.doctorName,
            filterValue.patientName === null ? "" : filterValue.patientName,
            getAppointmentAllStartDateFilter(startDate),
            getAppointmentAllEndDateFilter(endDate),
            value,
            "normal",
            startIndex,
            accessToken
          )
        ) && setIsFilterOn(true);
      }
    }
  };

  return (
    <>
      <TopNavBar />
      <div className="page-wrapper appointment-page">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className=" w-full xl:w-1/5 2xl:w-1/5 drop-shadow-sm bg-white rounded-xl practitioner-dropdown">
            <Select
              // open
              suffixIcon={<ExpandIcon fill={"#000000"} />}
              mode="multiple"
              bordered={false}
              className={`border-none w-full overflow-auto font-sans grid grid-cols-0 items-center focus:outline-none  py-1 ${
                selectedPractitioners.length === 0
                  ? "h-10 flex items-center"
                  : ""
              }`}
              filterOption={(inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !==
                -1
              }
              placeholder={
                practitionersAndPatients?.practitioner
                  ? "Select practitioners"
                  : "Loading..."
              }
              onDropdownVisibleChange={(open) => {
                // Show the profile logo when the dropdown is opened
                setShowProfileLogo(open);
              }}
              value={
                filterOptions?.doctorNames?.length > 0
                  ? selectedPractitioners
                  : null
              }
              onChange={(value) => {
                setpractitionerSearchKeyword(value);
                // analytics.track("Selected Practitioner Filter", {
                //   practitioner_name: value,
                // });
                onChangeHandler(value, "doctorName");
                setSelectedPractitioners(value);
              }}
              // onChange={(value) => {
              //     const uniqueValues = Array.from(new Set(value)); // Remove duplicates
              //     setpractitionerSearchKeyword(uniqueValues);
              //     analytics.track("Selected Practitioner Filter", { practitioner_name: uniqueValues });
              //     onChangeHandler(uniqueValues, "doctorName");
              //     setSelectedPractitioners(uniqueValues);
              // }}
              optionFilterProp="label"
              showSearch
            >
              {(filteredData?.length > 0 || isfilterOn) && (
                <>
                  {/* {practitionersAndPatients?.practitioner && (
                                                            <Select.Option value="All">All</Select.Option>
                                                        )} */}
                  {practitionersAndPatients?.practitioner?.map((names, idx) => (
                    <Select.Option
                      key={names.id}
                      value={names.practitioner_id}
                      email={names.email}
                      label={names.practitioner_firstName}
                    >
                      <div className="font-sans flex">
                        <div className="flex items-center">
                          {!selectedPractitioners?.includes(
                            names?.practitioner_id
                          ) &&
                            showProfileLogo && (
                              <ProfileLogo
                                filteredData={filteredData}
                                practitionersAndPatients={
                                  practitionersAndPatients
                                }
                                name={`${names.first_name} ${names.last_name}`}
                                className={
                                  "profile-popover-logo mr-1 sm:mr-2 lg:mr-3"
                                }
                                practitioner_name={names?.practitioner_Name}
                              />
                            )}

                          <div className="">
                            {names.practitioner_firstName}
                            {hasMultiplePractitionersWithSameName(
                              names.practitioner_firstName
                            ) && (
                              <div
                                style={{
                                  color: "grey",
                                  fontSize: "smaller",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {selectedPractitioners &&
                                  !selectedPractitioners.includes(
                                    names?.practitioner_id
                                  ) && <span>{names.practitioner_email}</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Select.Option>
                  ))}
                </>
              )}
            </Select>
          </div>

          <div className="bg-white p-1 rounded-xl drop-shadow-sm flex items-center tree-dropdown">
            <label
              for="appointments"
              className="mr-1 ml-2 text-sm text-black whitespace-nowrap"
            >
              Status
            </label>
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center flex-nowrap ">
              <div className=" grow shrink-0 w-full ">
                <TreeSelectDropdown
                  suffixIcon={
                    <ExpandIcon
                      fill={"#000000"}
                      className="-mr-2 absolute right-0 "
                    />
                  }
                  name="datefilter"
                  showSearch={false}
                  bordered={false}
                  className="h-8 !w-32 bg-transparent border-none focus:border-none rounded-xl focus:bg-gray-100 caret-transparent flex items-center hover:bg-gray-100 pr-2 placeholder:text-sm text-center"
                  placeholder={"All"}
                  value={
                    isfilterOn && filterValue?.status !== null
                      ? filterValue?.status
                      : ""
                  }
                  options={statusOptions}
                  onChange={(value, valueString) =>
                    onChangeHandler(value, "status")
                  }
                  popupClassName={"!w-36"}
                ></TreeSelectDropdown>
              </div>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className=" w-36">
              {(localStorage.getItem(
                `${currentPractitioner?.org_uuid}_selectedFilters`
              ) !== "Today" ||
                filterValue?.doctorName?.length > 0 ||
                filterValue?.patientName ||
                filterValue?.status) && (
                <button
                  className="hover:bg-[#E5E8EB]
                                            hover:underline underline-offset-2 decoration-black h-10 px-4 rounded-xl drop-shadow-sm font-normal text-black text-[13px]"
                  onClick={async () => {
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_selectedPractitioners`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_dateValue`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_filter_status`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_filter_patient_name`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_selectedTitle`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_myAppointments`
                    );
                    localStorage.removeItem(
                      `${currentPractitioner?.org_uuid}_selectDates`
                    );
                    localStorage.setItem(
                      `${currentPractitioner?.org_uuid}_selectedFilters`,
                      "Today"
                    );
                    setSelectDates([null, null]);
                    dispatch(filteredApptsTotalSlice(null));
                    fetchCounterRef.current = undefined;
                    setSelectedPractitioners([]);
                    setRenameTitle("");
                    setMyAppointments("");
                    setPatientSearchKeyword("");
                    setSelectedTitle("");
                    setDateValue("Today");
                    setIsFilterOn(true);
                    setSelectedPractitionerNamesLocal([]);
                    setSelectedPractitionerNamesRecent([]);
                    setpractitionerSearchKeyword(null);
                    setResetDateFilter(true);
                    setFilterValue({
                      practitionerNames: [],
                      doctorName: [],
                      patientName: "",
                      startDate: moment().format("YYYY-MM-DD"),
                      endDate: moment().format("YYYY-MM-DD"),
                      datefilter: "Today",
                      status: "",
                    });
                    await dispatch(
                      getAppointmentByFilter(
                        [],
                        "",
                        moment().format("YYYY-MM-DD"),
                        moment().format("YYYY-MM-DD"),
                        "",
                        "normal",
                        startIndex,
                        accessToken
                      )
                    );
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="">
              <AddNewAppointment
                isOpen={isModalOpen}
                onCancel={handleCancel}
                setIsOpen={setIsModalOpen}
                startIndex={startIndex}
                isfilterOn={isfilterOn}
                accessToken={accessToken}
              />
              {/* <span style={{ position: "absolute" }}>
                <AppointmentsCSVUploader
                  visible={showUpload}
                  setVisible={setShowUpload}
                />
              </span> */}
              {currentPractitioner?.org_settings
                ?.enable_bulk_appointment_upload ? (
                <Dropdown.Button
                  overlay={addAppointmentOptions()}
                  overlayStyle={{ top: "18rem" }}
                  placement="bottom"
                  rootClassName="add-appointment-dropdown rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669]"
                  trigger={["click"]}
                  icon={<ExpandIcon fill={"#ffffff"} />}
                  onClick={showModal}
                >
                  <div className="add-appointment-div flex">
                    <PlusIcon />
                    <span className="text-white pl-3 font-normal font-sans">
                      Add appointment
                    </span>
                  </div>
                </Dropdown.Button>
              ) : (
                <button
                  className="rounded-xl h-10 items-center p-4 flex bg-[#00D090] hover:bg-[#059669]"
                  onClick={showModal}
                >
                  <div className=" flex items-center">
                    <PlusIcon />
                    <span className="text-white pl-3 font-normal font-sans">
                      Add appointment
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
        {deleteText && (
          <div className="">
            <DeleteAppointment
              isOpen={isDeleteOpen}
              onCancel={() => setIsDeleteOpen(false)}
              setIsOpen={setIsDeleteOpen}
              deleteText={deleteText}
              startIndex={startIndex}
              isfilterOn={isfilterOn}
              accessToken={accessToken}
            />
          </div>
        )}
        {editAppointmentOpen && (
          <>
            <EditAppointment
              isOpen={editAppointmentOpen}
              onCancel={() => setEditAppointmentOpen(false)}
              setIsOpen={setEditAppointmentOpen}
              startIndex={startIndex}
              isfilterOn={isfilterOn}
              accessToken={accessToken}
            />
          </>
        )}
        <div className="mt-5 ant-table rounded-xl shadow-xl">
          <Table
            className={"appointment-page-table"}
            rowClassName={(record) => {
              let rowClass = "";

              if (
                record?.intakeStatus === "Completed" ||
                record?.intakeStatus === "InProgress"
              ) {
                rowClass = "hoverable-row";
              }
              if (record?.isExpired) {
                rowClass = "expired-row";
              }
              return rowClass.trim();
            }}
            data={filteredData}
            columns={columns}
            items={false}
            loading={
              apptsAPICall && getAppointmentStatusList?.length === 0
                ? !isLoading
                : isLoading
            }
            locale={{ emptyText: "No Data" }}
            // additionalPatientInfo={showPatientResetLink ? true : false}
            // handleReset={handleReset}
            // remainderPatientAppts={remainderPatientAppts}
          />
        </div>

        <div className="flex justify-center items-center mt-4">
          <p>
            {filteredData?.length > 0
              ? `Showing ${filteredData?.length} of ${
                  filteredApptsTotal ? filteredApptsTotal : apptsTotal
                } `
              : ""}{" "}
          </p>
        </div>
        {filteredData?.length > 0 && (
          <div className="flex justify-center items-center ">
            <Progress
              percent={beforepercent * 100}
              strokeColor="#00D090"
              showInfo={false}
              size="small"
              style={{
                width: "200px",
                height: "2px",
              }}
            />
          </div>
        )}
      </div>
      <BaseNavBar />
    </>
  );
};
