// chrome

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ["./content.js"],
      })
      .then(() => {
        console.log("we have injected the content script");
      })
      .catch((err) => console.log(err, "background script error"));
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { createDiv: { width: "100px", height: "100px", innerHTML: "Hello" } },
    function (response) {
      console.log(response.confirmation);
    }
  );
});
