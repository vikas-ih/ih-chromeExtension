import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import TopNavBar from "./components/TopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { formatEncounterStatus, getEncounterStatus } from "./utilities/columns";
import AmbientMicIcon from "./assets/ambient_mic-02646837.svg";
import { CalanderAiIcon } from "./icons/CalendarAi.icon";
import moment from "moment";
import { SegmentedTabs } from "./components/baseComponents/SegmentedTabs";
import { Dropdown, Menu, Divider, Tooltip, Button } from "antd";
import {
  AmbientloadIcon,
  CopiesIcon,
  ExpandIcon,
  PdfIcon,
  RegenIcon,
  ResumeIcon,
} from "./icons";
import { showToastInfo, showToastSuccess } from "./utilities/toast";
import { showToastError } from "./utilities/errortoast";
import MedicalConversationBox, {
  SummaryLoading,
} from "./components/baseComponents/MedicalConversationBox";
import { MobileLiveTranscription } from "./components/baseComponents/MobileLiveTranscription";
import { SummaryUpdatedStatus } from "./components/baseComponents/SummaryUpdatedStatus";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import "./style/_careConnect.scss";
import "./style/_button.scss";

import {
  getEncounter,
  getTranscription,
  partialResetEncounterState,
  resetEncounterState,
  selectedEncounterSlice,
  updateEncounter,
} from "./store/slice/encounter.slice";
import { listSummaries, regenerateSummary } from "./store/actions/summary";
import { resetSummaryState } from "./store/slice/summary.slice";
import { storeInLocal } from "./lib/storage";
import { useParams } from "react-router-dom";
import MicrophoneBar from "./components/baseComponents/MicrophoneBar";
import CurrentTranscript from "./components/baseComponents/CurrentTranscript";
import { isEmpty } from "lodash";
import SummaryProgressBar from "./components/baseComponents/SummaryProgressBar";

