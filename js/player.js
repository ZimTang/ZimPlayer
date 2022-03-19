const audio = document.querySelector("#audio");
const songName = document.querySelector("#songName");
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

const musicNameBySrc = getName(window.decodeURI(audio.src));
songName.innerHTML = musicNameBySrc;

// 根据src获取歌曲名称
function getName(src) {
  const arr = src.split("/");
  const lastIndex = arr[arr.length - 1].lastIndexOf(".mp3");
  return arr[arr.length - 1].substring(0, lastIndex);
}

// 播放的回调
mainControl.addEventListener("click", () => {
  // todo:fix 当重新开始点击播放时，时间会出现问题
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

/**
 * changeNum
 * @param {*} type add or minus
 * @param {*} num 变化值
 * @returns (audio) => { audio.currentTime += num or audio.currentTime -= num }
 */
function changNum(type, num) {
  if (type === "add") {
    return (audio) => {
      audio.currentTime += num;
    };
  } else if (type === "minus") {
    return (audio) => {
      audio.currentTime -= num;
    };
  }
}

// 快退的回调
leftControl.addEventListener("click", changNum("minus", 5)(audio));
// 快进的回调
rightControl.addEventListener("click", changNum("add", 5)(audio));

// 改变时间
function changeCurrentTime() {
  songTime.innerHTML = `${timeToMinute(
    audio.currentTime
  )}&nbsp;|&nbsp;${timeToMinute(audio.duration)}`;
  processYet.style.width =
    changeProcessYetWidth(
      parseInt(process.style.width),
      audio.duration,
      audio.currentTime
    ) + "px";
}

// 时间变化的回调
audio.addEventListener("timeupdate", changeCurrentTime);
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

// 点击音量条
voidProcess.addEventListener("click", dragVolumeProcess);
voidProcessYet.addEventListener("click", dragVolumeProcess);

// 点击音量条的回调
function dragVolumeProcess(e) {
  const currentVolumeWidth = e.clientX - voidProcess.getBoundingClientRect().x;
  voidProcessYet.style.width = currentVolumeWidth + "px";
  console.log(voidProcessYet.style.width);
  audio.volume =
    parseInt(voidProcessYet.style.width) / parseInt(voidProcess.style.width);
}

// 点击进度条
process.addEventListener("click", dragTimeProcess);
processYet.addEventListener("click", dragTimeProcess);

// 点击进度条的回调
function dragTimeProcess(e) {
  // 获取鼠标位置
  console.log(e.clientX);
  // 获取进度条位置
  console.log(process.getBoundingClientRect());
  // 实现拉动效果
  const currentWidth = e.clientX - process.getBoundingClientRect().x;
  processYet.style.width = currentWidth + "px";
  audio.currentTime =
    (parseInt(processYet.style.width) / parseInt(process.style.width)) *
    audio.duration;
}
