console.log("Hi, I have been injected whoopie!!!");

var recorder = null;
function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  const controlContainer = document.createElement("div");
  const controlContent = document.createElement("div");
  controlContainer.className = "controls-container";
  controlContent.className = "controls-content";
  // time
  const Time = document.createElement("div");
  Time.className = "time";
  controlContent.appendChild(Time);
  timeText = document.createElement("p");
  timeText.textContent = "00:03:45";
  Time.appendChild(timeText);
  const recordIcon = document.createElement("div");
  recordIcon.className = "record-icon";
  Time.appendChild(recordIcon);
  const Division = document.createElement("div");
  Division.className = "division";
  Time.appendChild(Division);

  // controls
  const Controls = document.createElement("div");
  Controls.className = "controls";
  controlContent.appendChild(Controls);
  // pause
  const Pause = document.createElement("div");
  Pause.className = "pause";
  Controls.appendChild(Pause);
  const controlCircle = document.createElement("div");
  controlCircle.className = "control-circle";
  const pauseImg1 = document.createElement("img");
  const pauseImg2 = document.createElement("img");
  pauseImg1.src = "https://svgshare.com/i/y7X.svg";
  pauseImg2.src = "https://svgshare.com/i/y7X.svg";
  controlCircle.appendChild(pauseImg1);
  controlCircle.appendChild(pauseImg2);
  Pause.appendChild(controlCircle);
  const pauseText = document.createElement("p");
  pauseText.textContent = "Pause";
  Pause.appendChild(pauseText);

  // stop
  const Stop = document.createElement("div");
  Stop.className = "stop";
  Controls.appendChild(Stop);
  const stopControlCircle = document.createElement("div");
  stopControlCircle.className = "control-circle";
  const stopImg = document.createElement("img");
  stopImg.src = "https://svgshare.com/i/y7N.svg";
  stopControlCircle.appendChild(stopImg);
  Stop.appendChild(stopControlCircle);
  const stopText = document.createElement("p");
  stopText.textContent = "Stop";
  Stop.appendChild(stopText);

  // camera
  const Camera = document.createElement("div");
  Camera.className = "camera";
  Controls.appendChild(Camera);
  const cameraControlCircle = document.createElement("div");
  cameraControlCircle.className = "control-circle";
  const camImg = document.createElement("img");
  camImg.src = "https://svgshare.com/i/y7g.svg";
  cameraControlCircle.appendChild(camImg);
  Camera.appendChild(cameraControlCircle);
  const camText = document.createElement("p");
  camText.textContent = "Camera";
  Camera.appendChild(camText);

  // mic
  const Mic = document.createElement("div");
  Mic.className = "mic";
  Controls.appendChild(Mic);
  const micControlCircle = document.createElement("div");
  micControlCircle.className = "control-circle";
  const micImg = document.createElement("img");
  micImg.src = "https://svgshare.com/i/y6Q.svg";
  micControlCircle.appendChild(micImg);
  Mic.appendChild(micControlCircle);
  const micText = document.createElement("p");
  micText.textContent = "Mic";
  Mic.appendChild(micText);

  // trash
  const Trash = document.createElement("div");
  Trash.className = "trash";
  Controls.appendChild(Trash);
  const TrashControlCircle = document.createElement("div");
  TrashControlCircle.className = "control-circle";
  TrashControlCircle.style.backgroundColor = "#4B4B4B";
  TrashControlCircle.style.border = "1px solid #000";
  const trashImg = document.createElement("img");
  trashImg.src = "https://svgshare.com/i/y5r.svg";
  TrashControlCircle.appendChild(trashImg);
  Trash.appendChild(TrashControlCircle);

  // for (let i = 1; i <= 4; i++) {
  //   const button = document.createElement('button');
  //   button.className = 'button';
  //   button.textContent = `Button ${i}`;
  //   buttonContainer.appendChild(button);
  // }

  controlContainer.appendChild(controlContent);
  document.body.appendChild(controlContainer);

  recorder.onstop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  // recorder.ondataavailable = function (event) {
  //   let recordedBlob = event.data;
  //   let url = URL.createObjectURL(recordedBlob);

  //   let a = document.createElement("a");

  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = "screen-recording.webm";

  //   document.body.appendChild(a);
  //   a.click();

  //   document.body.removeChild(a);

  //   URL.revokeObjectURL(url);
  // };

  recorder.ondataavailable = function (event) {
    let recordedBlob = event.data;

    // Create a FormData object to send the blob as a file
    let formData = new FormData();
    formData.append("video", recordedBlob, "screen-recording.webm");

    // Make a POST request to your API endpoint
    fetch("https://your-api-endpoint.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // You can handle the response from the server here if needed
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("requesting recording");

    sendResponse(`processed: ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 9999999999,
          height: 9999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
      });
  }

  if (message.action === "stopvideo") {
    console.log("stopping video");
    sendResponse(`processed: ${message.action}`);
    if (!recorder) return console.log("no recorder");

    recorder.stop();
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.requested == "createDiv") {
    //Code to create the div
    sendResponse({ confirmation: "Successfully created div" });
  }
});
