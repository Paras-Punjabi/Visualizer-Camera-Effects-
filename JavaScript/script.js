import { toGrayScale, toInvertScale, leftMirror, WIDTH, HEIGHT, toGridView, brightness, blackAndWhite, redScale, greenScale, blueScale, righMirror, topMirror, bottomMirror, upsideDown, mirrorImage, switchHorizontal, quadMirror, switchVertical, sepia, ratio} from "./Filters.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cameraBtn = document.getElementById("cameraBtn");
const snapBtn = document.getElementById("snapBtn");
const recordingBtn = document.getElementById("recordingBtn");
const hamburgerIcon = document.querySelector(".hamburgerIcon");
const sidebar = document.querySelector(".sidebar");
const filtersContainer = document.querySelector(".filters");
const click = new Audio("../click.mp3")

let video =  document.createElement("video");
let videoStream = null;
let downloadVideo = document.querySelector(".download-video")

let recordVideo = document.querySelector("video");
let videoDiv = document.querySelector(".videoDiv")
recordVideo.width = WIDTH
recordVideo.height = HEIGHT

let interval = null;
let type = "Normal";
let recordingStream = canvas.captureStream();
let mediaRecorder =new MediaRecorder(recordingStream,{mimeType: "video/webm; codecs=vp9"});
let chunks = []
let isRecording = false

canvas.width = WIDTH;
canvas.height = HEIGHT;

window.onresize=()=>{
  canvas.width = window.innerWidth/2
  canvas.height = ratio*canvas.width
}

const filters = [
  {
    name: "Normal",
    function: function () {
      type = "Normal";
    },
  },
  {
    name: "Gray Filter",
    function: function () {
      type = "Gray Filter";
    },
  },
  {
    name: "Sepia",
    function: function () {
      type = "Sepia";
    },
  },
  {
    name: "Invert Filter",
    function: function () {
      type = "Invert Filter";
    },
  },
  {
    name: "Right Mirror",
    function: function () {
      type = "Right Mirror";
    },
  },
  {
    name: "Left Mirror",
    function: function () {
      type = "Left Mirror";
    },
  },
  {
    name: "Top Mirror",
    function: function () {
      type = "Top Mirror";
    },
  },
  {
    name: "Bottom Mirror",
    function: function () {
      type = "Bottom Mirror";
    },
  },
  {
    name: "Mirror Image",
    function: function () {
      type = "Mirror Image";
    },
  },
  {
    name: "Upside-Down",
    function: function () {
      type = "Upside-Down";
    },
  },
  {
    name: "Switch Horizontal",
    function: function () {
      type = "Switch Horizontal";
    },
  },
  {
    name: "Switch Vertical",
    function: function () {
      type = "Switch Vertical";
    },
  },
  {
    name: "Grid View",
    function: function () {
      type = "Grid View";
    },
  },
  {
    name: "Quad Mirror",
    function: function () {
      type = "Quad Mirror";
    },
  },
  {
    name: "Brightness",
    function: function () {
      type = "Brightness";
    },
  },
  {
    name: "Black And White",
    function: function () {
      type = "Black And White";
    },
  },
  {
    name: "Red Scale",
    function: function () {
      type = "Red Scale";
    },
  },
  {
    name: "Green Scale",
    function: function () {
      type = "Green Scale";
    },
  },
  {
    name: "Blue Scale",
    function: function () {
      type = "Blue Scale";
    },
  },
];

function cameraEffect(typeOfEffect) {
  switch (typeOfEffect) {
    case "Normal":
      break;
    case "Gray Filter":
      toGrayScale(ctx);
      break;
    case "Invert Filter":
      toInvertScale(ctx);
      break;
    case "Left Mirror":
      leftMirror(ctx);
      break;
    case "Right Mirror":
      righMirror(ctx);
      break;
    case "Bottom Mirror":
      bottomMirror(ctx);
      break;
    case "Top Mirror":
      topMirror(ctx);
      break;
    case "Mirror Image":
      mirrorImage(ctx);
      break;
    case "Upside-Down":
      upsideDown(ctx);
      break;
    case "Brightness":
      brightness(ctx, 100);
      break;
    case "Grid View":
      toGridView(ctx, 4, 4);
      break;
    case "Black And White":
      blackAndWhite(ctx, 127);
      break;
    case "Red Scale":
      redScale(ctx);
      break;
    case "Green Scale":
      greenScale(ctx);
      break;
    case "Blue Scale":
      blueScale(ctx);
      break;
    case "Switch Horizontal":
      switchHorizontal(ctx);
      break;
    case "Switch Vertical":
      switchVertical(ctx);
      break;
    case "Quad Mirror":
      quadMirror(ctx);
      break;
    case "Sepia":
      sepia(ctx);
      break;
  }
}

