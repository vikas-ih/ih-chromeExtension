/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import { useWakeLock } from "react-screen-wake-lock";
// import { doStream, endStream } from '../../utils/listen';
// import { useFeatureEntitlements } from '@frontegg/react';
import { useAuthUserOrNull } from "@frontegg/react-hooks";

// import {
//   createEncounter,
//   completeEncounter,
//   updateEncounter,
//   startEncounter,
// } from '../../store/actions/encounter';
import { AmbientpauseIcon, ResumeIcon } from "../../icons";
import { CheckOutlined } from "@ant-design/icons";
// import TemplateSelectDropdown from '../Settings/Settings.TemplateDropdown';  //check
import { Modal, Tooltip } from "antd";
import { Bars } from "react-loader-spinner";
import { ButtonGroup } from "./ButtonGroup";
import { formatOptions, verbosityOptions } from "./CurrentTranscript";
import { doStream, endStream } from "../../utilities/listen";
import {
  createEncounter,
  completeEncounter,
  updateEncounter,
  startEncounter,
} from "../../store/slice/encounter.slice";
import { MicrophoneLevel } from "./MicrophoneLevel";
import AmbientAnimation from "../CurrentEncounter/AmbientAnimation";
import AmbientAnimationPaused from "../CurrentEncounter/AmbientAnimationPaused";

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

