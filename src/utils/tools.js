function formatDate(time,format='YY-MM-DD hh:mm:ss'){
	var date = new Date(time);

	var year = date.getFullYear(),
		month = date.getMonth()+1,//月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	var preArr = Array.apply(null,Array(10)).map(function(elem, index) {
		return '0'+index;
	});

	var newTime = format.replace(/YY/g,year)
						.replace(/MM/g,preArr[month]||month)
						.replace(/DD/g,preArr[day]||day)
						.replace(/hh/g,preArr[hour]||hour)
						.replace(/mm/g,preArr[min]||min)
						.replace(/ss/g,preArr[sec]||sec);

	return newTime;			
}

export function timeFormat(timestamp) {
  timestamp = new Date(timestamp);
  let mistiming = Math.round((Date.now() - timestamp) / 1000);
  if(mistiming <= 1) return "刚刚"
  let arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  if(mistiming < 86400)
  {
    for (let i = 0; i < arrn.length; i++) {
        let inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
            return inm + arrr[i] + '前';
        }
    }
  }else if(mistiming < 31536000){
    return formatDate(timestamp, 'MM-DD hh:mm')
  }else{
    return formatDate(timestamp, 'YY-MM-DD')
  }
}

export function isOnBottom(offset = 200){
  //变量scrollTop是滚动条滚动时，距离顶部的距离
  let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
  //变量windowHeight是可视区的高度
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //变量scrollHeight是滚动条的总高度
  let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    //滚动条到底部的条件
    if(scrollTop+windowHeight+offset > scrollHeight){
    //到了这个就可以进行业务逻辑加载后台数据了
      return true;
    }else{
      return false;
    } 
  }

  