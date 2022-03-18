const audio = document.querySelector("#audio");

const stopControl = document.querySelector("#stopControl");
const mainControl = document.querySelector("#mainControl");
const leftControl = document.querySelector(".leftControl");
const rightControl = document.querySelector(".rightControl");
const songTime = document.querySelector("#songTime");
const process = document.querySelector("#process");
const processYet = document.querySelector("#processYet");
const voiceEmp = document.querySelector(".voiceEmp");
const voiceFull = document.querySelector(".voiceFull");
const voidProcessYet = document.querySelector("#voidProcessYet");
const voidProcess = document.querySelector("#voidProcess");

// 判断是否拖动
let dragFlag = false;

// 播放的回调
mainControl.addEventListener("click", () => {
  audio.play();
  stopControl.style.display = "block";
  mainControl.style.display = "none";
  // 持续时间
  songTime.innerHTML = `00:00&nbsp;|&nbsp;${timeToMinute(audio.duration)}`;
});

// 暂停的回调
stopControl.addEventListener("click", () => {
  audio.pause();
  stopControl.style.display = "none";
  mainControl.style.display = "block";
});

// 快退的回调
leftControl.addEventListener("click", () => {
  audio.currentTime -= 5;
});

// 快进的回调
rightControl.addEventListener("click", () => {
  audio.currentTime += 5;
});

// 时间改变
audio.addEventListener("timeupdate", () => {
  if (!dragFlag) {
    //   改变时间
    songTime.innerHTML = `${timeToMinute(
      audio.currentTime
    )}&nbsp;|&nbsp;${timeToMinute(audio.duration)}`;
    processYet.style.width =
      changeProcessYetWidth(
        parseInt(process.style.width),
        audio.duration,
        audio.currentTime
      ) + "px";
  } else {
    dragFlag = false;
  }
});

// 静音
voiceEmp.addEventListener("click", () => {
  audio.volume = 0;
});

// 最大音量
voiceFull.addEventListener("click", () => {
  audio.volume = 1;
});

// 音量变化的回调
audio.addEventListener("volumechange", () => {
  voidProcessYet.style.width =
    changeVolumeProcessWidth(parseInt(voidProcess.style.width), audio.volume) +
    "px";
});

// 点击进度条
process.addEventListener("click", (e) => {
  //   获取鼠标位置
  console.log(e.clientX);
  //   获取进度条位置
  console.log(process.getBoundingClientRect());
  //   实现拉动效果
  const currentWidth = e.clientX - process.getBoundingClientRect().x;
  processYet.style.width = currentWidth + "px";
  //   todo
  if (!dragFlag) {
    dragFlag = true;
    audio.currentTime =
      (parseInt(process.style.width) / parseInt(processYet.style.width)) *
      audio.duration;
    console.log(audio.currentTime);
  }
});
