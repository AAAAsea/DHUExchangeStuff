<template>
  <div class="post-card"  
    @touchstart="handleTouchStart"  
    @touchmove="handleTouchMove" 
    ref='postCardRef'
  >
    <el-icon :style="{position: 'absolute', top: '15px', right: '10px', color:'#eee', transform: 'rotate('+ (isFold ? 0 : 180) +'deg)', transition: '0.3s'}" @click.stop="isFold = !isFold" ><arrow-down-bold /></el-icon>
    <div class="header">
      <img :src="headerUrl" alt="">
      <div class="title">
        <h4>{{nickname ?? username}}</h4>
        <p>{{timeFormat(new Date(createTime).getTime())}}</p>
      </div>
    </div>
    <!-- <router-link :to="'/detail/'+post.id"> -->
      <div class="sub">
        <h3>{{title}}</h3>
        <p :class="{fold: isFold}">{{content}}</p>
      </div>
    <!-- </router-link> -->
    <div class="footer">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        :style="{margin: '0  10px 10px 0'}"
        :disable-transitions="false"
        type="info"
        color="transparent"
        size="small"
        effect="plain"
        class="tag"
        round
      >
        #{{ tag }}
      </el-tag>
      <div class="toolbar">

      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDownBold } from '@element-plus/icons-vue' 
import { ref } from '@vue/reactivity'
import { timeFormat } from '@/utils/tools'
import { toRefs } from 'vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ['post','user'],
  components: {
    ArrowDownBold
  },
  setup(props){
    const isFold = ref(true)
    const postCardRef = ref('')
    const dynamicTags = ['泡面','啤酒','水','女朋友','HuaziHuazi']
    // const dynamicTags = ['你好你好你好你好你好','你好你好你好你好你好','你好你好你好你好你好','你好你好你好你好你好','你好你好你好你好你好']

    let canRipplesFlag = true; // 每当点击发生禁止点击，防止点击过快以及多指点击
    let isRipplesFlag = false; // 100ms内滑动取消不触发波纹效果
    function handleTouchStart(e){
      if(!canRipplesFlag) return;
      isRipplesFlag = true;
      setTimeout(() => {
        if(isRipplesFlag && canRipplesFlag){
          canRipplesFlag = false;
          let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
          let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
          let x = e.changedTouches[0].clientX + scrollX - postCardRef.value.offsetLeft;
          let y = e.changedTouches[0].clientY + scrollY - postCardRef.value.offsetTop - 65;
          let ripples = document.createElement('span')
          ripples.classList.add("ripples");
          ripples.style.left = x + 'px';
          ripples.style.top = y + 'px';
          postCardRef.value.appendChild(ripples)
          setTimeout(() => {
            canRipplesFlag = true;
          }, 100);
          setTimeout(()=>{
            ripples.remove()
          },1000)
        }
      }, 100);
    }

    function handleTouchMove(){
      isRipplesFlag = false;
    }
    
    return{
      dynamicTags,
      isFold,
      ...toRefs(props.user),
      ...toRefs(props.post),
      timeFormat,
      postCardRef,
      handleTouchStart,
      handleTouchMove
    }
  }
}
</script>

<style lang="scss" scoped>


.post-card{
  overflow: hidden;
  position: relative;
  background: var(--post-card-bg);
  @media  screen and(min-width: 1200px) {
    border-radius: 5px;
    border: 1px solid var(--post-card-border);
  }
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 1em 0px 1em;
  margin-bottom: 0px;
  box-sizing: border-box;
  transition: 0.2s ease;
  color: var(--main-text);
  @media screen and(min-width: 1200px) {
      &:hover{
      box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
      transform: translateY(-3px);
    }
  }
  .header{
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break:break-all; 
    margin-bottom: 18px;
    img{
      width: 45px;
      border-radius: 50%;
      margin-right: 2%;
      &:hover{
        opacity: 0.8;
      }
    }
    .title{
      
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p{
        color: var(--secondary-text);
        margin-top: 5px;
        font-size: 0.7em;
      }
    }
  }
  .sub{
      transition: 0.3s;
      color: var(--main-text);
    p{
      font-size: var(--post-card-font-size);
      margin: 10px 0;
      word-wrap:break-word;
      line-height: 1.5em;
      transition: 0.3s;
    }
    .fold{
        // 限制三行字数
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
  }
  .footer{
    font-size: var(--post-card-footer-font-size);
  }
}
</style>