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
        <h4>{{nickName ?? username}}</h4>
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
        v-for="tag in tags"
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
        <span class="iconfont icon-like" :style="{color: likeStatus ? 'var(--primary-color)' : ''}" @click="handleLike">
          <span>{{likeCount + likeStatus}}</span>
        </span>
        <span class="iconfont icon-comment_light" @click="changeFold">
          <span>{{commentCount}}</span>
        </span>
        <span class="iconfont icon-forward"></span>
      </div>
      <div v-if="isComment">
        <div class="comment" >
          <el-input v-model="comment" placeholder="发布你的评论" type="textarea"  :minlength="1" :maxlength="140" :autosize="{ minRows: 1, maxRows: 5 }" show-word-limit></el-input>
          <el-button style="float: right; margin: 10px 0" @click="replyToPost" :disabled="comment.trim() === ''">评论</el-button>
        </div>
        <CommentCard 
          :comments="postDetail.comments" 
          v-if="postDetail.comments" 
          :postId="post.id"
          @on-reply="initComment"
        />
        <div class="loading-comment" v-if="commentCount > 0 && !postDetail.comments" >
            <div v-loading="true" element-loading-background="transparent" element-loading-text="正在获取" ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDownBold } from '@element-plus/icons-vue' 
import { ref } from '@vue/reactivity'
import { timeFormat } from '@/utils/tools'
import { toRefs } from 'vue'
import CommentCard from '@/components/CommentCard.vue'
import { getPostDetail, addComment, changeLikeStatus } from '@/api/post'
import { useStore } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ['post','user','likeStatus'],
  components: {
    ArrowDownBold,
    CommentCard
  },
  setup(props, context){
    const isFold = ref(true)
    const isComment = ref(false)
    const postCardRef = ref('')
    const comment = ref('')
    const isFirstComment = ref(true)
    const postDetail = ref([])
    const store = useStore()
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
    function initComment(){
      getPostDetail({id:props.post.id, offset: 0, limit: 10})
      .then(res=>{
        if(res.code === 20000)
        {
          postDetail.value = res.data;
          postDetail.value.comments.sort((a,b)=>new Date(b.comment.createTime) - new Date(a.comment.createTime))
          postDetail.value.comments.forEach(element => {
            element.replys.sort((a,b)=>new Date(b.reply.createTime) - new Date(a.reply.createTime))
          });
        }else{
          postDetail.value.comments = []
          store.commit('showToast',{
            type: 'error',
            message: res.message ?? "加载失败"
          })
        }
      })
    }
    function changeFold(){
      isComment.value = !isComment.value;
      if(isFirstComment.value && props.post.commentCount > 0) initComment() // 第一次展开发送请求获取评论
      isFirstComment.value = false;
    }
    function replyToPost(){
      addComment({
        id: props.post.id,
        entityId: props.post.id,
        entityType: 1,
        content: comment.value
      }).then(res=>{
        if(res.code === 20000){
          store.commit('showToast',{
            type: "success",
            message: "评论成功",
          })
          initComment()
        }
      })
    }
    function handleLike(){
      
      changeLikeStatus({
        entityType: 1,
        entityId: props.post.id,
        entityUserId: props.user.id
      })
      .then(res=>{
        if(res.code === 20000)
        {
          context.emit('on-changeLikeStatus');
        }
      })
    }
    return{
      isFold,
      ...toRefs(props.user),
      ...toRefs(props.post),
      isComment,
      timeFormat,
      postCardRef,
      handleTouchStart,
      handleTouchMove,
      changeFold,
      comment,
      postDetail,
      replyToPost,
      initComment,
      handleLike
    }
  }
}
</script>

<style lang="scss" >

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
    padding-bottom: 2px;
    font-size: var(--post-card-footer-font-size);
    .tag{
      transition: .2s;
      border-color:  var(--secondary-border) !important;
      color: var(--secondary-text) !important;
      &:hover{
      border-color: var(--primary-color) !important ;
      color: var(--primary-color) !important ;
      }
    }
    .toolbar{
      align-items: center;
      height: 33px;
      display: flex;
      justify-content: space-around;
      .iconfont{
        height: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: var(--toolbar-text);
        transition: .1s;
        &:hover{
          text-shadow: 1px 1px 2px 4px var(--primary-color);
          color: var(--primary-color) !important ;
        }
        span{
          margin-left: 3px;
          font-size: 13px;
        }
      }
    }
    .loading-comment{
      height: 50px;
      margin: 20px 0;
    }
  }
.comment{
  overflow: hidden;
  width: 100%;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-top: 1px solid var(--secondary-bg);
  border-bottom: 1px solid var(--secondary-bg);
  .el-input__count{
      background: transparent;
    }
  .el-textarea__inner {
    box-shadow: none;
    background-color: var(--secondary-bg);
    color: var(--main-text);
    
    &:focus{
      box-shadow: 0 0 0 1px var(--primary-color);
    }
  }
  .el-button{
    background: var(--primary-color);
    color: var(--main-bg);
    border: none;
  }
}

}
</style>