window.onresize=()=>{
  canvas.width = window.innerWidth/2
  canvas.height = ratio*canvas.width 
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "#CCCCCC";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

ctx.clearRect(0, 0, WIDTH, HEIGHT);
ctx.fillStyle = "#CCCCCC";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

let faceMode = true
function startWebCam() {
  let promise = window.navigator.mediaDevices.getUserMedia({ video: {
    facingMode:faceMode?"user":"environment"
  },
  audio:true });

  promise.then((stream) => {
    video.srcObject = stream;
    video.muted = true
    console.log(navigator.mediaDevices.getSupportedConstraints());

    for(let item of stream.getAudioTracks())
    mediaRecorder.stream.addTrack(item)

    video.play();
    videoStream = stream;
    snapBtn.disabled = false;
    recordingBtn.disabled = false;
    playVideo()
  });

  promise.catch(() => {
    ctx.font = "60px monospace";
    ctx.strokeStyle = "black";
    ctx.strokeText(
      "Cannot Access Camera",
      60,
      canvas.height / 2,
      canvas.width - 20
    );
    ctx.stroke();
    snapBtn.disabled = true;
    recordingBtn.disabled = true;
  });
}


function playVideo(){
  ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
  mirrorImage(ctx);
  cameraEffect(type);
  interval = window.requestAnimationFrame(playVideo)
}

function stopWebCam() {
  if(interval){
    window.cancelAnimationFrame(interval)
  }
  if (videoStream) {
    video.pause();
    video.remove();
    videoStream.getTracks().forEach((s) => {
      s.stop();
    });
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    snapBtn.disabled = true;
    recordingBtn.disabled = true;
    type = "Normal";

    if(isRecording){
      recordingBtn.innerHTML = "Start Recording"
      isRecording = false
      mediaRecorder.stop()
      recordingStream = canvas.captureStream();
      mediaRecorder =new MediaRecorder(recordingStream,{mimeType: "video/webm; codecs=vp9"});
    }

  }
}

snapBtn.addEventListener("click", () => {
  ctx.save();
  ctx.scale(1, -1);
  let dataUrl = canvas.toDataURL({ type: "image/png" });
  let link = document.createElement("a");
  link.href = dataUrl;
  click.play();
  link.download = "photo.png";
  link.click();
  ctx.restore();
});


recordingBtn.addEventListener("click", (e) => {
  if(isRecording === false){
    isRecording=true
    mediaRecorder.start()
    recordingBtn.innerHTML = "Stop Recording"
    mediaRecorder.ondataavailable=(e)=>{
      chunks.push(e.data)
    }
  }

  else if(isRecording === true){
    isRecording = false
    recordingBtn.innerHTML = "Start Recording"
    mediaRecorder.stop()
  }
});

mediaRecorder.onstop = generateVideo
let url;
function generateVideo(){
  recordVideo.style.display = "block"
  videoDiv.style.display = "block";
  let blob = new Blob(chunks,{type:"video/webm"})
  url = URL.createObjectURL(blob)
  chunks = []
  recordVideo.src = url
  recordVideo.play()
  window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

downloadVideo.addEventListener("click",()=>{
  let a = document.createElement("a")
  a.download = "video.webm"
  a.href = url
  a.click();
})


cameraBtn.addEventListener("click", (e) => {
  if (e.target.innerHTML == "Start Camera") {
    e.target.innerHTML = "Stop Camera";
    startWebCam();
  } else if (e.target.innerHTML == "Stop Camera") {
    e.target.innerHTML = "Start Camera";
    stopWebCam();
  }
});


// make filter buttons in sidebar
filters.forEach((item) => {
    let btn = document.createElement("div");
    btn.classList.add("filterBtn");
    if (type === item.name) {
      btn.classList.add("active");
    }
    btn.textContent = item.name;
    btn.onclick = (e) => {
      item.function();
      changeSelection(e);
    };
    filtersContainer.appendChild(btn);
  });
  
function changeSelection(e) {
    Array.from(filtersContainer.children).forEach((item) => {
        item.classList.remove("active");
    });
    e.target.classList.add("active");
}

hamburgerIcon.addEventListener("click", () => {
  sidebar.classList.add("sidebar-animate");
  sidebar.classList.remove("closeSidebar");
});

document.querySelector(".closeBtn").addEventListener("click", () => {
  sidebar.classList.add("closeSidebar");
  sidebar.classList.remove("sidebar-animate");
});

document.getElementById("settings").onclick = () => {
  canvas.requestFullscreen();
};
