import React, { useEffect, useState } from "react";
import TopNavBar from "./TopNavBar";
import { NameIcon } from "../icons/Name.icon";
import { useDispatch, useSelector } from "react-redux";
import { ConditionIcon, CopiesIcon, DobIcon, PhoneIcon } from "../icons";
import { useParams } from "react-router-dom";
import { getAppointmentByUuidConfig } from "../utilities/appointment.url";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { getAppointmentByUuid } from "../store/actions/appointment.action";
import { currentPractitionerJson } from "../mocks/currentPractitoner";
import { Segmented, Tooltip } from "antd";
import { formatEncounterStatus } from "../utilities/columns";

const Schedule = () => {
  const { getUuid, scheduleLoader, newIntakeSummary } = useSelector(
    (state) => state?.appointmentState
  );

  const { selectedEncounter } = useSelector((state) => state?.encounters);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const isMobile = window.innerWidth < 1260;
  const currentPractitioner = currentPractitionerJson; //check
  const [tabs, setTabs] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [currentEncounter, setCurrentEncounter] = useState(null);

console.log("uuid", getUuid);
  const getEncounterStatus = () => {
    const { displayStatus } = formatEncounterStatus(
      selectedEncounter?.encounter_id ? selectedEncounter : currentEncounter
    );
    return displayStatus;
  };

  const handleTabClick = (tabValue) => {
    setActiveButton(tabValue);
    // setAutoResumeVisitEnabled(false);
  };

  const configureTabs = () => {
    let pageTabs = [
      {
        label: "VCA summary",
        value: "VCA summary",
        isActive: activeButton === "VCA summary",
        onClick: () => handleTabClick("VCA summary"),
      },
      {
        label: "Pre-chart",
        value: "Pre-chart",
        isActive: activeButton === "Pre-chart",
        onClick: () => handleTabClick("Pre-chart"),
      },
      {
        label:
          getEncounterStatus() === "Completed"
            ? isMobile
              ? "Full Note"
              : "Completed note"
            : "In visit",
        value: "In visit",
        isActive: activeButton === "In visit",
        onClick: () => handleTabClick("In visit"),
      },
      {
        label: isMobile ? "AVS" : "After visit summary",
        value: "After visit summary",
        isActive: activeButton === "After visit summary",
        onClick: () => handleTabClick("After visit summary"),
      },
    ];

    if (intakeStatus === "Unavailable") {
      pageTabs = pageTabs.slice(1);
    }
    setTabs(pageTabs);
  };

    const setSelectedTab = () => {
      const encounter_status = getEncounterStatus();
      if (encounter_status.startsWith("Pre-chart")) {
        setActiveButton("Pre-chart");
      } else {
        if (encounter_status === "Completed") {
          setActiveButton("In visit");
        } else if (intakeStatus === "Unavailable") {
          setActiveButton("Pre-chart");
        } else {
          setActiveButton("VCA summary");
        }
      }
    };

    const intakeStatus = getUuid?.appointment_details
      ? getUuid?.appointment_details?.chat_completion_status
      : getUuid?.chat_completion_status;
    console.log("intakeStatus", intakeStatus);

  useEffect(() => {
    dispatch(getAppointmentByUuid(id, accessToken));
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_startDate`);
    localStorage.removeItem(`${currentPractitioner?.org_uuid}_endDate`);
      setSelectedTab();

    //   analytics.page();
  }, [dispatch, id]);

  useEffect(() => {
    configureTabs();
  }, [selectedEncounter]);

  useEffect(() => {
    if (getUuid?.appointment_id) {
      setCurrentEncounter(null);
    }
  }, [getUuid]);

  return (
    <>
      <TopNavBar></TopNavBar>
      <>
        <div className="bg-white rounded-xl shadow-md px-1 py-1.5">
          <div className="text-[#000] text-lg font-semibold mb-1 mx-3 mr-4 items-center flex">
            Patient details{" "}
          </div>
          <div className={"flex pt-1"}>
            <div className="circle-background lg:ml-1">
              <NameIcon
                className="patientname"
                name={
                  getUuid?.patient_details?.first_name &&
                  getUuid?.patient_details?.last_name
                    ? `${getUuid.patient_details.first_name} ${getUuid.patient_details.last_name}`
                    : "N/A"
                }
              />
            </div>
            <Tooltip
              title={
                <span
                  onClick={(e) => {
                    // Copy the tooltip text to the clipboard
                    navigator.clipboard.writeText(
                      `${getUuid?.patient_details?.patient_id}`
                    );
                    e.stopPropagation(); // Prevents triggering any other actions
                    message.success("Patient ID copied!", 1); // 1 second duration
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {getUuid?.patient_details?.patient_id
                    ? `Patient ID: ${getUuid?.patient_details?.patient_id}`
                    : "Patient ID: N/A"}
                  <CopiesIcon height="15" width="15" color="#000" />
                </span>
              }
              placement="top"
            >
              <div
                className="mt-1 text-[#000] font-medium flex items-center ml-2"
                onClick={(e) => {
                  navigator.clipboard.writeText(
                    `Patient ID: ${getUuid?.patient_details?.patient_id}`
                  );
                  e.stopPropagation();
                }}
              >
                {getUuid?.patient_details?.first_name &&
                getUuid?.patient_details?.last_name
                  ? `${getUuid.patient_details.first_name} ${getUuid.patient_details.last_name}`
                  : "N/A"}
              </div>
            </Tooltip>
          </div>

          <div className={"flex pt-2 gap-1 pl-3"}>
            <DobIcon />
            <div className=" text-black font-sm">Date of birth :</div>
            {getUuid?.patient_details?.birth_date
              ? getUuid?.patient_details?.birth_date
              : "N/A"}
          </div>

          <div className={"flex pt-2 gap-1 pl-3"}>
            <ConditionIcon />
            <div className=" text-black font-sm">Condition:</div>
            {getUuid?.appointment_details?.condition_name
              ? getUuid?.appointment_details?.condition_name == "Unknown"
                ? "Not Available"
                : getUuid?.appointment_details?.condition_name
              : getUuid?.condition_name
              ? getUuid?.condition_name == "Unknown"
                ? "Not Available"
                : getUuid?.condition_name
              : "N/A"}
          </div>

          <div className={"flex pt-2 gap-1 pl-3"}>
            <PhoneIcon />
            <div className=" text-black font-sm">Phone :</div>
            {getUuid?.patient_details?.phone_id
              ? getUuid?.patient_details?.phone_id
              : "N/A"}
          </div>
        </div>
        <div className={"lg:flex gap-3 justify-between mt-4 items-center "}>
          <div className="segmented_schedule rounded-lg w-fit">
            <Segmented
              options={tabs.map((button) => ({
                label: button.label,
                value: button.value,
              }))}
              value={activeButton}
              style={{ fontSize: "14px" }}
              onChange={(value) => handleTabClick(value)}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Schedule;
