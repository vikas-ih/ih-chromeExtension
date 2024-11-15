/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWakeLock } from "react-screen-wake-lock";
// import { doStream, endStream } from '../../utils/listen';
import { useFeatureEntitlements } from "@frontegg/react";
// import { CheckOutlined } from '@ant-design/icons';
// import TemplateSelectDropdown from '../Settings/Settings.TemplateDropdown';
import { Popover, Select } from "antd";
// import { Bars } from 'react-loader-spinner';
// import { MicTest } from './MicTest';
// import { ButtonGroup } from './ButtonGroup';
// import { PatientNotes } from '../PatinetNotes/PatientNotes';
// import PreChartButton from './PreChartButton';
import InVisitButton from "./InVisitButton";
// import { MicTest } from './MicTest';
import { CloseAiIcon, MicOn, SettingsMicIcon } from "../../icons";
import { MicTest } from "./MicTest";
import AfterVisitButton from "./AfterVisitButton";

export const DEFAULT_VERBOSITY = "comprehensive";
export const verbosityOptions = [
  { value: "comprehensive", label: "Comprehensive" },
  { value: "balanced", label: "Balanced" },
  { value: "concise", label: "Concise" },
];

export const DEFAULT_FORMAT = "bulleted";
export const formatOptions = [
  { value: "bulleted", label: "Bulleted" },
  { value: "prose", label: "Prose" },
];

