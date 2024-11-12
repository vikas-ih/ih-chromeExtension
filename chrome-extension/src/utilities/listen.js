// import { FronteggContext } from "@frontegg/rest-api";
import { io } from "socket.io-client";
import { getAuthHeaders } from "../store/apiConfig";
// import { useAuthUserOrNull } from "@frontegg/react-hooks";

let audioContext, socket, input, micStream, scriptNode;

let url = "https://ambient.api.lumi.build" + "/listen"; //env

// export function FronteggAccessToken(){
//   const userData = useAuthUserOrNull();
//   const accessToken = userData?.user?.accessToken;
// return accessToken;
// }
//  console.log("FronteggAccessToken", FronteggAccessToken());
export function doStream(
  encounter_id,
  encounter_phase,
  setMicLevel,
  setLiveTranscript,
  setLivePartialTranscript,
  selectedMicrophoneId,
  successCallback,
  failureCallback,
  setDictation = () => {},
  isDictate = false,
  accessToken
) {
  let connectionEstablished = false;
  // const headers = getAuthHeaders(accessToken);
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.onstatechange = () => {
    if (audioContext.state === "suspended") {
      // analytics.track(`User's Microphone Context Is Suspended`);
      failureCallback("AUDIO_CONTEXT_SUSPENDED");
    }
  };
  socket = io(url, {
    path: "/socket.io/",
    withCredentials: true,
    query: {
      encounter_id: encounter_id,
      encounter_phase: encounter_phase,
      sample_rate: audioContext.sampleRate,
      is_dictate: isDictate,
    },
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },

    reconnection: true, // Enable automatic reconnection
    reconnectionAttempts: 12, // Retry for about 1 minute.
    reconnectionDelay: 5000, // Fixed delay for reconnection (ms)
    reconnectionDelayMax: 5000, // Maximum delay between reconnections (ms)
    forceNew: true,
  });

  console.log("socket", socket);

  socket.on("connected", () => {
    connectionEstablished = true;
    if (!window.isMicOn) {
      onOpen(
        setMicLevel,
        selectedMicrophoneId,
        successCallback,
        failureCallback
      );
    }
  });

  socket.on("transcript", (data) => {
    if (isDictate) {
      setDictation(data);
    } else {
      setLiveTranscript(data);
    }
  });

  socket.on("partial_transcript", (data) => {
    if (!isDictate) {
      setLivePartialTranscript(data);
    }
  });

  socket.on("disconnect", (reason) => {
    console.error(`Socket disconnected: ${reason}`);
  });

  socket.on("connect_error", (error) => {
    if (!connectionEstablished) {
      console.error("Failed to connect to server:", error);
      failureCallback("NETWORK_INIT_ERROR");
    }
  });

  socket.io.on("reconnect_failed", () => {
    console.error("Given up on reconnecting to server.");
    failureCallback("NETWORK_ERROR");
  });
}

export function endStream() {
  window.isMicOn = false;

  if (scriptNode) {
    scriptNode.removeEventListener("audioprocess", processAudioEvent);
    scriptNode.disconnect();
  }

  if (input) {
    input.disconnect();
  }

  if (micStream) {
    micStream.getTracks().forEach((track) => track.stop());
  }

  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
  }

  if (socket) {
    socket.close();
  }
}

function calculateMicLevelPercent(inputData) {
  let i;
  let sum = 0.0;
  let clipcount = 0;
  let instant = 0;

  for (i = 0; i < inputData.length; ++i) {
    sum += inputData[i] * inputData[i];
    if (Math.abs(inputData[i]) > 0.99) {
      clipcount += 1;
    }
  }
  instant = Math.sqrt(sum / inputData.length);
  return Math.min(instant * 200 * 5, 100);
}

/**
 * Transform an audio processing event into a form suitable to be sent to the API. (S16LE or Signed 16 bit Little Edian).
 * Then send.
 * @param {AudioProcessingEvent} e
 */
function processAudioEvent(e, setMicLevel) {
  if (
    audioContext.state === "suspended" ||
    audioContext.state === "closed" ||
    !socket
  ) {
    console.error(
      "AudioContext is suspended or closed. State = ",
      audioContext.state
    );
    return;
  }

  let inputData = e.inputBuffer.getChannelData(0);

  // The samples are floats in range [-1, 1]. Convert to PCM16le.
  let output = new DataView(new ArrayBuffer(inputData.length * 2));
  for (let i = 0; i < inputData.length; i++) {
    let multiplier = inputData[i] < 0 ? 0x8000 : 0x7fff; // 16-bit signed range is -32768 to 32767
    output.setInt16(i * 2, (inputData[i] * multiplier) | 0, true); // index, value, little edian
  }

  let intData = new Int16Array(output.buffer);
  let index = intData.length;
  while (index-- && intData[index] === 0 && index > 0) {}

  if (socket.connected) {
    socket.emit(
      "audio",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        audio: Object.values(intData.slice(0, index + 1)),
      })
    );
    setMicLevel(calculateMicLevelPercent(inputData));
  } else {
    setMicLevel("offline");
  }
}

function onOpen(
  setMicLevel,
  selectedMicrophoneId,
  successCallback,
  failureCallback
) {
  navigator.mediaDevices
    .getUserMedia({ audio: { deviceId: selectedMicrophoneId } })
    .then((stream) => {
      micStream = stream;
      audioContext.resume().then(() => {
        scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
        input = audioContext.createMediaStreamSource(micStream);
        scriptNode.addEventListener("audioprocess", (event) =>
          processAudioEvent(event, setMicLevel, failureCallback)
        );
        input.connect(scriptNode);
        scriptNode.connect(audioContext.destination);
        audioContext.resume();

        window.isMicOn = true;
        successCallback();
      });
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error);
      failureCallback("MICROPHONE_SETUP_FAILED");
    });
}

/**
 * Displays the close reason and code on the webpage
 * @param {CloseEvent} event
 */
function onClose() {
  endStream();
}
