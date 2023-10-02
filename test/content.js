chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.action) {
    case "requestPermissions":
      injectCustomLayout();
      break;
    // ... other cases
  }
});

function injectCustomLayout() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;

    chrome.scripting.insertCSS({
      target: { tabId },
      files: ["custom-layout.css"],
      allFrames: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["custom-layout.html"],
        allFrames: true,
      },
      function () {
        // Pass mediaType to the injected script
        chrome.tabs.sendMessage(tabId, {});
      }
    );
  });
}