const CurrentTranscript = forwardRef(
  (
    {
      topBarInputs,
      storedParams,
      selectedRecord,
      encounterStatus,
      encounterPhase,
      setEncounterStatus,
      setLiveTranscript,
      setRecord,
      setLivePartialTranscript,
      setActiveRightPanelTab,
      setIsVisitStreaming,
      setIsChartStreaming,
      isVisitStreaming,
      isChartStreaming,
      isRecording,
      isChartRecording,
      isVisitRecording,
      setIsVisitRecording,
      setIsChartRecording,
      schedulepage,
      restrictTemplates,
      autoResumeVisit,
    },
    ref
  ) => {
    // const [micLevel, setMicLevel] = useState(0);
    const [micTest, setMicTest] = useState(0);
    // const [showSaveDeleteButtons, setShowSaveDeleteButtons] = useState(false);
    // const [isStarting, setIsStarting] = useState(false);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording, request, release]);

    useEffect(() => {
      setCurrentTemplate({});
      // To ensure when switching tabs, we pause the recording.
      // handleCleanupRecording();
    }, [encounterPhase]);

    const [selectedSummaryVerbosity, setSummaryVerbosity] = useState();
    const [selectedSummaryFormat, setSummaryFormat] = useState();

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

    //  const handleCleanupRecording = () => {
    //    setIsRecording(false);
    //    setIsStreaming(false);
    //    endStream();
    //  };

    const PopoverContent = ({
      micTest,
      microphones,
      selectedMicrophone,
      handleMicrophoneChange,
      isMobile,
      setOpen,
    }) => (
      <div className="relative">
        <div className="flex justify-end">
          <button onClick={() => setOpen(false)} className="font-bold">
            <CloseAiIcon fill="#000000" />
          </button>
        </div>
        <div
          id="microphone-select-wrapper"
          className="border-b border-bottom-[#00d091] p-4 -mt-2"
        >
          <Select
            id="Microphone_dropdown"
            placement="topRight"
            optionFilterProp="children"
            value={selectedMicrophone}
            onChange={(deviceId) => handleMicrophoneChange(deviceId)}
            bordered={false}
            className={`${
              isMobile ? "w-60" : "w-96"
            } h-10 border border-gray-200 rounded-full`}
          >
            {microphones.map((microphone) => (
              <Select.Option
                id={`microphone-option-${microphone.deviceId}`}
                key={microphone.deviceId}
                value={microphone.deviceId}
              >
                {microphone.label || `Microphone ${microphone.deviceId}`}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex justify-start items-center mt-5 gap-3">
          <div className="">
            <MicOn fill="#000" />
          </div>
          <div className={`${isMobile ? "w-60" : "w-full"} flex mt-3`}>
            <MicTest micLevel={micTest} id="Microphone_progress" />
          </div>
        </div>
      </div>
    );

    useEffect(() => {
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
        navigator.mediaDevices.removeEventListener(
          "devicechange",
          getMicrophones
        );
      };
    }, [selectedMicrophone, accessRequested]);

    const handlePopoverOpen = async () => {
      if (!accessRequested) {
        await RequestAccess();
        setAccessRequested(true);
      }
    };
    const RequestAccess = async () => {
      let micStream;
      let retval = false;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        micStream = stream;
        retval = true;
      } catch (err) {
        console.error("Error accessing microphone:", err);
        retval = false;
      }
      dispatch({
        type: "MICROPHONE_ACCESS",
        payload: retval,
      });
    };

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

      return () => {
        if (micStream) {
          micStream.getAudioTracks().forEach((track) => track.stop());
          clearInterval(microphoneTestInterval);
          localMediaStream.stop();
        }
      };
    }, [open, selectedMicrophone, accessRequested]);

    const handleMicrophoneChange = async (deviceId) => {
      // if (schedulepage) {
      //   analytics.track(
      //     'Clicked Microphone Option In Microphone Setting From VCA',
      //     {}
      //   );
      // } else {
      //   analytics.track(
      //     'Clicked Microphone Option In Microphone Setting From Aura',
      //     {}
      //   );
      // }
      setSelectedMicrophone(deviceId);
      if (!open) {
        setSelectedMicrophone(deviceId);
      }
    };

    const hide = () => {
      setMicTest(0);
      setOpen(false);
      endMicrophoneTest();
    };
    const handleMicTestReset = (newOpen) => {
      // if (schedulepage) {
      //   !open && analytics.track('Clicked Microphone Setting From VCA', {});
      // } else {
      //   !open && analytics.track('Clicked Microphone Setting From Aura', {});
      // }

      if (!open) {
        handlePopoverOpen();
        setOpen(newOpen);
      }
    };

    const endMicrophoneTest = () => {
      clearInterval(microphoneTestInterval);
    };

    if (
      encounterStatus === "completed" ||
      encounterStatus === "summary_inprogress"
    ) {
      return (
        <InVisitButton
          encounterPhase={encounterPhase}
          autoResumeVisit={autoResumeVisit}
          encounterStatus={encounterStatus}
          storedParams={storedParams}
          selectedRecord={record}
          topBarInputs={topBarInputs}
          setRecord={setRecord}
          setEncounterStatus={setEncounterStatus}
          setLiveTranscript={setLiveTranscript}
          setLivePartialTranscript={setLivePartialTranscript}
          setActiveRightPanelTab={setActiveRightPanelTab}
          isStreaming={isVisitStreaming}
          setIsStreaming={setIsVisitStreaming}
          isRecording={isVisitRecording}
          setIsRecording={setIsVisitRecording}
          schedulepage={schedulepage}
          restrictTemplates={restrictTemplates}
          noTemplate={true}
          ref={ref}
        />
      );
    }
    return (
      <>
        {!isRecording && encounterPhase != "after-visit" && (
          <div className="absolute top-3 right-5" id="Microphone_Open">
            <Popover
              placement={isMobile ? "bottomRight" : "leftBottom"}
              content={
                <PopoverContent
                  micTest={micTest}
                  microphones={microphones}
                  selectedMicrophone={selectedMicrophone}
                  handleMicrophoneChange={handleMicrophoneChange}
                  setOpen={setOpen}
                  isMobile={isMobile}
                />
              }
              trigger="click"
              open={open}
              onOpenChange={handleMicTestReset}
            >
              <button className=" ">
                <SettingsMicIcon onClick={hide} />
              </button>
            </Popover>
          </div>
        )}
        {(encounterPhase === "in-visit" && encounterStatus!=="completed") ? (
          <InVisitButton
            encounterPhase={encounterPhase}
            autoResumeVisit={autoResumeVisit}
            encounterStatus={encounterStatus}
            storedParams={storedParams}
            selectedRecord={record}
            topBarInputs={topBarInputs}
            setRecord={setRecord}
            setEncounterStatus={setEncounterStatus}
            setLiveTranscript={setLiveTranscript}
            setLivePartialTranscript={setLivePartialTranscript}
            setActiveRightPanelTab={setActiveRightPanelTab}
            isStreaming={isVisitStreaming}
            setIsStreaming={setIsVisitStreaming}
            isRecording={isVisitRecording}
            setIsRecording={setIsVisitRecording}
            schedulepage={schedulepage}
            restrictTemplates={restrictTemplates}
          />
        ) : encounterPhase === "after-visit" ? (
          <AfterVisitButton
            encounterPhase={encounterPhase}
            encounterStatus={encounterStatus}
            storedParams={storedParams}
            selectedRecord={record}
            topBarInputs={topBarInputs}
            setRecord={setRecord}
            setEncounterStatus={setEncounterStatus}
            setLiveTranscript={setLiveTranscript}
            setLivePartialTranscript={setLivePartialTranscript}
            setActiveRightPanelTab={setActiveRightPanelTab}
            isStreaming={isVisitStreaming}
            setIsStreaming={setIsVisitStreaming}
            isRecording={isVisitRecording}
            setIsRecording={setIsVisitRecording}
            schedulepage={schedulepage}
            restrictTemplates={restrictTemplates}
          />
        ) : (
          // <PreChartButton
          //   encounterPhase={encounterPhase}
          //   encounterStatus={encounterStatus}
          //   storedParams={storedParams}
          //   selectedRecord={record}
          //   topBarInputs={topBarInputs}
          //   setRecord={setRecord}
          //   setEncounterStatus={setEncounterStatus}
          //   setLiveTranscript={setLiveTranscript}
          //   setLivePartialTranscript={setLivePartialTranscript}
          //   setActiveRightPanelTab={setActiveRightPanelTab}
          //   isStreaming={isChartStreaming}
          //   setIsStreaming={setIsChartStreaming}
          //   isRecording={isChartRecording}
          //   setIsRecording={setIsChartRecording}
          //   schedulepage={schedulepage}
          //   restrictTemplates={restrictTemplates}
          // />
          <h1>Not Available</h1>
        )}
      </>
    );
  }
);
export default CurrentTranscript;
