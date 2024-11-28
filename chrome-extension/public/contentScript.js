// Function to request microphone permissions
// const requestMicPermission = () => {
//   chrome.runtime.sendMessage({ action: "requestMicPermission" }, (response) => {
//     if (response?.success) {
//     } else {
//       console.error("Microphone access denied:", response?.error);
//     }
//   });
// };

// // Automatically request microphone permissions when the script loads
// requestMicPermission();


export const injectMicrophonePermissionIframe = () => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("hidden", "hidden");
  iframe.setAttribute("id", "permissionsIFrame");
  iframe.setAttribute("allow", "microphone");
  iframe.src = chrome.runtime.getURL("index.html");
  document.body.appendChild(iframe);
};