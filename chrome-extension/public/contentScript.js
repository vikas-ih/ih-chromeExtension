chrome.runtime.sendMessage({ message: "getFronteggScript" }, (response) => {
  if (response && response.script) {
    // You can evaluate the script if necessary, but be cautious with `eval`
    const script = document.createElement("script");
    script.textContent = response.script;
    document.head.appendChild(script);
  } else {
    console.error("Failed to get Frontegg script.");
  }
});

// contentScript.js
// contentScript.js

// Function to inject the local Frontegg script
function injectFronteggScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('dist/frontegg/index.js'); // Local path to Frontegg script
  script.onload = function() {
    console.log("Frontegg script loaded ist/frontegg");
    // Optional: Add any Frontegg initialization code here
  };
  (document.head || document.documentElement).appendChild(script);
}

// Run the function to inject the script
injectFronteggScript();

// Function to inject external Frontegg script

// Run the function to inject the script
injectFronteggScript();
