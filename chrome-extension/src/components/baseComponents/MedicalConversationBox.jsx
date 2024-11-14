/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { Popover, Rate as Rating, Select, Skeleton } from "antd";
import { useAuthUserOrNull } from "@frontegg/react-hooks";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFeatureEntitlements } from "@frontegg/react";

import "../PastEncounter.scss";
// import Editor from './Editor';
import { CloseAiIcon, MicOn, SettingsMicIcon } from "../../icons";
import {
  getSummaryRating,
  summaryFeedbackAction,
} from "../../store/actions/summary";
import { summaryRatingSlice } from "../../store/slice/summary.slice";
import { endStream } from "../../utilities/listen";
import { ModalComponent } from "./Modal";
import { MicTest } from "./MicTest";
import EditorMobile from "./EditorMobile";
// import Editor from './Editor';

const NO_MEDICALNOTES_MESSAGE = "<p>No medical notes for this encounter</p>";

export const SummaryLoading = () => {
  return (
    <div className="min-h-screen p-9">
      <Skeleton active className="mb-9" />
      <Skeleton active className="mt-9 mb-9" />
      <Skeleton active className="mt-9 mb-9" />
    </div>
  );
};

const SummaryCommentsModal = ({
  isOpen,
  setIsOpen,
  summaryId,
  summaryRating,
  schedulepage,
}) => {
  const dispatch = useDispatch();
  const initialValues = {
    comment: "",
  };

  const sections = [
    {
      heading: "How can we improve?",
      className: "",
      fields: [
        {
          name: "comment",
          type: "textarea",
          placeholder: "Provide additional feedback (optional)",
          rows: 6,
        },
      ],
    },
  ];

  const handleSummaryComment = async (values) => {
    const userData = useAuthUserOrNull();
    const accessToken = userData?.user?.accessToken;
    const { comment } = values;
    dispatch(
      summaryFeedbackAction(summaryId, summaryRating, comment, accessToken)
    );
    // if (schedulepage) {
    //   analytics.track("Submitted Medical Notes Ratings and Comments From VCA", {
    //     summary_id: summaryId,
    //     score: summaryRating,
    //     comments: comment,
    //   });
    // } else {
    //   analytics.track(
    //     "Submitted Medical Notes Ratings and Comments From Aura",
    //     {
    //       summary_id: summaryId,
    //       score: summaryRating,
    //       comments: comment,
    //     }
    //   );
    // }
    setIsOpen(false);
  };
  return (
    <ModalComponent
      open={isOpen}
      className={"SummaryComment-modal"}
      initialValues={initialValues}
      sections={sections}
      centered={true}
      submitButtonText="Submit"
      cancelButtonText="Cancel"
      handleCancel={() => {
        handleSummaryComment("");
        setIsOpen(false);
      }}
      handleSubmit={(values) => handleSummaryComment(values)}
    />
  );
};

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
    <div className="border-b border-bottom-[#00d091] p-4 -mt-2">
      <Select
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
          <Select.Option key={microphone.deviceId} value={microphone.deviceId}>
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
        <MicTest micLevel={micTest} />
      </div>
    </div>
  </div>
);

