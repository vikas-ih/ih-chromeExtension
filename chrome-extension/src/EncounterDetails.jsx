import React, { useEffect, useRef, useState } from "react";
import TopNavBar from "./components/TopNavBar";
import { useDispatch, useSelector } from "react-redux";
import { formatEncounterStatus, getEncounterStatus } from "./utilities/columns";
import AmbientMicIcon from "./assets/ambient_mic-02646837.svg";
import { CalanderAiIcon } from "./icons/CalendarAi.icon";
import moment from "moment";
import { SegmentedTabs } from "./components/baseComponents/SegmentedTabs";
import { Dropdown, Menu, Divider, Tooltip, Button } from "antd";
import { CopiesIcon, ExpandIcon, PdfIcon } from "./icons";
import { showToastInfo, showToastSuccess } from "./utilities/toast";
import { showToastError } from "./utilities/errortoast";
import MedicalConversationBox from "./components/baseComponents/MedicalConversationBox";
import { MobileLiveTranscription } from "./components/baseComponents/MobileLiveTranscription";
import { SummaryUpdatedStatus } from "./components/baseComponents/SummaryUpdatedStatus";
import { useAuthUserOrNull } from "@frontegg/react-hooks";
import { getEncounter } from "./store/slice/encounter.slice";
import { listSummaries } from "./store/actions/summary";

const EncounterDetails = () => {
  const { encounterDetails, transcriptionbyIdValue } = useSelector((state) => ({
    encounterDetails: state.encounters.encounterDetails,
    transcriptionbyIdValue: state.encounters.transcriptionbyIdValue,
  }));
  console.log("encounterDetails", encounterDetails);
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const [encounter_id, setEncounterId] = useState(
    encounterDetails?.encounter_id
  );
  const refreshInterval = 5_000;
  const dispatch = useDispatch();
  const { color, displayStatus } = formatEncounterStatus(encounterDetails);
  const isMobile = window.innerWidth < 1260;
  const schedulepage = undefined; //check
  const [encounterStatus, setEncounterStatus] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const [recordingTabs, setRecordingTabs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [encounterPhase, setEncounterPhase] = useState("in-visit");

  const [isSummaryOutdated, setIsSummaryOutdated] = useState(false);
  const [editedSummary, setEditedSummary] = useState("");
  const editableSummaryRef = useRef(null);
  const medicalConversationBoxRef = useRef(null);
  const ambient_version = 2; //check currentPractitionerSettings?.ambient_version ??

  //   let encounterPhase = ;
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
  useEffect(() => {
    switch (activeButton) {
      case "After visit summary":
        setEncounterPhase("after-visit");
        break;
      case "In visit":
        setEncounterPhase("in-visit");
        break;
      case "Pre-chart":
        setEncounterPhase("pre-chart");
        break;
      default:
        setEncounterPhase("in-visit");
    }
  }, [activeButton]);
  const handleMedicalNotesCopy = () => {
    // if (schedulepage) {
    //   analytics.track(
    //     "Clicked Copy All To Clipboard In Ambient Medical Notes From VCA",
    //     {
    //       transcription: transcriptionbyIdValue[0]?.transcription_id,
    //     }
    //   );
    // } else {
    //   analytics.track(
    //     "Clicked Copy All To Clipboard In Ambient Medical Notes From Aura",
    //     {
    //       transcription: transcriptionbyIdValue[0]?.transcription_id,
    //     }
    //   );
    // }

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

  const MedicalCopyOptions = () => {
    return (
      <Menu
        onClick={({ key }) => {
          if (key === "copy-editor") {
            // handleCopy(); check
          }
        }}
      >
        <Menu.Item key="copy-editor">
          <span className="dropdown-text">Copy as rich text</span>
        </Menu.Item>
      </Menu>
    );
  };

  const handleSummaryEdits = (value) => {
    if (editableSummaryRef.current) {
      editableSummaryRef.current.summary_json = value;
      setEditedSummary({
        ...editableSummaryRef.current,
        summary_json: value,
      });
    }
  };

  useEffect(() => {
    setEncounterStatus(getEncounterStatus(encounterDetails, encounterPhase));
    if (encounterDetails?.encounter_id) {
      configureRecordingTabs();
    }
  }, [encounterDetails]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getEncounter({ encounter_id, accessToken }));
      dispatch(
        listSummaries(encounter_id, encounterPhase, "ambient", accessToken)
      );
      // dispatch(getTranscription(encounter_id, encounterPhase, accessToken)); //check
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [encounter_id, encounterStatus]);

  useEffect(() => {
    if (encounterDetails?.in_visit_status === "completed") {
    }
  }, []);
  return (
    <>
      <TopNavBar />
      <div className="flex flex-col gap-8">
        <div className={`bg-white rounded-xl shadow-md px-4 py-3`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[#000] text-lg font-semibold mx-2 mr-4 items-center flex">
                {encounterDetails?.description}
              </div>
              <div>
                <div className="ml-2 flex" style={{ color }} id={displayStatus}>
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

              {encounterStatus === "completed" ||
              encounterStatus === "summary_inprogress" ? (
                <div className=" ">
                  <div className="mt-3 flex justify-center">
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
                </div>
              ) : (
                // View when an encounter is new or inprogress
                (encounterStatus !== "completed" ||
                  encounterStatus !== "summary_inprogress" ||
                  encounterStatus === "inprogress") && (
                  <div style={{ minHeight: "86vh" }}>
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{ minHeight: "60vh" }}
                    >
                      {/* <CurrentTranscript
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
                    ) : null} */}
                    </div>

                    {ambient_version == 2 &&
                      (encounterStatus === "inprogress" ||
                        encounterStatus === "new") && (
                        <div
                          style={{
                            minHeight: "20vh",
                            maxHeight: "20vh",
                            overflowY: "scroll",
                          }}
                        >
                          <Divider className="m-0 mt-4" />
                          <MobileLiveTranscription
                            fullTranscript={fullTranscript}
                            setFullTranscript={setFullTranscript}
                            liveTranscript={liveTranscript}
                            livePartialTranscript={livePartialTranscript}
                            setLivePartialTranscript={setLivePartialTranscript}
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
    </>
  );
};

export default EncounterDetails;
