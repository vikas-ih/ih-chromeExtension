import React, { useEffect ,useRef,useState} from "react";
import TopNavBar from "./components/TopNavBar";
import { useSelector } from "react-redux";
import { formatEncounterStatus, getEncounterStatus } from "./utilities/columns";
import AmbientMicIcon from "./assets/ambient_mic-02646837.svg";
import { CalanderAiIcon } from "./icons/CalendarAi.icon";
import moment from "moment";
import { SegmentedTabs } from "./components/baseComponents/SegmentedTabs";
import { Dropdown, Menu, Divider, Tooltip, Button } from "antd";
import { CopiesIcon, ExpandIcon, PdfIcon } from "./icons";
import { showToastInfo, showToastSuccess } from "./utilities/toast";
import { showToastError } from "./utilities/errortoast";

const EncounterDetails = () => {
  const { encounterDetails, transcriptionbyIdValue } = useSelector((state) => ({
    encounterDetails: state.encounters.encounterDetails,
    transcriptionbyIdValue: state.encounters.transcriptionbyIdValue,
  }));
  console.log("encounterDetails", encounterDetails);
  const { color, displayStatus } = formatEncounterStatus(encounterDetails);
  const isMobile = window.innerWidth < 1260;
  const schedulepage=undefined; //check
  const [encounterStatus, setEncounterStatus] = useState("");
  const [currentActive, setCurrentActive] = useState("");
  const [recordingTabs, setRecordingTabs] = useState([]);
  const editableSummaryRef = useRef(null);
  const medicalConversationBoxRef = useRef(null);
  let encounterPhase='in-visit';
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

   if (encounterDetails?.pre_chart_status != null) {
     tabs.unshift({ label: "Pre-chart", value: "Pre-chart" });
   }

   setRecordingTabs(tabs);
 };
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


  useEffect(() => {
    setEncounterStatus(getEncounterStatus(encounterDetails, encounterPhase));
    if (encounterDetails?.encounter_id) {
      configureRecordingTabs();
    }
  }, [encounterDetails]);
  return (
    <>
      <TopNavBar />
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
                  {moment(encounterDetails?.created_at).format("MMM Do, YYYY")}{" "}
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
   
    </>
  );
};

export default EncounterDetails;
