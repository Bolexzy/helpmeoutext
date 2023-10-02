document.addEventListener("DOMContentLoaded", function () {
  const grantScreenButton = document.getElementById("grantScreen");
  const grantMicrophoneButton = document.getElementById("grantMicrophone");

  grantScreenButton.addEventListener("click", function () {
    triggerPermissionRequest("video");
  });

  grantMicrophoneButton.addEventListener("click", function () {
    triggerPermissionRequest("audio");
  });

  function triggerPermissionRequest(mediaType) {
    // Trigger the original permission request
    chrome.runtime.sendMessage({ action: "requestPermissions", mediaType });
  }
});
