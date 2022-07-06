<template>
  <div 
  class="image-view" 
  @touchstart.stop="handleTouchStart"
  @touchmove.stop="handleTouchMove"
  @touchend.stop="handleTouchEnd"
  @mousedown.stop="handleTouchStart($event, 'm')"
  @mousemove.stop="handleTouchMove($event, 'm')"
  @mouseup="handleTouchEnd($event, 'm')"
  @mouseout="handleTouchEnd($event, 'm')"
  @scroll="handleScroll"
  @click="handleClick"
  :class="{
    hidden: !store.state.model.imageViewFlag
  }"
  :style="{
    background: 'rgba(0,0,0,0.96)',
    top: flag ? 0 : position.top + 'px',
    left: flag ? 0 :  position.left+ 'px',
    right: flag ? 0 :  screenWidth - position.right + 'px',
    bottom: flag ? 0 :  screenHeight - position.bottom + 'px',
    transition: flag || opening ? 'transform 0s, top .3s ease, right .3s ease, left .3s ease, bottom .3s ease, opacity .3s ease' : '',
  }"
  >
    <div 
    class="arrow" 
    v-if="store.state.data.imageViewPics.length > 1 && flag"
    :class="{
      hidden: transform.scale > 1
    }"
    >
      <el-icon @click.stop="next(-1)"><ArrowLeftBold /></el-icon>
      <el-icon @click.stop="next(1)"><ArrowRightBold /></el-icon>
    </div>
    <span v-if="store.state.data.imageViewPics.length > 1 && flag">{{store.state.data.imageViewIndex + 1}}/{{store.state.data.imageViewPics.length}}</span>
    <div 
    class="image-container"
    :style="{
      transform: 'translate('+ x +'px)',
      transition: (isMoving || opened) ? '' : 'transform .3s ease',
      width: ((flag && !opening) || (pics.length > 1)) ? 'fit-content' : '100%',
    }">
      <div 
      class="image-box"
      v-for="(item, index) in pics"
      :style="{
        width: (flag && !opening) || (pics.length > 1) ? '100vw' : '100%',
        marginRight: (flag && !opening || pics.length > 1) ? '50px' : 0
      }"
      :key="item">
          <transition name="el-fade-in">
          <img
          :src="item + store.state.data.imageViewPicQuery"
          v-show="!picShow[index]"
          :style="{
            transform: index === store.state.data.imageViewIndex ? 'matrix(' + transform.scale + ', 0, 0, ' + transform.scale + ', ' + transform.x + ', ' + transform.y +  ')' : '',
            transition: isMoving || opened ? '' : 'transform .3s ease',
            width: '100%',
            height: '100%',
            transformOrigin: '0 0',
          }"
          />
          </transition>
          <div 
            style="color: white; position: absolute; width: 100vw; text-align: center; font-size: 30px"
            :class="{hidden: picShow[index]}"
          >
          <el-icon>
            <Loading class="loading" />
          </el-icon>
          </div>

          <img
          :src="index === store.state.data.imageViewIndex || picShow[index] || picPassed[index] ? item : '#'"
          loading="lazy"
          :ref="(el) => setRef(el, index)"
          @load="showPic(index)"
          :style="{
            transform: index === store.state.data.imageViewIndex ? 'matrix(' + transform.scale + ', 0, 0, ' + transform.scale + ', ' + transform.x + ', ' + transform.y +  ')' : '',
            transition: isMoving || opened ? '' : 'transform .3s ease',
            maxWidth: '100vw',
            maxHeight: '100%',
            transformOrigin: '0 0',
            position: 'absolute'
          }"
          />

      </div>
    </div>
  </div>
</template>

