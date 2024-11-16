import React, { useEffect, useState } from "react";
import BaseNavBar from "./components/baseComponents/BaseNavBar";
import TopNavBar from "./components/TopNavBar";
import { Table } from "./components/baseComponents/Table";
import { appointmentJson } from "./mocks/appointments";
import { useAuthUserOrNull } from "@frontegg/react-hooks";

import {
  ActionMenuIcon,
  AmbientAiIcon,
  BinIcon,
  CalendarMobileIcon,
  EditAppointmentIcon,
  EmailOpenedTooltipIcon,
  EmailOpenIcon,
  FailedEmailIcon,
  NotificationsHistoryIcon,
  PatientIcon,
  QRCodeIcon,
  SendIntakeIcon,
  StethMobileIcon,
  SummaryIcon,
  UndeliveredSmsIcon,
  WarningIcon,
} from "./icons";
import { Dropdown, Menu, Progress, Tooltip } from "antd";
import moment from "moment";
import { getFromStorage, storeInLocal } from "./lib/storage";
import { ProfileLogo } from "./components/baseComponents/ProfileLogo";
import { currentPractitionerJson } from "./mocks/currentPractitoner";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetailsByUuidAction,
  getAppointmentsByStatus,
  notificationHistory,
} from "./store/actions/appointment.action";
import { DeleteAppointment } from "./components/pageComponents/DeleteAppointment";
import { EditAppointment } from "./components/pageComponents/EditAppointmentPage";

export const Appointments = () => {
  //   const { currentPractitioner } = useSelector(
  //     (state) => state?.practitionerState
  //   );
  const {
    getAppointmentStatusList,
    tableLoader,
    apptsAPICall,
    filteredApptsTotal,
    apptsTotal,
  } = useSelector((state) => state?.appointmentState);
  const nonVCAIntakeStatus = "Aura Only";
  const nonVCACondition = "Not Available";
//   const isAdmin = settingsOrgValue?.roles?.includes("admin"); //check
    const isAdmin =true;
  const today = moment().format("YYYY-MM-DD");
  const navigate= useNavigate();
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentPractitioner = currentPractitionerJson;
  //   const filteredData = appointmentJson;
  const [showProfileLogo, setShowProfileLogo] = useState(true);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState();
  const [filterOptions, setFilterOptions] = useState(); //initialfilterOptions //check
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

  const [isfilterOn, setIsFilterOn] = useState(
    false
  );

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
          // if (key === "reminder" && conditionForReminder) {
          //   handleSendReminder(id, viewAppointment);
          // }
          if (key === "delete") {
            //yes
            handleDeleteOpen(id, viewAppointment);
          }
          if (key === "patientChat") {
            //yes
            handlePatientChatOpen(
              viewAppointment?.llm_chat_url,
              viewAppointment
            );
          }
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
          if (key === "notificationHistory") {
            //yes
            handleNotificationHistoryModal(
              viewAppointment?.appointment_id,
              viewAppointment
            );
          }
          // if (key === "intake") {
          //   handleRowClick(viewAppointment, "Menu");
          // }
          // if (key === "convertToAuraEncounter") {
          //   handleConvertAppointmentToAuraModal(
          //     viewAppointment?.appointment_id,
          //     viewAppointment
          //   );
          // }
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
        {viewAppointment?.isExpired === false &&
          viewAppointment?.intakeStatus != "Unavailable" && (
            <Menu.Item key="patientChat">
              <span className="dropdown-text flex items-center space-x-1">
                <PatientIcon /> <span>Open chat as patient</span>
              </span>
            </Menu.Item>
          )}
        {viewAppointment?.isExpired === false &&
          currentPractitioner?.org_settings?.show_qr_code && (
            <Menu.Item key="showQRCode">
              <span className="dropdown-text flex items-center space-x-1">
                <QRCodeIcon /> <span>Show QR Code</span>
              </span>
            </Menu.Item>
          )}

        {viewAppointment?.intakeStatus === "New" &&
          !!viewAppointment.llm_chat_url &&
          !viewAppointment?.isExpired && (
            <Menu.Item key="convertToAuraEncounter">
              <span className="dropdown-text flex items-center space-x-2">
                <AmbientAiIcon /> <span>Convert to Aura Encounter</span>
              </span>
            </Menu.Item>
          )}
        {canEditAppointments && (
          <Menu.Item key="editAppointment">
            <span className="dropdown-text flex items-center space-x-2">
              <EditAppointmentIcon /> <span>Edit appointment</span>
            </span>
          </Menu.Item>
        )}
        <Menu.Item key="notificationHistory">
          <span className="dropdown-text flex items-center space-x-2">
            <NotificationsHistoryIcon /> <span>Show notification history</span>
          </span>
        </Menu.Item>
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

    // useEffect(() => {
    //   if (
    //     filteredValue &&
    //     Array.isArray(filteredValue) &&
    //     filteredValue?.length > 0
    //   ) {
    //     let newData = filteredValue?.map((list, index) => {
    //       const practitionerName =
    //         list?.practitioner_firstName || list?.practitioner_lastName
    //           ? `${list.practitioner_firstName} ${list.practitioner_lastName}`
    //           : "N/A";
    //       const patientName =
    //         list?.patient_firstName || list?.patient_lastName
    //           ? `${list.patient_firstName} ${list.patient_lastName}`
    //           : "N/A";
    //       return {
    //         key: index,
    //         practitioner_Name: `${
    //           list?.practitioner_title ? list?.practitioner_title + ". " : ""
    //         }${practitionerName.trim()}`,
    //         patient_Name: patientName.trim(),
    //         appointmentDateTime: {
    //           date: list?.start_date ? list?.start_date : "N/A",
    //           time: list?.start_time ? list?.start_time : "N/A",
    //         },
    //         dateofBirth: list?.birth_date ? list?.birth_date : "N/A",
    //         patient_lastName: list?.patient_lastName,
    //         practitioner_firstName: list?.practitioner_firstName,
    //         practitioner_lastName: list?.practitioner_lastName,
    //         appointment_id: list?.appointment_id,
    //         intakeStatus: list?.chat_completion_status,
    //         llm_chat_url: list?.llm_chat_url,
    //         appt_uuid: list?.appt_uuid,
    //         condition_name: list?.condition_name
    //           ? list?.condition_name == "Unknown"
    //             ? "Not Available"
    //             : list?.condition_name
    //           : "N/A",
    //         notification_status: list?.notification_status,
    //         isExpired: list?.isExpired,
    //         patient_id: list?.patient_id,
    //         actions:
    //           list?.settings?.enable_patient_email_notifications ||
    //           list?.settings?.enable_patient_sms_notifications,
    //       };
    //     });
    //     if (newData && Array.isArray(newData) && newData.length > 0) {
    //       setFilteredData(newData);
    //       setIsLoading(false);
    //     }
    //   } else {
    //     setFilteredData([]);
    //     setIsLoading(false);
    //   }
    // }, [filteredValue]);
 
  return (
    <>
      <TopNavBar />
      <div className="page-wrapper appointment-page">
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
