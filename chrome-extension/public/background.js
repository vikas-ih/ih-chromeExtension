const APP_URL = "http://localhost:5174/account/login"; //PORT should be where the ih-app is running

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "openSidePanel",
//     title: "Open side panel",
//     contexts: ["all"],
//   });
//   chrome.tabs.create({ url: APP_URL });
// });

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("error SidePanel", error));

// chrome.runtime.onMessage.addListener((message, sender) => {
//   // The callback for runtime.onMessage must return falsy if we're not sending a response
//   (async () => {
//     if (message.type === "open_side_panel") {
//       // This will open a tab-specific side panel only on the current tab.
//       await chrome.sidePanel.open({ tabId: sender.tab.id });
//       await chrome.sidePanel.setOptions({
//         tabId: sender.tab.id,
//         path: "index.html",
//         enabled: true,
//       });
//     }
//   })();
// });