<script setup>
import { Loading, ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'

const { ref, reactive }=require("@vue/reactivity");
const { watch, computed }=require("@vue/runtime-core");
const { useStore }=require("vuex");

const store = useStore();
const picShow = reactive(new Array(9).fill(false));
const picPassed = reactive(new Array(9).fill(false)); // 是否划过该图片
const bgOpacity = ref('0.9')
const pics = store.state.data.imageViewPics
// v-for中使用ref
const curImgRef = ref([]);
const setRef = (el, index)=>{
  curImgRef.value[index] = el
}
let screenWidth  = document.documentElement.clientWidth;
let screenHeight  = document.documentElement.clientHeight;

const x = ref(0); // 总体横向距离
const distance = reactive({start: 0, stop: 0}) // 双指缩放时的distance

// 当前图片的transform
const transform = reactive({
  x: 0,
  y: 0,
  singleX: 0,
  singleY:0,
  scale: 1,
  lastScale: 1,
  maxScale: 3,
  yFlag: false
})

const isMoving = ref(false);
const opening = ref(true);
const touchStart = reactive({x: 0, y: 0, offset: 0})
const tempTouchStart = reactive({x: 0, y: 0}) // 用于移动

let touchStart1 = {x: undefined, y: undefined} // 双指开始标记
let touchStart2 = {x: undefined, y: undefined}
let mouseDownState = false; // 鼠标是否按下
let oneClick = { // 记录鼠标一次按下到松开的时间和距离
  time: new Date(),
  x: 0,
  y: 0,
  distance: 0
}
const transformOrigin = reactive({x: 0, y: 0}) // 第一个记录的是双指缩放开始时的origin，第二个记录的是移动时的origin（两个用处不一样）
const transformOrigin2 = reactive({x: 0, y: 0})

const setOrigin = (p, p2, res)=>{
  let rect = curImgRef.value[index.value].getBoundingClientRect();
  console.log(rect, curImgRef.value)
  res.x=((p.x + p2.x)/2 - rect.left)/transform.scale
  res.y=((p.y + p2.y)/2 - rect.top)/transform.scale
  }

const handleTouchStart = (e, type)=>{
  // 状态置位
  isMoving.value = true;
  touchStart.offset = x.value;
  // 鼠标
  if(type === 'm'){
    mouseDownState = true;
    oneClick.time = new Date();
    oneClick.x = e.pageX;
    oneClick.y = e.pageY;
    touchStart.x = e.pageX;
    touchStart.y = e.pageY;
    tempTouchStart.x = e.pageX;
    tempTouchStart.y = e.pageY;
  }else{ //手指
    touchStart.x = e.touches[0].pageX;
    touchStart.y = e.touches[0].pageY;
    tempTouchStart.x = e.touches[0].pageX;
    tempTouchStart.y = e.touches[0].pageY;  
    // 双指
    if(e.touches.length === 2){
      // 记录开始时的距离和中心点
      touchStart1.x = e.touches[0].clientX;
      touchStart1.y = e.touches[0].clientY;
      touchStart2.x = e.touches[1].clientX;
      touchStart2.y = e.touches[1].clientY;
      distance.start = getDistance(touchStart1, touchStart2) // 开始时的距离
      setOrigin(touchStart1, touchStart2, transformOrigin) // 中点为缩放中心
    }
  }
}
const handleTouchMove = (e, type)=>{
  // 阻止滚动事件
  e.preventDefault()
  if(type === 'm'){
    if(!mouseDownState || e.buttons === 0) return;
    // 放大以后的移动
    if(transform.scale !== 1){
      if(transform.yFlag){transform.y += e.pageY - tempTouchStart.y;}
      transform.x += e.pageX - tempTouchStart.x;
      transform.singleX = transform.x;
      transform.singleY = transform.y;
      // 记录上一次移动事件
      tempTouchStart.x = e.pageX;
      tempTouchStart.y = e.pageY;
    }else{
      x.value = touchStart.offset + e.pageX - touchStart.x;
    }
    return;
  }
  // 双指缩放
  if(e.touches.length === 2){
    let touchMovePoint2 = {
      x: e.touches[1].clientX,
      y: e.touches[1].clientY
    }
    let touchMovePoint = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    distance.stop = getDistance(touchMovePoint2, touchMovePoint)
    setOrigin(touchMovePoint, touchMovePoint2, transformOrigin2)
    transformOrigin2.x = 2*transformOrigin.x - transformOrigin2.x
    transformOrigin2.y = 2*transformOrigin.y - transformOrigin2.y
    setTransform(transform.lastScale * (distance.stop / distance.start))
  }
  // 单指移动
  else
  {
    // 放大以后的移动
    if(transform.scale !== 1){
      if(transform.yFlag){transform.y += e.touches[0].pageY - tempTouchStart.y;}
      transform.x += e.touches[0].pageX - tempTouchStart.x;
      transform.singleX = transform.x;
      transform.singleY = transform.y;
      // 记录上一次移动事件
      tempTouchStart.x = e.touches[0].pageX;
      tempTouchStart.y = e.touches[0].pageY;
    }else{
      x.value = touchStart.offset + e.touches[0].pageX - touchStart.x;
    }
  }
}
const handleTouchEnd = (e, type)=>{

  if(type === 'm' && e.type==='mouseout' && (!mouseDownState || e.buttons === 0)) return;

  // 记录改变前的页面
  let _index = store.state.data.imageViewIndex;
  // 控制动画
  isMoving.value = false;
  // 关闭鼠标状态
  mouseDownState = false;
  // 松手时的状态
  let point = {
    x: type === 'm' ? e.pageX : e.changedTouches[0].pageX,
    y: type === 'm' ? e.pageY : e.changedTouches[0].pageY,
    length: type === 'm' ? 1 : e.changedTouches.length,
  }
  oneClick.time = new Date() - oneClick.time // 单次鼠标按下时长
  oneClick.distance = getDistance(oneClick, point)
  if(transform.scale === 1 && point.length === 1)
  {
    // 判断左右
    if(point.x - touchStart.x > screenWidth/4 && store.state.data.imageViewIndex > 0){
      store.state.data.imageViewIndex--;
    }else if(point.x - touchStart.x < -1*screenWidth/4 && store.state.data.imageViewIndex < pics.length - 1){
      store.state.data.imageViewIndex++;
    }
    // 改变x
    x.value = (-1 * store.state.data.imageViewIndex * (screenWidth + 50))
    if(_index !== store.state.data.imageViewIndex)
    {
      transform.scale = 1;
    }
    touchStart.x = point.x,
    touchStart.y = point.y;
  }else{
    transform.lastScale = transform.scale;
  }
  judgeBoder()
}

// 越界判断
const judgeBoder = ()=>{
  let rect = curImgRef.value[index.value].getBoundingClientRect();
  if(transform.yFlag){
    if(rect.top >= 0) transform.y -= rect.top
    if(rect.bottom <= screenHeight) transform.y += ( screenHeight - rect.bottom )
  } 
  if(transform.scale > 1){
    if(rect.left >= 0) transform.x -= rect.left
    if(rect.right <= screenWidth) transform.x += (screenWidth - rect.right)
  }
}
// 设置动画
const setTransform = (scale)=>{

    // console.log("###",transformOrigin2)
    if(scale > transform.maxScale) scale = transform.maxScale;
    else if( scale <= 1 ) scale = 1;
    transform.scale = scale;
    // 判断放大以后高度是否会超过屏幕从而判定是否可以纵向移动
    if(curImgRef.value[index.value].offsetHeight * scale > screenHeight){
      transform.yFlag = true; // 纵向移动标识
      let overSize = (curImgRef.value[index.value].offsetHeight*scale - screenHeight)/2/scale; // 超出的距离（已经换算为放大前）
      if(transformOrigin2.y > curImgRef.value[index.value].offsetHeight/2 + overSize){
        transform.y =  - (curImgRef.value[index.value].offsetHeight/2 + overSize) * (transform.scale - 1); 
      }else if(transformOrigin2.y < curImgRef.value[index.value].offsetHeight/2 - overSize){
        transform.y =  - (curImgRef.value[index.value].offsetHeight/2 - overSize) * (transform.scale - 1); 
      }else{
        transform.y =  - (transformOrigin2.y * (transform.scale - 1)); 
      }
    }else{
      transform.yFlag = false; // 禁止y轴方向的移动
      transform.y =  - (curImgRef.value[index.value].offsetHeight/2) * (transform.scale - 1); 
    }

    transform.x =  - (transformOrigin2.x ) * (transform.scale - 1)
}

// 双击放大
let lastClickTime = new Date();
let clickTimeOut;
let clickPoint = {x: 0, y: 0};

const handleClick= (e)=>{
  e.preventDefault()
  // 双击
  if(new Date() - lastClickTime < 300 && getDistance({x: e.clientX, y: e.clientY}, clickPoint) < 50){
    let scale = 1;
    transform.maxScale = curImgRef.value[index.value].naturalWidth/curImgRef.value[index.value].clientWidth
    let secondScale = 1 + (transform.maxScale - 1)/3;
    if(transform.scale === 1){
      scale = secondScale
    }else if(transform.scale === secondScale)
    {
      scale = transform.maxScale;
    }else{
      scale = 1
    }
    // 缩小时的中心点和放大时一致
    if(scale !== 1 ){
      setOrigin({
        x: e.clientX,
        y: e.clientY
      }, clickPoint, transformOrigin2)
    }
    setTransform(scale)
    transform.lastScale = transform.scale;
    clearTimeout(clickTimeOut)
  }else if(oneClick.time < 200 && oneClick.distance < 10){
    clickTimeOut = setTimeout(()=>{
      if(flag.value){history.back()}
      store.state.model.imageViewFlag = false;
    }, 300)
    lastClickTime = new Date();
    clickPoint.x = e.clientX
    clickPoint.y = e.clientY
  }
}
// 当前imageView打开状态
const flag = computed(()=>{
  return store.state.model.imageViewFlag;
})
// 当前展示图片index
const index = computed(()=>{
  return store.state.data.imageViewIndex
})
const position = computed(()=>{
  return store.state.data.imageViewPosition
})


// 控制缩放以及切换视图的不同的动画速度（防止打开以后还在滚动）
const opened = ref(false);
const back = ()=>{
  store.state.model.imageViewFlag = false
}
// 计算两点距离
const getDistance = (p, p2)=>{
  return Math.hypot(p2.y - p.y, p2.x - p.x)
}
// 上一张下一张
const next = (num)=>{
  if(num === 1 && index.value < pics.length - 1){
    store.state.data.imageViewIndex ++;
  }else if(num === -1 && index.value > 0)
  {
    store.state.data.imageViewIndex --;
  }
}

let openingTimeOut;
// 当打开预览窗口时
watch(flag, (newV)=>{
  // console.log(position.value)
  transform.scale = 1;
  transform.lastScale = 1;
  transform.x = 0;
  transform.y = 0;
  screenWidth  = document.documentElement.clientWidth;
  screenHeight  = document.documentElement.clientHeight;  
  setTimeout(()=>{
    transform.maxScale = (curImgRef.value[index.value].naturalWidth/curImgRef.value[index.value].clientWidth)
    picShow[index.value] = curImgRef.value[index.value].complete;
    }, 500)
  clearTimeout(openingTimeOut)
  opening.value = true;
  openingTimeOut = setTimeout(() => {
    opening.value = false;
    x.value = -(store.state.data.imageViewIndex * (screenWidth + 50))
  }, 300);
  if(newV){
    opened.value =  true;
    setTimeout(() => {
      opened.value =  false;
    }, 50);
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', back, false);//false阻止默认事件
    bgOpacity.value = '0.9'
  }else{
    bgOpacity.value = '0'
    window.removeEventListener('popstate', back, false);//false阻止默认事件
  }
})
// 切换图片
watch(index, ()=>{
  transform.scale = 1;
  transform.lastScale = 1;
  transform.x = 0;
  transform.y = 0;
  x.value = (-1 * store.state.data.imageViewIndex * (screenWidth + 50))
  picPassed[index.value] = true;
  setTimeout(()=>{
    transform.maxScale = (curImgRef.value[index.value].naturalWidth/curImgRef.value[index.value].clientWidth)
    picShow[index.value] = curImgRef.value[index.value].complete;
    // let rect = curImgRef.value[index.value].getBoundingClientRect();
    // store.state.data.imageViewPosition.top = rect.top;
    // store.state.data.imageViewPosition.bottom = rect.bottom;
    // store.state.data.imageViewPosition.left = rect.left;
    // store.state.data.imageViewPosition.right = rect.right;
  }, 300)
})
// 图片已经加载完成
const showPic = (index)=>{
  picShow[index] = true;
}
</script>

<style lang="scss" scoped>
.image-view{
  position: fixed;
  z-index: 9999;
  overflow: hidden;
  @keyframes loading {
    0%{
      transform: rotate(0deg);
    }
    50%{
      transform: rotate(180deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .loading{
    animation: loading 2s linear infinite ;
    transition: .3s;
  }
  .arrow{
    position: fixed;
    top: 48%;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    color: white;
    z-index: 10000;
    .el-icon{
      background: rgba($color: #000000, $alpha: 0.4);
      padding: 10px;
      border-radius:  50%;
      transition: .3s;
      &:hover{
        background: rgba($color: #000000, $alpha: 0.7);
        cursor: pointer;
      }
    }
  }
  @media (max-width: 500px){
    .arrow{
      .el-icon{
        padding: 5px;
        font-size: 20px;
      }
    }
  }
  span{
    position: absolute;
    padding-top: 10px;
    text-align: center;
    color: white;
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    z-index: 10000;
    padding-bottom: 10px;
    background: rgba($color: #000000, $alpha: .5);
  }
  .image-container{
    height: 100%;
    width: fit-content;
    display: flex;
    .image-box{
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        object-fit: contain;
        box-sizing: border-box;
      }
    }
  }
}
.hidden{
  opacity: 0;
  pointer-events: none;
  background: transparent;
  border-radius: 10px;
  // transition: .3s ease;
  img{
    // object-fit: cover !important; 
    // width: 100vw;
  }
}
</style>