const MedicalConversationBox = forwardRef(
  (
    {
      selectedEncounterId,
      medicalConversation = "",
      handleMedicalConversationChange,
      encounterId,
      encounterStatus,
      selectedRecord,
      schedulepage,
      summaryId,
      activeButton,
      handleDictation,
      triggerShowSummaryEvidence,
    },
    ref
  ) => {
    const editableSummaryRef = useRef(null);
    const [editedSummary, setEditedSummary] = useState("");

    const { encounterDetails, mobileViewStatus } = useSelector((state) => ({
      encounterDetails: state.encounters.encounterDetails,
      mobileViewStatus: state.encounters.mobileViewStatus,
    }));
    const userData = useAuthUserOrNull();
    const accessToken = userData?.user?.accessToken;
    const record =
      selectedRecord !== undefined ? selectedRecord : mobileViewStatus;
    const [ratingFeedbackOpen, setCommentsModelOpen] = useState(false);
    // const { isEntitled: isDictationEntitled } =
    //   useFeatureEntitlements('dictation'); //check
    const [isLoading, setIsLoading] = useState(true);
    const [micTest, setMicTest] = useState(0);
    const [microphones, setMicrophones] = useState([]);
    const [selectedMicrophone, setSelectedMicrophone] = useState(null);
    const [open, setOpen] = useState(false);
    const [accessRequested, setAccessRequested] = useState(false);
    const [microphoneTestInterval, setMicrophoneTestInterval] = useState(null);
    const isMobile = window.innerWidth <= 1260;
    const [isSummaryOutdated, setIsSummaryOutdated] = useState(false);

    const { summaryRating } = useSelector((state) => {
      return state?.summarySlice?.summaryState || {};
    });

    // const { summaryList } = useSelector((state) => ({
    //   summaryList: state?.summarySlice?.summaryList,
    // }));
    const dispatch = useDispatch();

    // useEffect(() => {
    //   setIsSummaryOutdated(false);

    //   // when the summary is generating or re-generation clear ref to summary
    //   // to ensured the updated summary is loaded when it's ready
    //   if (encounterStatus != "completed") {
    //     editableSummaryRef.current = null;
    //     setEditedSummary("");
    //     setIsSummaryOutdated(false);
    //   } else if (summaryList?.length > 0) {
    //     const cleaned_summary_json = summaryList[0].summary_json?.replaceAll(
    //       "\n",
    //       "<br>"
    //     );
    //     const cleaned_summary = {
    //       ...summaryList[0],
    //       summary_json: cleaned_summary_json,
    //     };
    //     if (
    //       editableSummaryRef.current?.encounter_id !=
    //         cleaned_summary.encounter_id ||
    //       editableSummaryRef.current?.encounter_phase !=
    //         cleaned_summary.encounter_phase
    //     ) {
    //       editableSummaryRef.current = cleaned_summary;
    //       setEditedSummary({ ...cleaned_summary });
    //       medicalConversation = cleaned_summary;
    //       console.log("medicalConversation", medicalConversation);
    //       // lastUpdatedSummaryRef.current = { ...cleaned_summary };
    //     } else {
    //       if (editableSummaryRef.current.version != cleaned_summary.version) {
    //         setIsSummaryOutdated(true);
    //       }
    //     }
    //   }
    // }, [summaryList, encounterStatus]);

    useEffect(() => {
      if (encounterId && encounterStatus === "completed") {
        setIsLoading(true);
        dispatch(getSummaryRating(encounterId, accessToken)).then(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }, [summaryId, encounterId, dispatch]);
    // const summary =

    useEffect(() => {
      if (
        encounterStatus !== "completed" ||
        medicalConversation === NO_MEDICALNOTES_MESSAGE
      ) {
        setIsLoading(false);
      }
    }, [encounterStatus, medicalConversation]);

    const handleMicrophoneChange = async (deviceId) => {
      // if (schedulepage) {
      //   analytics.track(
      //     "Clicked Microphone Option In Microphone Setting From VCA",
      //     {}
      //   );
      // } else {
      //   analytics.track(
      //     "Clicked Microphone Option In Microphone Setting From Aura",
      //     {}
      //   );
      // }
      setSelectedMicrophone(deviceId);
      if (!open) {
        setSelectedMicrophone(deviceId);
      }
    };

    const handleMicTestReset = (newOpen) => {
      // if (schedulepage) {
      //   !open && analytics.track("Clicked Microphone Setting From VCA", {});
      // } else {
      //   !open && analytics.track("Clicked Microphone Setting From Aura", {});
      // }

      if (!open) {
        handlePopoverOpen();
        setOpen(newOpen);
      }
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

    const handlePopoverOpen = async () => {
      if (!accessRequested) {
        await RequestAccess();
        setAccessRequested(true);
      }
    };

    const endMicrophoneTest = () => {
      clearInterval(microphoneTestInterval);
    };

    const hide = () => {
      setMicTest(0);
      setOpen(false);
      endMicrophoneTest();
    };

    const [dictation, setDictation] = useState("");
    const [fullDictation, setFullDictation] = useState("");
    const editorRef = useRef(null);
    const [lastInsertedText, setLastInsertedText] = useState("");

    const insertTextAtCursor = useCallback(
      (text) => {
        if (editorRef.current) {
          const newText = text.slice(lastInsertedText.length);
          editorRef.current.insertText(newText);
          if (text == "\n") {
            setLastInsertedText(text + " ");
          } else {
            setLastInsertedText(text);
          }
        }
      },
      [lastInsertedText]
    );

    useImperativeHandle(ref, () => ({
      setDictationText(text) {
        setDictation(text);
      },
      getMicrophone() {
        return selectedMicrophone;
      },
      handleSocketErrors(error) {
        handleSocketErrors(error);
      },
      stopDictation() {
        setDictation("");
        setFullDictation("");
        setLastInsertedText("");
      },
      setEditorFocus() {
        editorRef.current?.setFocus();
      },
    }));

    const applyDragonConversions = (text) => {
      const dragonText = text
        .replace(/\s?\n\s?(\w)/gi, (match, p1) => ` \n${p1.toUpperCase()}`)
        .replace(/\s?\n\n\s?(\w)/gi, (match, p1) => ` \n\n${p1.toUpperCase()}`)
        .replace(/(?:number|numerical)\s?(\d+)/gi, (match, digits) => digits)
        .replace(/\s?period/gi, (match, p1) => `.`)
        .replace(/\.\s([a-zA-Z])/g, (match, p1) => `. ${p1.toUpperCase()}`)
        .replace(/\s?comma\s?/gi, (match, p1) => `, `)
        .replace(/\s?semicolon/gi, (match, p1) => `;`)
        .replace(/\s?colon/gi, (match, p1) => `:`)
        .replace(/\:\s([a-zA-Z])/g, (match, p1) => `: ${p1.toUpperCase()}`)
        .replace(/((hyphen)|(dash))/gi, (match, p1) => `-`)
        .replace(/\s?slash\s?/gi, (match, p1) => `/`)
        .replace(/\s?question mark/gi, (match, p1) => `?`)
        .replace(/\?\s([a-zA-Z])/g, (match, p1) => `? ${p1.toUpperCase()}`)
        .replace(/\s?exclamation (mark|point)/gi, "!")
        .replace(/\!\s([a-zA-Z])/g, (match, p1) => `! ${p1.toUpperCase()}`)
        .replace(/\s?percent\s?/gi, (match, p1) => `%`)
        .replace(/(open|begin) single quote\s?/gi, "'")
        .replace(/\'\s(\w)/g, (match, p1) => `'${p1}`)
        .replace(/\s?(close|end) single quote/gi, "'")
        .replace(/(open|begin) quote\s?/gi, '"')
        .replace(/\"\s(\w)/g, (match, p1) => `"${p1}`)
        .replace(/\s?(close|end) quote/gi, '"')
        .replace(/open parenthesis\s?/gi, "(")
        .replace(/\(\s(\w)/g, (match, p1) => `(${p1}`)
        .replace(/\s?close parenthesis/gi, ")")
        .replace(/mister (\w)/gi, (match, p1) => `Mr. ${p1.toUpperCase()}`)
        .replace(/miss (\w)/gi, (match, p1) => `Ms. ${p1.toUpperCase()}`)
        .replace(/missus (\w)/gi, (match, p1) => `Mrs. ${p1.toUpperCase()}`)
        .replace(/doctor (\w)/gi, (match, p1) => `Dr. ${p1.toUpperCase()}`)
        .replace(/i\s/gi, "I ")
        .replace(/i'/gi, "I'")
        .replace(
          /no\s?caps\s?on[^a-zA-Z0-9]*(.*?)no\s?caps\s?off?/gi,
          (match, p1) => p1.trim().toLowerCase()
        )
        .replace(
          /all\s?caps\s?on[^a-zA-Z0-9]*(.*?)all\s?caps\s?off?/gi,
          (match, p1) => p1.trim().toUpperCase()
        )
        .replace(/caps\s?on[^a-zA-Z0-9]*(.*?)caps\s?off?/gi, (match, p1) =>
          p1.trim().replace(/\b\w/g, (c) => c.toUpperCase())
        )
        .replace(/\?+/g, "?");

      return dragonText;
    };

    useEffect(() => {
      if (dictation.length > 0 && dictation[0].text.length > 0) {
        if (fullDictation.length > 0) {
          let newText = fullDictation + " " + dictation[0].text;
          setFullDictation(applyDragonConversions(newText));
        } else {
          let newText =
            dictation[0].text.charAt(0).toUpperCase() +
            dictation[0].text.slice(1);
          setFullDictation(applyDragonConversions(newText));
        }
      }
    }, [dictation]);

    useEffect(() => {
      if (fullDictation.length > 0) {
        insertTextAtCursor(fullDictation);
      }
    }, [fullDictation, insertTextAtCursor]);

    const handleSocketErrors = (error) => {
      setDictation("");
      setFullDictation("");
      setLastInsertedText("");
      endStream();
    };

    return (
      <>
        {encounterStatus === "completed" && (
          <div className="absolute top-3 right-5">
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

        {encounterStatus === "summary_inprogress" || isLoading ? (
          <SummaryLoading />
        ) : (
          <div className="mr-2 h-full">
            <div
              className="relative flex-1 overflow-y-auto"
              style={{ minHeight: "65vh" }}
            >
              <EditorMobile
                ref={editorRef}
                value={
                  medicalConversation === ""
                    ? NO_MEDICALNOTES_MESSAGE
                    : medicalConversation
                }
                onChange={handleMedicalConversationChange}
                encounterId={encounterId}
                theme="snow"
                className="ql-toolbar font-sans rounded-b-xl"
                style={{ border: "none", height: "100%" }}
                enableDotPhrases={true}
                readOnly={encounterStatus !== "completed"}
                handleDictation={handleDictation}
                triggerShowSummaryEvidence={triggerShowSummaryEvidence}
              />
            </div>
            {encounterStatus === "completed" &&
              medicalConversation &&
              medicalConversation !== NO_MEDICALNOTES_MESSAGE &&
              activeButton === "In visit" && (
                <SummaryCommentsModal
                  isOpen={ratingFeedbackOpen}
                  setIsOpen={setCommentsModelOpen}
                  summaryId={summaryId}
                  summaryRating={summaryRating}
                  schedulepage={schedulepage}
                />
              )}
          </div>
        )}
      </>
    );
  }
);

export default MedicalConversationBox;
