export function timeFormat(timestamp) {
  var mistiming = Math.round((Date.now() - timestamp) / 1000);
  if(mistiming <= 1) return "刚刚"
  var arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (var i = 0; i < arrn.length; i++) {
      var inm = Math.floor(mistiming / arrn[i]);
      if (inm != 0) {
          return inm + arrr[i] + '前';
      }
  }
}