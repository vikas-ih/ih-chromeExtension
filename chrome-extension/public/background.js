chrome.runtime.onStartup.addListener(() => {
  console.log(`onStartup()`);
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker activated.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in service worker:", message);
  sendResponse({ success: true });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("INSIDE SERVICE ONMESSAGE")
  if (message.action === "requestMicPermission") {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access granted.");
        sendResponse({ success: true });
        // Stop the stream to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((error) => {
        console.error("Microphone access denied:", error);
        sendResponse({ success: false, error: error.message });
      });
    // Return true to indicate asynchronous response
    return true;
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   // Function to request microphone permission
//   const requestMicPermission = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       console.log("Microphone access granted worker.");
//       // Do something with the audio stream if needed
//       stream.getTracks().forEach((track) => track.stop()); // Stop audio stream after access
//     } catch (error) {
//       console.error("Microphone access denied service:", error);
//     }
//   };

//   // Trigger microphone permission request
//   requestMicPermission();
// });
