document.addEventListener("DOMContentLoaded", function () {
  const startRecordingButton = document.getElementById("startRecording");
  const stopRecordingButton = document.getElementById("stopRecording");
  const startVoiceRecordingButton = document.getElementById(
    "startVoiceRecording"
  );
  const stopVoiceRecordingButton =
    document.getElementById("stopVoiceRecording");
  const overlay = document.getElementById("overlay");
  const grantPermissionsButton = document.getElementById("grantPermissions");

  startRecordingButton.addEventListener("click", () =>
    sendMessage("startRecording")
  );
  stopRecordingButton.addEventListener("click", () =>
    sendMessage("stopRecording")
  );
  startVoiceRecordingButton.addEventListener("click", () =>
    sendMessage("startVoiceRecording")
  );
  stopVoiceRecordingButton.addEventListener("click", () =>
    sendMessage("stopVoiceRecording")
  );

  grantPermissionsButton.addEventListener("click", () => {
    overlay.style.display = "none";
    sendMessage("requestPermissions");
  });

  function sendMessage(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action });
    });
  }
});
