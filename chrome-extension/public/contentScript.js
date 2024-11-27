// Function to request microphone permissions
const requestMicPermission = () => {
  chrome.runtime.sendMessage({ action: "requestMicPermission" }, (response) => {
    if (response?.success) {
      // console.log("Microphone access granted.");
      // alert("Microphone access granted.");
    } else {
      console.error("Microphone access denied:", response?.error);
      // alert(
      //   `Microphone access denied: ${
      //     response?.error || "Unknown error occurred"
      //   }`
      // );
    }
  });
};

// Automatically request microphone permissions when the script loads
requestMicPermission();
