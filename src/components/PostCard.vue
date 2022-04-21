<template>
  <div class="post-card">
    <el-icon :style="{position: 'absolute', top: '15px', right: '10px', color:'#eee', transform: 'rotate('+ (isFold ? 0 : 180) +'deg)', transition: '0.3s'}" @click.stop="isFold = !isFold" ><arrow-down-bold /></el-icon>
    <div class="header">
      <img :src="headerUrl" alt="">
      <div class="title">
        <h4>{{username}}</h4>
        <p>{{timeFormat(new Date(createTime).getTime())}}</p>
      </div>
    </div>
    <router-link :to="'/detail/'+post.id">
      <div class="sub">
        <h3>{{title}}</h3>
        <p :class="{fold: isFold}">{{content}}</p>
      </div>
    </router-link>
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
    const dynamicTags = ['泡面','啤酒','水','女朋友','HuaziHuazi']
    return{
      dynamicTags,
      isFold,
      ...toRefs(props.user),
      ...toRefs(props.post),
      timeFormat
    }
  }
}
</script>

<style lang="scss" scoped>
.post-card{
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
  &:hover{
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
    transform: translateY(-3px);
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
    display: flex;
    // justify-content: flex-star;
  }
}
</style>