const EncounterDetails = ({
  topBarInputs,
  schedulepage,
  restrictTemplates = false,
  storedParams,
  searchFilters,
  encounter_id_schedule = null,
  activeTab = "",
}) => {
  const { encounterDetails, transcriptionbyIdValue } = useSelector(
    (state) => state.encounters
  );
  const { isSummaryRegenerationLoading, summaryExportLoading, summaryList } =
    useSelector((state) => state?.summarySlice);

  const { currentPractitioner, currentPractitionerSettings } = useSelector(
    (state) => state?.practitionerState
  );
  // console.log("transcriptionbyIdValue", transcriptionbyIdValue);
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const [encounter_id, setEncounterId] = useState(encounter_id_schedule);

  const [isLoading, setIsLoading] = useState(false);
  const refreshInterval = 5_000;
  const dispatch = useDispatch();
  const initActiveTab = useRef(false);
  const inVisitRef = useRef(null);

  const { color, displayStatus } = formatEncounterStatus(encounterDetails);
  const isMobile = window.innerWidth < 1260;
  const [encounterStatus, setEncounterStatus] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const [recordingTabs, setRecordingTabs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [encounterPhase, setEncounterPhase] = useState("in-visit");

  const [liveTranscript, setLiveTranscript] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [record, setRecord] = useState(encounterDetails);

  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isChartStreaming, setIsChartStreaming] = useState(false);
  const [isVisitStreaming, setIsVisitStreaming] = useState(false);
  const [isChartRecording, setIsChartRecording] = useState(false);
  const [isVisitRecording, setIsVisitRecording] = useState(false);
  const [livePartialTranscript, setLivePartialTranscript] = useState("");
  const [fullTranscript, setFullTranscript] = useState([]);
  const initTranscript = useRef(false);

  const [isSummaryOutdated, setIsSummaryOutdated] = useState(false);
  const [editedSummary, setEditedSummary] = useState("");
  const editableSummaryRef = useRef(null);
  const medicalConversationBoxRef = useRef(null);
  const ambient_version = currentPractitionerSettings?.ambient_version || 2; //check currentPractitionerSettings?.ambient_version ??

  const { encounter_id_params } = useParams();
  storeInLocal("encounter_id_params", encounter_id_params);
  storeInLocal(
    `${currentPractitioner?.org_uuid}_topbar_encounter_id`,
    encounter_id
  );
 useEffect(() => {
   if (isEmpty(encounter_id)) {
     setEncounterId(encounter_id_params);
   }
 }, [encounter_id, encounter_id_params]);
 
  const resetStates = () => {
    dispatch(resetEncounterState());
    dispatch(resetSummaryState());
  };

  const configureRecordingTabs = () => {
    let tabs;
    const { displayStatus } = formatEncounterStatus(encounterDetails);

    if (displayStatus === "Completed") {
      tabs = [
        { label: "Full note", value: "In visit" },
        { label: "AVS", value: "After visit summary" },
      ];
    } else {
      tabs = [{ label: "In visit", value: "In visit" }];
    }

    // if (encounterDetails?.pre_chart_status != null) {
    //   tabs.unshift({ label: "Pre-chart", value: "Pre-chart" });
    // }

    setRecordingTabs(tabs);
  };

  const selectInitialRecordingTab = (record) => {
    const { displayStatus } = formatEncounterStatus(record);
    //  console.log("displayStatus", displayStatus);
    // if (displayStatus.startsWith("Pre-chart")) {
    //   setActiveButton("Pre-chart");
    // } else {
    setActiveButton("In visit");
    // }
  };

  useEffect(() => {
    if (activeTab) {
      setActiveButton(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    switch (activeButton) {
      case "After visit summary":
        setEncounterPhase("after-visit");
        break;
      case "In visit":
        setEncounterPhase("in-visit");
        break;
      // case "Pre-chart":
      //   setEncounterPhase("pre-chart");
      //   break;
      default:
        setEncounterPhase("in-visit");
    }
  }, [activeButton]);

  useEffect(() => {
    if (encounterDetails) {
      dispatch(selectedEncounterSlice(encounterDetails));
    }
    if (
      !initActiveTab.current &&
      encounterDetails?.encounter_id &&
      !schedulepage
    ) {
      selectInitialRecordingTab(encounterDetails);
      initActiveTab.current = true;
    }
  }, [encounterDetails]);
  useEffect(() => {
    setIsSummaryOutdated(false);

    // when the summary is generating or re-generation clear ref to summary
    // to ensured the updated summary is loaded when it's ready
    if (encounterStatus != "completed") {
      editableSummaryRef.current = null;
      setEditedSummary("");
      setIsSummaryOutdated(false);
    } else if (summaryList?.length > 0) {
      const cleaned_summary_json = summaryList[0].summary_json?.replaceAll(
        "\n",
        "<br>"
      );
      const cleaned_summary = {
        ...summaryList[0],
        summary_json: cleaned_summary_json,
      };
      if (
        editableSummaryRef.current?.encounter_id !=
          cleaned_summary.encounter_id ||
        editableSummaryRef.current?.encounter_phase !=
          cleaned_summary.encounter_phase
      ) {
        editableSummaryRef.current = cleaned_summary;
        setEditedSummary({ ...cleaned_summary });
        // lastUpdatedSummaryRef.current = { ...cleaned_summary };
      } else {
        if (editableSummaryRef.current.version != cleaned_summary.version) {
          setIsSummaryOutdated(true);
        }
      }
    }
  }, [summaryList, encounterStatus]);

  const handleCopy = () => {
    //  if (schedulepage) {
    //    analytics.track(
    //      "Clicked Copy As Rich Text In Ambient Medical Notes From VCA",
    //      {
    //        transcription: transcriptionbyIdValue[0]?.transcription_id,
    //      }
    //    );
    //  } else {
    //    analytics.track(
    //      "Clicked Copy As Rich Text In Ambient Medical Notes From Aura",
    //      {
    //        transcription: transcriptionbyIdValue[0]?.transcription_id,
    //      }
    //    );
    //  }

    if (
      !editableSummaryRef.current?.summary_json ||
      editableSummaryRef.current?.summary_json?.trim() === ""
    ) {
      showToastInfo("No data available to copy");
      return;
    }

    try {
      const medicalConversation =
        typeof editableSummaryRef.current?.summary_json === "string"
          ? editableSummaryRef.current?.summary_json.replaceAll("\n", "<br>")
          : editableSummaryRef.current?.summary_json;

      const tempElement = document.createElement("div");
      const additionalInfo = `<strong>Encounter Name:</strong> ${
        encounterDetails.description
      }<br><strong>Date:</strong> ${moment(encounterDetails.created_at).format(
        "MMM Do, YYYY"
      )}<br><br>`;
      tempElement.innerHTML = additionalInfo + medicalConversation;
      document.body.appendChild(tempElement);
      const range = document.createRange();
      range.selectNode(tempElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      document.body.removeChild(tempElement);
      showToastSuccess("Copied to clipboard");
    } catch (error) {
      console.error("Error copying medical notes:", error);
      showToastError("Failed to copy medical notes");
    }
  };

  const MedicalCopyOptions = () => {
    return (
      <Menu
        onClick={({ key }) => {
          if (key === "copy-editor") {
            handleCopy();
          }
        }}
      >
        <Menu.Item key="copy-editor">
          <span className="dropdown-text">Copy as rich text</span>
        </Menu.Item>
      </Menu>
    );
  };
  const handlePauseResumeToggle = useCallback(() => {
    console.log("fromCallBack", encounter_id);
    const updateEncounterFunc = updateEncounter({
      encounter_id,
      encounterPhase,
      data: {
        in_visit_status: "inprogress",
      },
      params: undefined,
      accessToken,
    });
    updateEncounterFunc(dispatch);
    // analytics.track("Clicked Resume after complete button for Aura", {
    //   encounter_id: encounter_id,
    // });
    inVisitRef.current?.handlePauseResumeToggle();
  }, [inVisitRef, inVisitRef.current, dispatch]);

  const handleSummaryEdits = (value) => {
    if (editableSummaryRef.current) {
      editableSummaryRef.current.summary_json = value;
      setEditedSummary({
        ...editableSummaryRef.current,
        summary_json: value,
      });
    }
  };

  const getCurrentTemplate = () => {
    if (encounterPhase === "pre-chart") {
      return {
        template_id: record?.pre_chart_template_id,
        template_overrides_id: record?.pre_chart_template_overrides_id,
      };
    } else if (encounterPhase === "in-visit") {
      return {
        template_id: record?.in_visit_template_id,
        template_overrides_id: record?.in_visit_template_overrides_id,
      };
    } else if (encounterPhase === "after-visit") {
      return {
        template_id: record?.after_visit_template_id,
        template_overrides_id: record?.after_visit_template_overrides_id,
      };
    }
  };
  const handleRegenerate = (mode = "update") => {
    //  if (schedulepage) {
    //    analytics.track(
    //      "Clicked Regenerate Summary In Ambient Medical Conversation From VCA ",
    //      {
    //        encounter: record?.encounter_id,
    //        mode: mode,
    //      }
    //    );
    //  } else {
    //    analytics.track(
    //      "Clicked Regenerate Summary In Ambient Medical Conversation From Aura",
    //      {
    //        encounter: record?.encounter_id,
    //        mode: mode,
    //      }
    //    );
    //  }
    dispatch(
      regenerateSummary(
        record?.encounter_id,
        encounterPhase,
        searchFilters,
        "",
        getCurrentTemplate(),
        record?.summary_verbosity,
        record?.summary_format,
        null,
        mode,
        accessToken
      )
    );
  };
  useEffect(() => {
    setEncounterStatus(getEncounterStatus(encounterDetails, encounterPhase));
    if (encounterDetails?.encounter_id) {
      configureRecordingTabs();
    }
  }, [encounterDetails, encounterPhase]);

  const showMicrophoneBar = useMemo(() => {
    if (!(isChartStreaming || isVisitStreaming)) return false;

    if (isVisitStreaming) return activeButton != "In visit";

    if (isChartStreaming) return activeButton != "Pre-chart";

    return true;
  }, [isChartStreaming, isVisitStreaming, activeButton]);

  useEffect(() => {
    if (
      !initTranscript.current &&
      transcriptionbyIdValue?.length > 0 &&
      transcriptionbyIdValue[0]?.type == "live"
    ) {
      let transcript = transcriptionbyIdValue[0]?.transcription_json;
      if (transcript?.length > 0) {
        setLiveTranscript(transcript);
      }

      initTranscript.current = true;
    }
  }, [transcriptionbyIdValue]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getEncounter({ encounter_id, accessToken }));
      dispatch(
        listSummaries(encounter_id, encounterPhase, "ambient", accessToken)
      );
      dispatch(getTranscription({ encounter_id, encounterPhase, accessToken })); //check
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [encounter_id, encounterStatus]);

  const handleMedicalNotesCopy = () => {
    if (
      !editableSummaryRef.current?.summary_json ||
      editableSummaryRef.current?.summary_json?.trim() === ""
    ) {
      showToastInfo("No data available to copy");
      return;
    }
    try {
      const medicalConversation = editableSummaryRef.current?.summary_json;

      // Format encounter name and date
      const encounterName = encounterDetails.description || "Unknown Encounter";
      const date = moment(encounterDetails.created_at).isValid()
        ? moment(encounterDetails.created_at).format("MMM Do, YYYY")
        : "Unknown Date";

      const additionalInfo = `Encounter Name: ${encounterName}\nDate: ${date}\n\n`;

      const plainText =
        additionalInfo +
        medicalConversation
          .replace(/<p>/g, "")
          .replace(/```/g, "")
          .replace(/<\/p>/g, "\n")
          .replace(/<strong style="color: rgb\(0, 208, 145\);">/g, "")
          .replace(/<\/strong>/g, "")
          .replace(/<br>/g, "\n")
          // .replace(/\n\n+/g, '\n\n')// Remove leading whitespace before '|' character
          // .replace(/^\|+/gm, '')
          .trim();

      // Create a temporary textarea element
      const tempTextArea = document.createElement("textarea");
      tempTextArea.style.position = "fixed";
      tempTextArea.style.opacity = "0";
      tempTextArea.value = plainText;

      document.body.appendChild(tempTextArea);

      // Select and copy the content from the temporary textarea
      tempTextArea.select();
      document.execCommand("copy");

      document.body.removeChild(tempTextArea);

      showToastSuccess("Copied to clipboard");
    } catch (error) {
      console.error("Error copying medical notes:", error);
      showToastError("Failed to copy medical notes");
    }
  };

 

  useEffect(() => {
    if (isEmpty(encounterDetails)) setIsLoading(true);
    else setIsLoading(false);
  }, [encounterDetails]);

  useEffect(() => {
    resetStates();
  }, []);

  useEffect(() => {
    if (encounter_id) {
      dispatch(partialResetEncounterState());
      dispatch(getEncounter({ encounter_id, accessToken }));
      dispatch(
        listSummaries(encounter_id, encounterPhase, "ambient", accessToken)
      );
      dispatch(getTranscription({ encounter_id, encounterPhase, accessToken }));
      initTranscript.current = false;
    }
  }, [encounter_id, encounterPhase]);
  return (
    <>
      {isLoading ? (
        <SummaryLoading />
      ) : (
        <div className="flex flex-col gap-4">
          <div className={`bg-white rounded-xl shadow-md px-4 py-3`}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[#000] text-base font-medium mx-2 mr-4 items-center flex">
                  {encounterDetails?.description}
                </div>
                <div>
                  <div
                    className="ml-2 flex"
                    style={{ color }}
                    id={displayStatus}
                  >
                    <img className="mr-1" src={AmbientMicIcon} alt="mic logo" />
                    <span className="ml-2">{displayStatus}</span>
                  </div>

                  <div
                    className={
                      isMobile
                        ? "flex gap-1 ml-2"
                        : "flex gap-1 items-center text-[#7F7F7F] "
                    }
                  >
                    <CalanderAiIcon />
                    <span className="ml-2">
                      {moment(encounterDetails?.created_at).format(
                        "MMM Do, YYYY"
                      )}{" "}
                      {moment(encounterDetails?.created_at).format("h:mm A")}
                    </span>
                  </div>
                </div>
              </div>
              {/* <> */}
              {/* {encounterDetails?.in_visit_status === "completed" && (
              <TriggerPrintEncounter
                key={record?.encounter_id}
                record={encounterDetails}
                selectedRecord={selectedRecord}
                setSelectedRecord={setSelectedRecord}
                editedSummary={editedSummary}
              /> */}
              {/* )} */}
              {/* </> */}
            </div>
          </div>
          <div
            className={`past flex flex-col relative ${
              !schedulepage ? "page-wrapper" : ""
            }`}
          >
            <div className="relative">
              <div
                className="flex-1  grid current bg-white shadow-xl rounded-xl"
                style={{ minHeight: "80vh" }}
              >
                {encounterStatus === "summary_inprogress" ? (
                  <SummaryProgressBar
                    verbosity={encounterDetails?.summary_verbosity}
                  />
                ) : (
                  <></>
                )}
                <div
                  className={`p-3 flex justify-between ${
                    !schedulepage ? "border-b border-gray-200" : ""
                  }`}
                >
                  {!schedulepage && (
                    <SegmentedTabs
                      options={recordingTabs}
                      activeTab={activeButton}
                      setActiveTab={setActiveButton}
                    />
                  )}
                </div>
                <div className="mt-2 flex justify-center items-center ">
                  {(encounterStatus === "completed" ||
                    encounterStatus === "summary_inprogress") && (
                    <>
                      <Button
                        type={"button"}
                        className="bg-[#00D090] hover:bg-[#059669] flex items-center justify-center text-white font-normal p-2 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                        onClick={handlePauseResumeToggle}
                      >
                        <span className="mr-2 mt-0">
                          <ResumeIcon />
                        </span>
                      </Button>
                      <Dropdown.Button
                        onClick={handleMedicalNotesCopy}
                        icon={<ExpandIcon />}
                        trigger={["click"]}
                        style={{ width: "fit-content", background: "#00D090" }}
                        rootClassName="copy-all rounded-xl drop-shadow-sm text-white bg-[#00D090] hover:bg-[#059669] "
                        overlay={MedicalCopyOptions()}
                        className=" bg-[#00D090] hover:bg-[#059669] rounded-xl drop-shadow-sm mx-4"
                      >
                        <div className="flex cursor-pointer">
                          <span className="ml-2 justify-center ">
                            <CopiesIcon className="" />
                          </span>
                        </div>
                      </Dropdown.Button>
                      <div>
                        <Dropdown.Button
                          onClick={() => handleRegenerate("update")}
                          trigger={["hover"]}
                          icon={<ExpandIcon fill={"#ffffff"} />}
                          style={{ width: "50%" }}
                          rootClassName="copy-all rounded-xl drop-shadow-sm flex bg-[#00D090] hover:bg-[#059669] text-xs"
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="1"
                                onClick={() => handleRegenerate("overwrite")}
                              >
                                <div className="flex items-center cursor-pointer gap-1 text-black font-normal">
                                  <AmbientloadIcon height="15" width="15" />
                                  Regenerate from scratch
                                </div>
                              </Menu.Item>
                            </Menu>
                          }
                          className={"h-[35px]"}
                          id="regenicon"
                        >
                          <div className="flex items-center cursor-pointer text-xs">
                            {/* <Tooltip title="Regenerate" placement="bottom"> */}
                            <div className="flex items-center gap-2">
                              {isSummaryRegenerationLoading ? (
                                <RegenIcon height="15" width="15" />
                              ) : (
                                <AmbientloadIcon />
                              )}

                              <div className="flex items-center cursor-pointer text-xs"></div>
                            </div>
                            {/* </Tooltip> */}
                          </div>
                        </Dropdown.Button>
                      </div>
                    </>
                  )}
                </div>

                {encounterStatus === "completed" ||
                encounterStatus === "summary_inprogress" ? (
                  <div className=" ">
                    <div className="-mt-2 flex justify-center relative top-7">
                      <SummaryUpdatedStatus
                        isSaving={isSaving}
                        isSummaryOutdated={isSummaryOutdated}
                        updatedTime={editableSummaryRef.current?.updated_at}
                        encounterStatus={encounterStatus}
                      />
                    </div>
                    <MedicalConversationBox
                      ref={medicalConversationBoxRef}
                      //   handleDictation={isDictationEntitled ? handleDictation : null} // check
                      encounterStatus={encounterStatus}
                      selectedRecord={encounterDetails}
                      selectedEncounterId={encounter_id}
                      medicalConversation={
                        editableSummaryRef.current?.summary_json
                      }
                      handleMedicalConversationChange={handleSummaryEdits}
                      encounterId={encounter_id}
                      summaryId={editableSummaryRef.current?.summary_id}
                      activeButton={activeButton}
                    />
                    <CurrentTranscript
                      encounterStatus={encounterStatus}
                      encounterPhase={encounterPhase}
                      storedParams={storedParams}
                      selectedRecord={encounterDetails}
                      topBarInputs={topBarInputs}
                      setEncounterStatus={setEncounterStatus}
                      isStreaming={isStreaming}
                      setIsStreaming={setIsStreaming}
                      isRecording={isRecording}
                      setRecord={setRecord}
                      setIsRecording={setIsRecording}
                      isChartStreaming={isChartStreaming}
                      isVisitStreaming={isVisitStreaming}
                      setIsChartStreaming={setIsChartStreaming}
                      setIsVisitStreaming={setIsVisitStreaming}
                      isChartRecording={isChartRecording}
                      isVisitRecording={isVisitRecording}
                      setIsChartRecording={setIsChartRecording}
                      setIsVisitRecording={setIsVisitRecording}
                      setLiveTranscript={setLiveTranscript}
                      setLivePartialTranscript={setLivePartialTranscript}
                      restrictTemplates={restrictTemplates}
                      ref={inVisitRef}
                    />
                  </div>
                ) : (
                  // View when an encounter is new or inprogress
                  (encounterStatus !== "completed" ||
                    encounterStatus !== "summary_inprogress" ||
                    encounterStatus === "inprogress") && (
                    <div style={{ minHeight: "86vh" }}>
                      <div
                        className="flex flex-col items-center justify-center"
                        style={{ minHeight: "50vh" }}
                      >
                        <CurrentTranscript
                          encounterStatus={encounterStatus}
                          encounterPhase={encounterPhase}
                          storedParams={storedParams}
                          selectedRecord={encounterDetails}
                          topBarInputs={topBarInputs}
                          setEncounterStatus={setEncounterStatus}
                          isStreaming={isStreaming}
                          setIsStreaming={setIsStreaming}
                          isRecording={isRecording}
                          setRecord={setRecord}
                          setIsRecording={setIsRecording}
                          isChartStreaming={isChartStreaming}
                          isVisitStreaming={isVisitStreaming}
                          setIsChartStreaming={setIsChartStreaming}
                          setIsVisitStreaming={setIsVisitStreaming}
                          isChartRecording={isChartRecording}
                          isVisitRecording={isVisitRecording}
                          setIsChartRecording={setIsChartRecording}
                          setIsVisitRecording={setIsVisitRecording}
                          setLiveTranscript={setLiveTranscript}
                          setLivePartialTranscript={setLivePartialTranscript}
                          restrictTemplates={restrictTemplates}
                          ref={inVisitRef}
                        />
                        {showMicrophoneBar ? (
                          <div className="fixed bottom-0 bg-[#F5F5F5] w-full">
                            <MicrophoneBar
                              encounterPhase={encounterPhase}
                              isStreaming={isChartStreaming || isVisitStreaming}
                              currentActive={currentActive}
                              isRecording={isChartRecording || isVisitRecording}
                              setIsRecording={
                                isChartRecording
                                  ? setIsChartRecording
                                  : setIsVisitRecording
                              }
                              setIsStreaming={
                                isChartStreaming
                                  ? setIsChartStreaming
                                  : setIsVisitStreaming
                              }
                            />
                          </div>
                        ) : null}
                      </div>

                      {ambient_version == 2 &&
                        (encounterStatus === "inprogress" ||
                          encounterStatus === "new") && (
                          <div
                            style={{
                              minHeight: "30vh",
                              maxHeight: "40vh",
                              overflowY: "scroll",
                            }}
                          >
                            <Divider className="m-0 mt-4" />
                            <MobileLiveTranscription
                              fullTranscript={fullTranscript}
                              setFullTranscript={setFullTranscript}
                              liveTranscript={liveTranscript}
                              livePartialTranscript={livePartialTranscript}
                              setLivePartialTranscript={
                                setLivePartialTranscript
                              }
                            />
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EncounterDetails;
