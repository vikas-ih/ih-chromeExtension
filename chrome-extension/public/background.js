// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and background script running");
});

async function fetchFronteggScript() {
  try {
    const response = await fetch(
      "https://assets.frontegg.com/admin-box/7.19.0/admin-portal/index.js"
    );
    const scriptText = await response.text();

    // Send the fetched script content to a content script or popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === "getFronteggScript") {
        sendResponse({ script: scriptText });
      }
    });
  } catch (error) {
    console.error("Failed to fetch the Frontegg script:", error);
  }
}

// Call the function to fetch the script
fetchFronteggScript();