const InVisitButton = forwardRef(
  (
    {
      topBarInputs,
      setActiveTab,
      storedParams,
      selectedRecord,
      encounterStatus,
      encounterPhase,
      setEncounterStatus,
      setLiveTranscript,
      setRecord,
      setLivePartialTranscript,
      setActiveRightPanelTab,
      isStreaming,
      setIsStreaming,
      isRecording,
      setIsRecording,
      schedulepage,
      restrictTemplates,
      autoResumeVisit,
      noTemplate,
    },
    ref
  ) => {
    const userData = useAuthUserOrNull();
    const accessToken = userData?.user?.accessToken;
    const [micLevel, setMicLevel] = useState(0);
    const [micTest, setMicTest] = useState(0);
    const [showSaveDeleteButtons, setShowSaveDeleteButtons] = useState(false);
    const [isStarting, setIsStarting] = useState(false);

    // const { isEntitled: isPatientHistoryEntitled } =
    //   useFeatureEntitlements('patient-history');

    // const { isEntitled: hasGlobalNoteFormatEnabled } = useFeatureEntitlements(
    //   'global-note-format-preference'
    // );

    // const { isEntitled: hasICD10Access } = useFeatureEntitlements('icd-10');

    const { currentPractitioner } = useSelector(
      (state) => state?.practitionerState
    );
    const { encounterDetails, mobileViewStatus, isEncounterDetailsLoading } =
      useSelector((state) => ({
        encounterDetails: state.encounters.encounterDetails,
        mobileViewStatus: state.encounters.mobileViewStatus,
        isEncounterDetailsLoading: state.encounters.mobileViewStatus,
      }));
    // const { templateListLoading, templateOverridesListLoading } = useSelector(
    //   (state) => state?.summaryState
    // );

    const dispatch = useDispatch();
    const { isSupported, released, request, release } = useWakeLock();
    const [currentTemplate, setCurrentTemplate] = useState(null);
    const [templateId, setTemplateId] = useState(null);
    const [templateOverridesId, setTemplateOverridesId] = useState(null);
    const [open, setOpen] = useState(false);
    const [microphones, setMicrophones] = useState([]);
    const [selectedMicrophone, setSelectedMicrophone] = useState(null);
    const [microphoneTestInterval, setMicrophoneTestInterval] = useState(null);
    const [accessRequested, setAccessRequested] = useState(false);
    const record =
      selectedRecord !== undefined ? selectedRecord : mobileViewStatus;
    const isMobile = window.innerWidth <= 1260;

    if (noTemplate) {
      return null;
    }
    useEffect(() => {
      if (!isSupported) {
        console.warn("Screen Wake Lock is not supported");
        return;
      }
      if (isRecording) {
        request().catch((err) => {
          console.error(err);
        });
      } else {
        if (!released) {
          release();
        }
      }
    }, [isRecording, request, release]);

    useEffect(() => {
      setCurrentTemplate({});
      // To ensure when switching tabs, we pause the recording.
      // handleCleanupRecording();
    }, [encounterPhase]);

    const [selectedSummaryVerbosity, setSummaryVerbosity] = useState();
    const [selectedSummaryFormat, setSummaryFormat] = useState();

    const summaryVerbosity = useMemo(() => {
      if (selectedSummaryVerbosity) {
        return selectedSummaryVerbosity;
      }

      if (encounterDetails?.summary_verbosity) {
        return encounterDetails.summary_verbosity;
      }

      if (currentTemplate?.body?.verbosity) {
        return currentTemplate.body.verbosity;
      }

      return DEFAULT_VERBOSITY;
    }, [selectedSummaryVerbosity, encounterDetails, currentTemplate]);

    const summaryFormat = useMemo(() => {
      if (selectedSummaryFormat) {
        return selectedSummaryFormat;
      }

      if (encounterDetails?.summary_format) {
        return encounterDetails.summary_format;
      }

      if (currentTemplate?.body?.format) {
        return currentTemplate.body.format;
      }

      return DEFAULT_FORMAT;
    }, [selectedSummaryFormat, encounterDetails, currentTemplate]);

    const lastEncounterId = useRef(encounterDetails?.encounter_id);
    useEffect(() => {
      if (lastEncounterId.current !== encounterDetails?.encounter_id) {
        setSummaryVerbosity(undefined);
        setSummaryFormat(undefined);
        lastEncounterId.current = encounterDetails?.encounter_id;
      }
    }, [encounterDetails]);

    useEffect(() => {
      if (encounterDetails) {
        if (encounterPhase == "in-visit") {
          setTemplateId(encounterDetails.in_visit_template_id);
          setTemplateOverridesId(
            encounterDetails.in_visit_template_overrides_id
          );
        } else if (encounterPhase == "pre-chart") {
          setTemplateId(encounterDetails.pre_chart_template_id);
          setTemplateOverridesId(
            encounterDetails.pre_chart_template_overrides_id
          );
        }
      }
    }, [encounterDetails, encounterPhase]);

    useEffect(() => {
      return () => {
        // This function will be called when the component is unmounted
        // This is to ensure if the user starts a mic and navigates away, it's paused
        // this is also a fix for the "delay" in transcription.
        //   handleCleanupRecording();
      };
    }, []);

    const handleCreate = () => {
      const data = {
        practitioner_id: currentPractitioner.practitioner_id,
        start_time: new Date(),
        type: "ambient",
        description: topBarInputs?.description,
        summary_verbosity: summaryVerbosity,
        summary_format: summaryFormat,
        template_id: currentTemplate?.template_id,
        template_overrides_id: currentTemplate?.template_overrides_id,
      };
      dispatch(createEncounter({ data, accessToken }));
    };

    const handleSocketErrors = (error) => {
      // analytics.track(
      //   `User Run Into Socket Error: ${error}, Pausing Encounter`,
      //   {}
      // );
      let modalOptions = {
        centered: true,
        className: "font-sans",
      };
      if (error === "MICROPHONE_SETUP_FAILED") {
        Modal.error({
          ...modalOptions,
          title: "Microphone setup failed",
          content:
            "Unable to access a microphone. Please check your microphone settings and permissions.",
        });
      } else if (error === "AUDIO_CONTEXT_SUSPENDED") {
        Modal.warning({
          ...modalOptions,
          title: "Microphone was suspended",
          content:
            "Microphone was suspended. Please click resume to continue transcribing.",
        });
      } else if (error === "NETWORK_ERROR") {
        Modal.error({
          ...modalOptions,
          title: "Network error",
          content:
            "You were offline for more than 1 minute. Please click resume to continue transcribing.",
        });
      } else if (error === "NETWORK_INIT_ERROR") {
        Modal.error({
          ...modalOptions,
          title: "Network offline",
          content:
            "Could not connect to server. Please check your connection and try again.",
        });
      }
      handleCleanupRecording();

      const audio = new Audio("src/assets/error.mp3");
      audio.play();
    };

    const handleCleanupRecording = () => {
      setIsRecording(false);
      setIsStreaming(false);
      endStream();
    };

    //Function when pause recording is clicked
    const handlePauseRecording = () => {
      setIsRecording(false);
      setIsStreaming(false);
      endStream();
      const noteType =
        encounterPhase === "in-visit"
          ? "Visit"
          : encounterPhase === "pre-chart"
          ? "Pre-charting"
          : "";
      // if (schedulepage) {
      //   analytics.track(`Clicked Pause ${noteType} In Ambient From VCA`, {});
      // } else {
      //   analytics.track(`Clicked Pause ${noteType} In Ambient From Aura`, {});
      // }
    };

    //Function when resume recording is clicked
    const handleResumeRecording = () => {
      let data = {
        summary_verbosity: summaryVerbosity,
        summary_format: summaryFormat,
        template_id: currentTemplate?.template_id,
        template_overrides_id: currentTemplate?.template_overrides_id,
      };
      dispatch(
        updateEncounter({
          encounter_id: record?.encounter_id,
          encounterPhase,
          data,
          storedParams,
          // false,
          accessToken,
        })
      );
      doStream(
        record?.encounter_id,
        encounterPhase,
        setMicLevel,
        setLiveTranscript,
        setLivePartialTranscript,
        selectedMicrophone,
        () => {
          setIsStreaming(true);
        },
        (error) => {
          handleSocketErrors(error);
        },
        undefined,
        false,
        accessToken
      );
      setIsRecording(true);
      const noteType =
        encounterPhase === "in-visit"
          ? "Visit"
          : encounterPhase === "pre-chart"
          ? "Pre-charting"
          : "";
      // if (schedulepage) {
      //   analytics.track(`Clicked Resume ${noteType} In Ambient From VCA`, {});
      // } else {
      //   analytics.track(`Clicked Resume ${noteType} In Ambient From Aura`, {});
      // }
    };

    //Function when stop recording is clicked
    const handleStopRecording = () => {
      setShowSaveDeleteButtons(true);
      handlePauseRecording();
      setIsStreaming(false);
      setMicLevel(0);
      // if (schedulepage) {
      //   analytics.track("Clicked Stop Recording In Ambient From VCA", {});
      // } else {
      //   analytics.track("Clicked Stop Recording In Ambient From Aura", {});
      // }
    };

    //Function when complete recording is clicked
    const handleCompleteRecording = () => {
      setEncounterStatus("summary_inprogress");
      console.log("completed");
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

    const handleStartEncounter = (encounter_phase) => {
      setIsRecording(true);
      setIsStarting(true);
      dispatch(
        startEncounter(
          record?.encounter_id,
          encounter_phase,
          {
            summary_verbosity: summaryVerbosity,
            summary_format: summaryFormat,
            template_id: currentTemplate?.template_id,
            template_overrides_id: currentTemplate?.template_overrides_id,
          },
          storedParams,
          (newRecord) => {
            setRecord(newRecord);
          },

          accessToken
        )
      );

      doStream(
        record?.encounter_id,
        encounterPhase,
        setMicLevel,
        setLiveTranscript,
        setLivePartialTranscript,
        selectedMicrophone,
        () => {
          setIsStreaming(true);
          setIsStarting(false);
        },
        (error) => {
          handleSocketErrors(error);
        },
        undefined,
        false,
        accessToken
      );
    };

    const handleStartOrResumeRecording = () => {
      if (record?.encounter_id) {
        handleResumeRecording();
      } else {
        handleCreate();
        setIsRecording(true);
        // if (schedulepage) {
        //   analytics.track("Clicked New Recording In Ambient From VCA", {});
        // } else {
        //   analytics.track("Clicked New Recording In Ambient From Aura", {});
        // }
      }
    };

    const handlePauseResumeToggle = () => {
      if (isRecording) {
        handlePauseRecording();
      } else {
        handleResumeRecording();
      }
    };

    useImperativeHandle(ref, () => {
      return { handlePauseResumeToggle };
    });

    const ifShowRecordingControls = () => {
      return (
        encounterStatus === "new" ||
        encounterStatus === "inprogress" ||
        !encounterDetails?.encounter_id
      );
    };

    const isNotLoading = isEncounterDetailsLoading;

    useEffect(() => {
      if (autoResumeVisit && isNotLoading && record?.encounter_id) {
        handlePauseResumeToggle();
      }
    }, [autoResumeVisit, record?.encounter_id]);

    // useEffect(() => {

    // }, [selectedMicrophone, accessRequested]);

    useEffect(() => {
      let micStream;
      const MIN_ENERGY_THRESHOLD = 60;
      const setupMicrophone = async () => {
        try {
          if (open && selectedMicrophone) {
            const constraints = {
              audio: {
                deviceId: { exact: selectedMicrophone },
              },
            };
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );

            const audioContext = new AudioContext();
            const analyzer = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyzer);

            analyzer.fftSize = 32;
            const bufferLength = analyzer.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const calculateMicLevel = () => {
              analyzer.getByteFrequencyData(dataArray);
              const energy =
                dataArray.reduce((acc, val) => acc + Math.abs(val), 0) /
                bufferLength;
              const adjustedMicLevel = energy * 0.7;
              if (energy > MIN_ENERGY_THRESHOLD) {
                setMicTest(adjustedMicLevel);
              } else {
                setMicTest(4);
              }
            };
            const intervalId = setInterval(() => {
              calculateMicLevel();
            }, 100);
            setMicrophoneTestInterval(intervalId);
            return () => {
              clearInterval(intervalId);
            };
          } else {
            if (micStream) {
              micStream.getAudioTracks().forEach((track) => track.stop());
            }
          }
        } catch (error) {
          console.error("Error accessing microphone:", error);
        }
      };

      setupMicrophone();

      const getMicrophones = async () => {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioInputDevices = devices.filter(
            (device) => device.kind === "audioinput"
          );
          setMicrophones(audioInputDevices);

          if (audioInputDevices.length > 0) {
            const selectedMicStillAvailable = audioInputDevices.some(
              (device) => device.deviceId === selectedMicrophone
            );
            if (!selectedMicStillAvailable) {
              setSelectedMicrophone(audioInputDevices[0].deviceId);
            }
          }
        } catch (error) {
          console.error("Error enumerating devices:", error);
        }
      };
      getMicrophones();
      navigator.mediaDevices.addEventListener("devicechange", getMicrophones);

      return () => {
        if (micStream) {
          micStream.getAudioTracks().forEach((track) => track.stop());
          clearInterval(microphoneTestInterval);
          localMediaStream.stop();
        }
        navigator.mediaDevices.removeEventListener(
          "devicechange",
          getMicrophones
        );
      };
    }, [open, selectedMicrophone, accessRequested]);

    if (noTemplate) {
      return null;
    }
    return isNotLoading ? (
      <>
        <div
          style={{ maxWidth: "min(400px, 100%)", minWidth: "min(320px, 100%)" }}
          className="rounded-xl flex flex-col items-center justify-center relative current px-3"
        >
          <div
            className={`${
              isMobile ? "w-full" : ""
            } flex items-center justify-center`}
          >
            {encounterPhase != "after-visit" && (
              <div className="">
                {isStreaming && !showSaveDeleteButtons ? (
                  // will trigger once the recording is started/resumed
                  <div
                    className="cursor-pointer"
                    onClick={handlePauseRecording}
                  >
                    <AmbientAnimation />
                    <div className="w-full">
                      <MicrophoneLevel micLevel={micLevel} />
                    </div>
                  </div>
                ) : (
                  // will trigger once the recording is paused
                  <div
                    className="cursor-pointer"
                    onClick={
                      encounterStatus === "new"
                        ? () => handleStartEncounter(encounterPhase)
                        : handleStartOrResumeRecording
                    }
                  >
                    <AmbientAnimationPaused />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            {encounterPhase != "after-visit" &&
              ifShowRecordingControls() &&
              !showSaveDeleteButtons && (
                <div className="w-full mt-2">
                  <div
                    className={[
                      "w-full",
                      isRecording && "pointer-events-none opacity-50",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {/* <div className="text-[#667085] mb-1">Note template</div> */}
                    {/* <TemplateSelectDropdown
                    allowInlineEdit={encounterPhase === 'in-visit'}
                    encounterPhase={encounterPhase}
                    currentTemplate={currentTemplate}
                    setCurrentTemplate={setCurrentTemplate}
                    commitOnChange={false}
                    templateId={templateId}
                    templateOverridesId={templateOverridesId}
                    fromAuraPage={!schedulepage}
                    restrictTemplates={restrictTemplates}
                  /> */}
                    {encounterPhase === "in-visit" && (
                      <>
                        <div className="mt-3">
                          <div className="text-[#667085] mb-1">Note detail</div>
                          <ButtonGroup
                            options={verbosityOptions}
                            value={summaryVerbosity}
                            onChange={(value) => {
                              // analytics.track(
                              //   "Clicked Verbosity Option In In-visit",
                              //   {
                              //     verbosity: value,
                              //   }
                              // );
                              setSummaryVerbosity(value);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {isStreaming ? (
                    // will trigger once the recording is started/resumed
                    <>
                      <div className="flex space-x-4 mt-5 justify-center">
                        <Button
                          id={"pause_record"}
                          type={"button"}
                          className="w-full bg-[#A9A9A9] hover:bg-[#696969] flex items-center justify-center text-white font-normal p-2 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                          onClick={handlePauseResumeToggle}
                        >
                          <>
                            <span className="mr-2 mt-0">
                              <AmbientpauseIcon />
                            </span>
                            Pause{" "}
                            {encounterPhase === "in-visit"
                              ? "visit"
                              : encounterPhase === "pre-chart"
                              ? "pre-charting"
                              : ""}
                          </>
                        </Button>
                      </div>
                      <div className="flex space-x-4 mt-4 justify-center">
                        <GenerateSummaryButton
                          encounter={encounterDetails}
                          encounterPhase={encounterPhase}
                          handleStopRecording={handleStopRecording}
                          handleCompleteRecording={handleCompleteRecording}
                        />
                      </div>
                    </>
                  ) : encounterStatus !== "new" && !isStarting ? (
                    // will trigger once the recording is paused
                    <>
                      <div className="flex mt-5 justify-center">
                        <div className="bg-[#A9A9A9] hover:bg-[#696969] divide-x divide-white w-full rounded-xl flex justify-center items-center">
                          <Button
                            type={"button"}
                            className="w-full bg-[#A9A9A9] hover:bg-[#696969] flex items-center justify-center text-white font-normal p-2 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                            onClick={handlePauseResumeToggle}
                          >
                            {isRecording ? (
                              <>
                                <span className="mr-2 mt-0">
                                  <ResumeIcon />
                                </span>
                                Resuming ...
                              </>
                            ) : (
                              <>
                                <span className="mr-2 mt-0">
                                  <ResumeIcon />
                                </span>
                                Resume{" "}
                                {encounterPhase === "in-visit"
                                  ? "visit"
                                  : encounterPhase === "pre-chart"
                                  ? "pre-charting"
                                  : ""}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex space-x-4 mt-4 justify-center">
                        <GenerateSummaryButton
                          encounter={encounterDetails}
                          handleStopRecording={handleStopRecording}
                          handleCompleteRecording={handleCompleteRecording}
                          encounterPhase={encounterPhase}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full rounded-xl flex justify-center items-center mt-5">
                        <Button
                          id={"start_record"}
                          type={"button"}
                          className={"w-full"}
                          onClick={() => handleStartEncounter(encounterPhase)}
                        >
                          {isRecording ? (
                            <>
                              <span className="mr-2 mt-0">
                                <ResumeIcon />
                              </span>
                              Starting ...
                            </>
                          ) : (
                            <>
                              <span className="mr-2 mt-0">
                                <ResumeIcon />
                              </span>
                              Start{" "}
                              {encounterPhase === "in-visit"
                                ? "visit"
                                : encounterPhase === "pre-chart"
                                ? "pre-charting"
                                : ""}
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
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
  }
);

export default InVisitButton;
