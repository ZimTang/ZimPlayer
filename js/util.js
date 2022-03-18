function timeToMinute(times) {
  var t;
  if (times > -1) {
    var hour = Math.floor(times / 3600);
    var min = Math.floor(times / 60) % 60;
    var sec = times % 60;
    if (hour < 10) {
      t = "0" + hour + ":";
    } else {
      t = hour + ":";
    }

    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec.toFixed(2);
  }
  t = t.substring(3, t.length - 3);
  return t;
}

/**
 * 转换进度条长度
 * @param {*} processWidth 进度条长度
 * @param {*} duration 歌曲持续时间
 * @param {*} currentTime 歌曲当前时间
 * @returns 进度条长度
 */
function changeProcessYetWidth(processWidth, duration, currentTime) {
  return (processWidth / duration) * currentTime;
}

/**
 * 转换音量长度
 * @param {*} processWidth 音量长度
 * @param {*} currentVolume 当前音量
 * @returns 音量长度
 */
function changeVolumeProcessWidth(processWidth, currentVolume) {
  return (processWidth / 1) * currentVolume;
}
