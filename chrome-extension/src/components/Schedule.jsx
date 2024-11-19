import React, { useEffect, useState } from "react";
import TopNavBar from "./TopNavBar";
import { NameIcon } from "../icons/Name.icon";
import { useDispatch, useSelector } from "react-redux";
import {
  ConditionIcon,
  CopiesIcon,
  DictateMic,
  DobIcon,
  PhoneIcon,
} from "../icons";
import { useParams } from "react-router-dom";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { getAppointmentByUuid } from "../store/actions/appointment.action";
import { currentPractitionerJson } from "../mocks/currentPractitoner";
import { Segmented, Tooltip } from "antd";
import { formatEncounterStatus } from "../utilities/columns";
import { AppLoaderPage } from "./baseComponents/AppLoader";
import { isEmpty } from "lodash";
import { Bars } from "react-loader-spinner";
import EditorMobile from "./baseComponents/EditorMobile";
import EncounterDetails from "../EncounterDetails";
import {
  createNewEncounter,
  listEncounters,
} from "../store/slice/encounter.slice";
import moment from "moment";
import { Button } from "./baseComponents/Button";

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
  const [appLoading, setAppLoading] = useState(false);
  const [completionStatus, setCompletionStatus] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [initialTextArea, setInitialTextArea] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [summaryStatus, setSummaryStatus] = useState("");
  const [inVisitTabVisible, setInVisitTabVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

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

  const handleStartAuraVisit = () => {
    if (inVisitTabVisible) {
      setActiveButton("In visit");
      setAutoResumeVisitEnabled(true);
    }
  };
  const isAuraOnly = () => {
    const condition_name = getUuid?.condition_name;
    return condition_name == "Unknown";
  };

  const isVCACompleted = () => {
    const completion_status =
      getUuid?.appointment_details?.chat_completion_status ||
      getUuid?.chat_completion_status;
    return completion_status === "Completed";
  };

  const shouldRestrictTemplates = () => {
    if (!isVCACompleted()) {
      return false;
    } else if (isAuraOnly()) {
      return false;
    } else if (
      currentPractitioner?.org_settings?.bypass_aura_combo_template_restrictions
    ) {
      return false;
    }
    return true;
  };

  const intakeStatus = getUuid?.appointment_details
    ? getUuid?.appointment_details?.chat_completion_status
    : getUuid?.chat_completion_status;
  console.log("intakeStatus", intakeStatus);

  const createEncounterOnFirstLoad = () => {
    const searchFilters = {
      appointment_id: getUuid?.appointment_id,
    };
    dispatch(
      listEncounters({ searchFilters, showLoader: false, accessToken })
    ).then((encounters) => {
      console.log("fhwehfwiofhiofh", encounters);
      if (!encounters || encounters.length === 0) {
        dispatch(
          createNewEncounter(
            getUuid?.practitioner_id,
            getUuid?.appointment_id,
            (encounter) => {
              setCurrentEncounter(encounter);
              //   analytics.track(
              //     "Automatically Created Encounter From VCA Summary Page",
              //     {
              //       practitioner_id: getUuid?.practitioner_id,
              //       appointment_id: getUuid?.appointment_id,
              //       encounter_id: encounter.encounter_id,
              //     }
              //   );
            },
            accessToken
          )
        );
      } else {
        setCurrentEncounter(encounters?.payload?.encounters[0]);
      }
    });
  };

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
      createEncounterOnFirstLoad();
    }
  }, [getUuid]);

  useEffect(() => {
    if (isEmpty(getUuid)) setAppLoading(true);
    else setAppLoading(false);
  }, [getUuid]);

  useEffect(() => {
    const inVisitTabVisible = tabs.find((tab) => tab.label === "In visit");
    setInVisitTabVisible(!!inVisitTabVisible);
  }, [tabs]);

  useEffect(() => {
    const textAreaValue = newIntakeSummary
      ? newIntakeSummary
      : getUuid?.appointment_details?.supervised_intake_summary
      ? getUuid?.appointment_details?.supervised_intake_summary
      : getUuid?.appointment_details?.llm_intake_summary
      ? getUuid?.appointment_details?.llm_intake_summary
      : "";
    const formatText = (text) => {
      let formattedText = text;
      formattedText = formattedText.replace(/{[^:]+:\s*'([^']*)'}/g, "$1");
      formattedText = formattedText.replace(/(\d)(?=\s*-\s*no)/g, "$1 ");
      // formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #00d091;">$1</strong>');
      // formattedText = formattedText.replace(/<strong style='color: #00d091;'>(.*?)<\/strong>/g, '<strong style="color: #00d091;">$1</strong>');
      return formattedText;
    };

    const formattedTextAreaValue = formatText(textAreaValue);
    setTextAreaValue(formattedTextAreaValue);
    setInitialTextArea(formattedTextAreaValue);

    const summaryCreatedOnText = getUuid?.appointment_details
      ?.llm_intake_created
      ? `Created on: ${moment(getUuid.appointment_details.llm_intake_created)
          .tz(moment.tz.guess())
          .format("MMM Do, YYYY, h.mm A")}`
      : "";
    setSummaryText(summaryCreatedOnText);
    let summaryStatus = null;
    const chat_completion_status =
      getUuid?.appointment_details?.chat_completion_status ||
      getUuid?.chat_completion_status;
    console.log(chat_completion_status);

    if (chat_completion_status === "partial_completed") {
      summaryStatus = "Partial Summary";
    }
    setSummaryStatus(summaryStatus);
    // console.log(summaryStatus)

    if (
      getUuid?.appointment_details?.chat_completion_status ||
      getUuid?.chat_completion_status
    ) {
      setCompletionStatus(
        getUuid?.appointment_details?.chat_completion_status ||
          getUuid?.chat_completion_status
      );
      setSelectedTab();
    }
  }, [getUuid, newIntakeSummary, completionStatus, currentEncounter]);
  console.log("currentEncounter", currentEncounter);

  return (
    <>
      <TopNavBar></TopNavBar>
      {appLoading ? (
        <AppLoaderPage />
      ) : (
        <div
          className={`page-wrapper care-connect-page ${
            appLoading ? "loading" : ""
          }`}
        >
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

          <div
            className={`${
              activeButton == "VCA summary"
                ? "rounded-xl bg-white shadow-xl py-3.5 mt-4 mb-8"
                : ""
            }`}
          >
            {activeButton === "VCA summary" && (
              <>
                {(completionStatus === "Completed" ||
                  completionStatus === "partial_completed") &&
                  activeButton === "VCA summary" && (
                    <div className="flex justify-between items-start flex-col sm:flex-row">
                      {completionStatus === "partial_completed" &&
                        activeButton === "VCA summary" && (
                          <span
                            className={`flex items-center justify-start mb-3.5 flex-wrap ${
                              isMobile ? "p-2 gap-1" : "mx-3 gap-3"
                            }`}
                          >
                            <div
                              className="flex"
                              style={{ fontFamily: "Poppins" }}
                            >
                              <Tooltip
                                title={isMobile ? null : tooltipSummaryTitle}
                                placement="topLeft"
                              >
                                <div className="text-[#ff6f00] flex items-center gap-2 text-white font-normal bg-[#FF9933] rounded-full px-4 py-1">
                                  <span>{summaryStatus}</span>
                                </div>
                              </Tooltip>
                            </div>
                          </span>
                        )}

                      {inVisitTabVisible && isMobile ? (
                        <div className="flex justify-center text-xs text-gray-400 mx-2">
                          <Tooltip
                            title={isMobile ? null : "Start Aura visit"}
                            placement="topLeft"
                          >
                            <>
                              <Button
                                className={`rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669] p-2`}
                                onClick={handleStartAuraVisit}
                              >
                                <div className="flex items-center mx-1.5 cursor-pointer">
                                  <DictateMic
                                    className={`cursor-pointer mr-2.5`}
                                  />
                                  Start Aura visit
                                </div>
                              </Button>
                            </>
                          </Tooltip>
                        </div>
                      ) : (
                        <span></span>
                      )}

                      <span
                        className={`flex items-center justify-end mb-3.5 flex-wrap z-50 ${
                          isMobile ? "p-2 gap-1" : "mx-3 gap-3"
                        }`}
                      >
                        {/* <div className="flex" style={{ fontFamily: "Poppins" }}>
                          <Tooltip
                            title={isMobile ? null : tooltipCopyTitle}
                            placement="topLeft"
                          >
                            <>
                              <Dropdown.Button
                                placement="bottomLeft"
                                icon={<ExpandIcon fill={"#ffffff"} />}
                                overlay={copyOptions()}
                                onClick={handleCopyPlainText}
                                rootClassName="copy-all rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669]"
                              >
                                <div className="flex items-center cursor-pointer gap-1 text-white font-normal">
                                  <span>
                                    <CopiesIcon />
                                  </span>
                                  <span>Copy all</span>
                                </div>
                              </Dropdown.Button>
                            </>
                          </Tooltip>
                        </div>
                        <div className="flex items-center">
                          <span className="custom-category-text">
                            <Tooltip
                              title={isMobile ? null : tooltipTitle}
                              placement="topLeft"
                            >
                              <>
                                <Button
                                  className={`rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669] p-2`}
                                  onClick={handleReloadIntakeSummary}
                                >
                                  <div className="flex items-center mx-1.5 cursor-pointer">
                                    <AmbientloadIcon
                                      className={`cursor-pointer mr-2.5`}
                                    />
                                    {isOverlayVisible
                                      ? "Regenerating..."
                                      : "Regenerate"}
                                  </div>
                                </Button>
                              </>
                            </Tooltip>
                          </span>
                        </div> */}
                      </span>
                    </div>
                  )}

                {completionStatus === "Completed" ||
                  (completionStatus === "partial_completed" &&
                    activeButton === "VCA summary" && (
                      <div className="border-b border-gray-200"></div>
                    ))}
                <div className="flex justify-center text-xs text-gray-400 my-3">
                  {summaryText}
                </div>

                {inVisitTabVisible && !isMobile && (
                  <div
                    className={`flex justify-center text-gray-400 my-3 relative ${
                      isChatCompleted ? "bottom-20 -mb-12" : ""
                    }`}
                  >
                    <Tooltip
                      title={isMobile ? null : "Start Aura visit"}
                      placement="topLeft"
                    >
                      <>
                        <Button
                          className={`rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669] p-2`}
                          onClick={handleStartAuraVisit}
                        >
                          <div className="flex items-center mx-1.5 cursor-pointer">
                            <DictateMic className={`cursor-pointer mr-2.5`} />
                            Start Aura visit
                          </div>
                        </Button>
                      </>
                    </Tooltip>
                    <div className="ml-4">
                      <PatientNotes
                        schedulepage={true}
                        isEnabled={true}
                        source="vca_patient_history"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            <div>
              {activeButton === "VCA summary" ? (
                <div
                  className={`relative overflow-auto schedule_page_wrapper h-full mt-2"}`}
                >
                  <div
                    className="editor-container"
                    style={{ overflow: isOverlayVisible ? "hidden" : "auto" }}
                  >
                    {isOverlayVisible && (
                      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10 flex justify-center items-center">
                        <div className="">
                          <Bars
                            height="25"
                            width="25"
                            color="#00D090"
                            ariaLabel="bars-loading"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <EditorMobile
                        theme="snow"
                        className="quill-editor"
                        value={
                          completionStatus === "Completed" ||
                          completionStatus === "partial_completed"
                            ? textAreaValue
                            : "Summary will be available when patient completes their conversation with lumi"
                        }
                        onChange={(value) => setTextAreaValue(value)}
                        disabled={isOverlayVisible}
                        enableDotPhrases={true}
                      />
                    </div>
                  </div>
                  {/* {(completionStatus === "Completed" ||
                    completionStatus === "partial_completed") && (
                    <div className="sticky bottom-0 flex justify-end ">
                      {isListening ? (
                        <>
                          <PauseIcon
                            fill="#d9534f"
                            visible={true}
                            className={"cursor-pointer"}
                            onClick={handleIntakeSummaryRecording}
                          />
                        </>
                      ) : (
                        <VoiceIcon
                          onClick={handleIntakeSummaryRecording}
                          className={"cursor-pointer"}
                        />
                      )}
                    </div>
                  )} */}
                </div>
              ) : isMobile ? (
                <div className="mt-4">
                  <EncounterDetails
                    topBarInputs={{}}
                    storedParams={{}}
                    schedulepage={true}
                    encounter_id_schedule={currentEncounter?.encounter_id}
                    activeTab={activeButton}
                    restrictTemplates={shouldRestrictTemplates()}
                  />
                </div>
              ) : (
                <h1>hey! schedule error</h1> //check
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Schedule;
