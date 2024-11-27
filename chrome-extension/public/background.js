// chrome.runtime.onStartup.addListener(() => {
//   console.log(`onStartup()`);
// });

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Service worker activated.");
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received in service worker:", message);
//   sendResponse({ success: true });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("INSIDE SERVICE ONMESSAGE")
//   if (message.action === "requestMicPermission") {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         console.log("Microphone access granted.");
//         sendResponse({ success: true });
//         // Stop the stream to release the microphone
//         stream.getTracks().forEach((track) => track.stop());
//       })
//       .catch((error) => {
//         console.error("Microphone access denied:", error);
//         sendResponse({ success: false, error: error.message });
//       });
//     // Return true to indicate asynchronous response
//     return true;
//   }
// });

// // document.addEventListener("DOMContentLoaded", () => {
// //   // Function to request microphone permission
// //   const requestMicPermission = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       console.log("Microphone access granted worker.");
// //       // Do something with the audio stream if needed
// //       stream.getTracks().forEach((track) => track.stop()); // Stop audio stream after access
// //     } catch (error) {
// //       console.error("Microphone access denied service:", error);
// //     }
// //   };

// //   // Trigger microphone permission request
// //   requestMicPermission();
// // });
const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openSidePanel",
    title: "Open side panel",
    contexts: ["all"],
  });
  chrome.tabs.create({ url: APP_URL });
});

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "openSidePanel") {
//     // This will open the panel in all the pages on the current window.
//     chrome.sidePanel.open({ windowId: tab.windowId });
//   }
// });

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("error SidePanel",error));

chrome.runtime.onMessage.addListener((message, sender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === "open_side_panel") {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab.id,
        path: "index.html",
        enabled: true,
      });
    }
  })();
});
