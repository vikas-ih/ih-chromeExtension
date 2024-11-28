/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import { useAuthUserOrNull } from "@frontegg/react-hooks";

import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Bars } from "react-loader-spinner";
import {
  completeEncounter,
  updateEncounter,
} from "../../store/slice/encounter.slice";

export const DEFAULT_VERBOSITY = "comprehensive";

export const DEFAULT_FORMAT = "bulleted";

const GenerateSummaryButton = ({
  encounter,
  encounterPhase,
  handleCompleteRecording,
}) => {
  const isAfterVisitDisabled =
    encounterPhase === "after-visit" &&
    encounter?.in_visit_status != "completed";
  const buttonText =
    encounterPhase === "in-visit"
      ? "Generate note"
      : encounterPhase === "after-visit"
      ? "Generate after visit summary"
      : "Save pre-chart";
  const tooltipText = "AVS can be generated after in-visit note is generated.";

  const button = (
    <span className="w-full">
      <Button
        id={"generate_note"}
        type={"button"}
        className="w-full"
        onClick={handleCompleteRecording}
        disabled={isAfterVisitDisabled}
      >
        <span className="mr-2 mt-0">
          <CheckOutlined />
        </span>
        {buttonText}
      </Button>
    </span>
  );

  return isAfterVisitDisabled ? (
    <Tooltip title={tooltipText} placement="bottom">
      {button}
    </Tooltip>
  ) : (
    button
  );
};

const AfterVisitControls = ({
  encounterId,
  encounter,
  schedulepage,
  encounterPhase,
  restrictTemplates,
  storedParams,
  currentTemplate,
  setCurrentTemplate,
  templateId,
  templateOverridesId,
  handleCompleteRecording,
}) => {
  const dispatch = useDispatch();
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const handleGenerateSummary = () => {
    dispatch(
      updateEncounter({
        encounter_id: encounterId,
        encounterPhase: encounterPhase,
        data: {
          template_id: currentTemplate?.template_id,
          template_overrides_id: currentTemplate?.template_overrides_id,
        },
        params: storedParams,
        accessToken: accessToken,
      })
    );
    handleCompleteRecording();
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 mt-4 justify-center">
        <GenerateSummaryButton
          encounter={encounter}
          encounterPhase={encounterPhase}
          handleCompleteRecording={handleGenerateSummary}
        />
      </div>
    </div>
  );
};

const AfterVisitButton = ({
  setActiveTab,
  storedParams,
  selectedRecord,
  encounterStatus,
  encounterPhase,
  setEncounterStatus,
  setActiveRightPanelTab,
  setIsStreaming,
  setIsRecording,
  schedulepage,
  restrictTemplates,
}) => {
  const userData = useAuthUserOrNull();
  const accessToken = userData?.user?.accessToken;
  const [micLevel, setMicLevel] = useState(0);
  const [showSaveDeleteButtons, setShowSaveDeleteButtons] = useState(false);

  // const { isEntitled: isPatientHistoryEntitled } =
  //   useFeatureEntitlements('patient-history');

  // const { isEntitled: hasGlobalNoteFormatEnabled } = useFeatureEntitlements(
  //   'global-note-format-preference'
  // );

  // const { isEntitled: hasICD10Access } = useFeatureEntitlements('icd-10');

  const { encounterDetails, mobileViewStatus } = useSelector((state) => ({
    encounterDetails: state.encounters.encounterDetails,
    mobileViewStatus: state.encounters.mobileViewStatus,
  }));

  

  const dispatch = useDispatch();
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [templateOverridesId, setTemplateOverridesId] = useState(null);

  const record =
    selectedRecord !== undefined ? selectedRecord : mobileViewStatus;
  const isMobile = window.innerWidth <= 1260;

  //Function when complete recording is clicked
  const handleCompleteRecording = () => {
    setEncounterStatus("summary_inprogress");

    setShowSaveDeleteButtons(false);
    dispatch(
      completeEncounter({
        encounter_id: record?.encounter_id,
        encounterPhase,
        storedParams,
        accessToken,
      })
    );
    setIsStreaming(false);
    setIsRecording(false);
    setMicLevel(0);
    endStream();
    setActiveTab ? setActiveTab("note") : null;
    const noteType =
      encounterPhase === "in-visit"
        ? "Note"
        : encounterPhase === "after-visit"
        ? "AVS"
        : "Pre-chart";

    if (hasICD10Access && encounterPhase == "in-visit") {
      setActiveRightPanelTab && setActiveRightPanelTab("icd10");
    }

    // if (schedulepage) {
    //   analytics.track(`Clicked Generate ${noteType} In Ambient From VCA`, {});
    // } else {
    //   analytics.track(`Clicked Generate ${noteType} In Ambient From Aura`, {});
    // }
  };
  return encounterStatus ? (
    <>
      <div
        style={{ maxWidth: "min(400px, 100%)", minWidth: "min(320px, 100%)" }}
        className="rounded-xl flex flex-col items-center justify-center relative current px-3"
      >
        <div className="w-full flex justify-center items-center">
          {encounterPhase === "after-visit" ? (
            <AfterVisitControls
              encounter={encounterDetails}
              encounterId={record?.encounter_id}
              schedulepage={schedulepage}
              encounterPhase={encounterPhase}
              encounterStatus={encounterStatus}
              restrictTemplates={restrictTemplates}
              currentTemplate={currentTemplate}
              setCurrentTemplate={setCurrentTemplate}
              templateId={templateId}
              templateOverridesId={templateOverridesId}
              handleCompleteRecording={handleCompleteRecording}
              storedParams={storedParams}
            />
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <>
      <Bars
        height="25"
        width="25"
        color="#00D090"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="justify-center"
        visible={true}
      />
    </>
  );
};

export default AfterVisitButton;
