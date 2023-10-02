document.addEventListener("DOMContentLoaded", () => {
  // Get the selectors of the buttons
  const startVideoButton = document.querySelector("button#start_video");
  const stopVideoButton = document.querySelector("button#stop_video");

  // adding event listeners
  startVideoButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request_recording" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, "error line 14");
          }
        }
      );
    });
  });

  stopVideoButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "stopvideo" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, "error line 27");
          }
        }
      );
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("closeButton");

    // Add click event listener to the close button
    closeButton.addEventListener("click", function () {
      // Close the popup when the button is clicked
      window.close();
    });
  });
});
