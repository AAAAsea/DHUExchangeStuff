  <template>

  <div class="post-card"  
    @touchstart="'' || handleTouchStart"  
    @touchmove="'' || handleTouchMove" 
    ref='postCardRef'
    v-if="!post?.deleteStatus"
  >
    <!-- 折叠展开 -->
    <el-dialog
      v-model="dialogVisible"
      title="删除"
      :width="store.state.model.modelWidth"
    >
      <span>删除后不可恢复，确定删除？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDeletePost(post)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dropdown
    trigger="click"
    :style="{
      position: 'absolute', 
      top: '15px', 
      right: '10px', 
    }"
    >
      <el-icon
      :style="{
        cursor: 'pointer',
        color: 'var(--main-text)', 
        transition: '0.3s'
        }" 
      >
        <arrow-down-bold />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLike">
            {{(likeStatus || post.likeStatus) ? '取消点赞' : '点赞'}}
          </el-dropdown-item>
          <el-dropdown-item @click="dialogVisible = true" v-if="user.id === store.state.data.user.id">
            删除
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="header" @click="router.push({path: '/home/' + post.id})">
      <router-link :to="/user/+user.id" @click.stop="">
        <img :src="user.headerUrl.replace('/header','/image')  + '?width=100'" alt="">
      </router-link>
      <div class="title">
        <router-link :to="/user/+user.id">
          <h4 @click.stop="">{{user.nickName ?? user.username}}</h4>
        </router-link>
        <p>{{timeFormat(new Date(post.createTime).getTime())}}</p>
      </div>
    </div>
    <div class="sub" @click="router.push({path: '/home/' + post.id})">
      <h3 v-html="post.title"></h3>
      <p :class="{fold: false}">
        <span v-html="post.content.substr(0, isFold ? 140 : undefined )"/>
        <span v-if="isFold && post.content.length > 140">...</span>
        <span 
          @click.stop="isFold = !isFold" 
          v-if="post.content.length > 140" 
          style="color: var(--primary-color); cursor: pointer;"
        >
          {{isFold ? "展开（约" + post.content.length + "字）"  : "收起"}}
        </span>
      </p>
      
      <div class="pics" @click.stop="">
        <!-- 单张照片 -->
        <div class="section1" v-show="post.pictureUrls?.length === 1">
          <div>
            <el-image
            lazy
            :class="{transparent: !show.one}"
            hide-on-click-modal
            @load="picLoaded('one')"
            v-for="(pic, index) in post.pictureUrls"
            :src="pic + '?width=500'"
            :key="pic"
            @click="showImageView($event, post.pictureUrls, index, '?width=500')"
            :preview-src-list="post.pictureUrl"
            style="maxWidth: 100%; maxHeight: 600px;borderRadius: 5px"
            fit="cover"/>
            <el-skeleton 
            style="width: 100%"
            v-show="!show.one"  
            >
              <template #template>
                <el-skeleton-item variant="image" style="width: 300px; height: 300px; opacity: 0.1; color: var(--main-bg); background: black; borderRadius: 5px;" />
              </template>
            </el-skeleton>
          </div>
          
        </div>
        <!-- 多张照片 -->
        <div class="section2"
        :style="'grid-template-columns: repeat(' + (post.pictureUrls.length === 2 || post.pictureUrls.length === 4 ? 2 : 3)  + ', 1fr);'"
        ref="imgSection2Ref" v-show="post.pictureUrls?.length > 1">
          <div 
          class="img-box"
          v-for="(pic, index) in post.pictureUrls"
          :key="pic" 
          >
            <el-image
              lazy 
              @click="showImageView($event, post.pictureUrls, index, '?width=' + 780 / (post.pictureUrls.length === 2 || post.pictureUrls.length === 4 ? 2 : 3))"
              :class="{transparent: !show[pic]}"
              hide-on-click-modal
              @load="picLoaded(pic)"
              :src="pic + '?width=' + 780 / (post.pictureUrls.length === 2 || post.pictureUrls.length === 4 ? 2 : 3)"
              :preview-src-list="post.pictureUrl"
              :initial-index="index"
              :style="{
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  maxHeight: '600px',
                }" 
              fit="cover" />
            <el-skeleton 
              class="el-image"
              animated 
              v-show="!show[pic]">
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 100%; opacity: 0.1; color: var(--main-bg); background: black; borderRadius: 5px;" />
              </template>
            </el-skeleton>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <router-link 
        v-for="tag in post.tags"
        :key="tag.tagId"
        :to="'/tag/' + tag.tagId" 
      >
        <el-tag
          @load="picLoaded('one')"
          :style="{margin: '0  10px 10px 0'}"
          :disable-transitions="false"
          type="info"
          color="transparent"
          size="small"
          effect="plain"
          class="tag"
          round
        >
          #{{tag.tagName || tag}}
        </el-tag>
      </router-link>
      <div class="toolbar">
        <span 
          class="iconfont icon-like" 
          :style="{color: (likeStatus || post.likeStatus) && store.state.data.isLoggedIn ? 'var(--primary-color)' : ''}" 
          @click="handleLike"
        >
          <span>{{post.likeCount}}</span>
        </span>
        <span class="iconfont icon-comment_light" @click="changeFold">
          <span>{{post.commentCount}}</span>
        </span>
        <span class="iconfont icon-forward" @click="shareCopy(post.id)"></span>
      </div>
      <el-collapse-transition>
        <div v-if="isComment">
          <div class="comment" >
            <el-input 
              ref='commentInput'
              v-model="comment" 
              placeholder="发布你的评论" 
              type="textarea"  
              :minlength="1" 
              :maxlength="140" 
              :autosize="{ minRows: 1, maxRows: 5 }" 
              show-word-limit 
              @focus="store.state.model.publishPostFlag = false"  
              @blur="store.state.model.publishPostFlag = true" 
              @keydown.enter="replyToPost" 
            />
            <el-button 
            style="float: right; margin: 10px 0" 
            @click="replyToPost" 
            :disabled="comment.trim() === ''">
              评论
            </el-button>
          </div>
            <el-collapse-transition>
              <CommentCard 
                :comments="postDetail.comments" 
                v-show="postDetail.comments && postDetail.comments?.length > 0" 
                :post="post"
                :user="user"
                :handleLike="handleLike"
                @on-reply="initComment"
                @on-bottom="initComment(postDetail.comments?.length, 10, 'add')"
              />
            </el-collapse-transition>
          <!-- 加载动画 -->
          <div 
            class="loading-comment" 
            v-if="post.commentCount > 0 && !postDetail.comments" 
          >
              <div 
                
                element-loading-background="transparent" 
                element-loading-text="正在获取" 
              />
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { ArrowDownBold } from '@element-plus/icons-vue' 
import { reactive, ref } from '@vue/reactivity'
import { timeFormat } from '@/utils/tools'
import { isAccountLoggedIn } from '@/utils/auth'
import CommentCard from '@/components/CommentCard.vue'
import { getPostDetail, addComment, changeLikeStatus, deletePost } from '@/api/post'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, nextTick } from '@vue/runtime-core'
import useClipboard from 'vue-clipboard3'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ['post','user','likeStatus'],
  components: {
    ArrowDownBold,
    CommentCard
  },
  setup(props, context){
    const postCardRef = ref('')
    const comment = ref('')
    const isFirstComment = ref(true)
    const postDetail = reactive({comments:[]})
    const store = useStore()
    const route = useRoute()
    const router = useRouter();
    const isDetail = computed(()=>route.name === '详情') // 判断是否是详情页
    const isComment = ref(isDetail.value)
    const isFold = ref(!isDetail.value) // 详情页默认展开且不允许折叠
    const imgSection2Ref = ref('')
    const dialogVisible = ref(false)
    const commentInput = ref('');
    const imgSize = ()=>{
      if(props.post.pictureUrls.length < 3)
      {
        return imgSection2Ref.value.offsetWidth / props.post.pictureUrls.length - 2 + 'px';
      }else if(props.post.pictureUrls.length === 4)
      {
        return imgSection2Ref.value.offsetWidth / 2 - 2  + 'px';
      }else{
        return imgSection2Ref.value.offsetWidth / 3 - 2  + 'px';
      }
    }
    if(isDetail.value){  // 详情页默认加载评论
      initComment(0, 10) // 详情页默认加载10条
    } 
    let likeTimeOut; // 点赞定时器
    let isLikeChange = false; // 是否在发送请求之前改变了点赞，发送之后置为false
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
    function initComment(offset = 0, limit = 3, type = 'init'){
      // console.log(offset, limit)
      getPostDetail({id:props.post.id, offset, limit})
      .then(res=>{
        if(res.code === 20000)
        {
          // console.log(res.data.comments)
          if(type === 'init')
          {
            postDetail.comments.splice(0)
            postDetail.comments.push(...res.data.comments);
          }else if(type === 'add'){
            postDetail.comments.push(...res.data.comments);
          }
        }else{
          // postDetail.comments.splice(0)
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
      nextTick(()=>{
        setTimeout(()=>{
          // commentInput.value.focus()
        },500)
      })
    }
    function replyToPost(e){
      e.preventDefault();
      if(!isAccountLoggedIn())
      {
        store.commit('showToast',{
          type: 'warning',
          message: '请先点击头像登录'
        })
        return;
      }
      let tempComment = comment.value;
      if(comment.value.trim() === '')
        return;
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
          context.emit('on-mainReply')
        }else if(res){
          store.commit('showToast',{
            type: "error",
            message: res.message ??  "评论失败",
          })
        }
      }).catch(()=>{
        store.commit('showToast',{
            type: "error",
            message: "出错了",
          })
        comment.value = tempComment;
      })
      comment.value = '';
    }
    function handleLike(){
      if(!isAccountLoggedIn())
      {
        store.commit('showToast',{
          type: 'warning',
          message: '请先点击头像登录'
        })
        return;
      }
      clearTimeout(likeTimeOut);
      isLikeChange = !isLikeChange;
      context.emit('on-changeLikeStatus'); //本地修改点赞状态
      if(isLikeChange){
        likeTimeOut = setTimeout(() => {
          isLikeChange = false;
          changeLikeStatus({
            entityType: 1,
            entityId: props.post.id,
            entityUserId: props.user.id,
            postId: props.post.id
          })
          .then(res=>{
            if(res.code === 20000)
            {
              // console.log("改变点赞成功")
            }else if(res){
              store.commit('showToast',{
                type: "error",
                message: res.message ?? "点赞失败",
              })
              context.emit('on-changeLikeStatus'); // 请求失败，本地改回来
            }
          })
          .catch(()=>{
            context.emit('on-changeLikeStatus'); // 请求失败，本地改回来
            store.commit('showToast',{
              type: "error",
              message: "出错了",
            })
          })
        }, 1000);
      }
    }
    function shareCopy(id){
      const { toClipboard } = useClipboard()
      toClipboard(window.location.origin + '#/home/' + id)
      .then(()=>{
        store.commit('showToast',{
          type: "success",
          message: "链接已复制，快去分享吧~"
        })
      })
    }

    function handleDeletePost(post){
      dialogVisible.value = false;
      deletePost(post.id)
      .then(res=>{
        if(res.code === 20000)
        {
          post.deleteStatus = true; // 本地添加删除状态
          store.commit('showToast',{
            type: "success",
            message: "已删除"
          })
        }else{
          store.commit('showToast',{
            type: "error",
            message: res.message
          })
        }
      })
      .catch(()=>{
        store.commit('showToast',{
            type: "error",
            message: "系统异常"
          })
      })
      

    }
    const show = reactive({
      one: false
    });
    function picLoaded(pic){
      context.emit('on-picLoaded')
      nextTick(()=>{
        show[pic] = true;
        // console.log(show[pic])
      })
    }

    // 打开图片预览
    const showImageView = (e, pics, index, query) =>{
      let rect = e.target.getBoundingClientRect();
      store.state.data.imageViewPosition.top = rect.top;
      store.state.data.imageViewPosition.bottom = rect.bottom;
      store.state.data.imageViewPosition.left = rect.left;
      store.state.data.imageViewPosition.right = rect.right;
      store.state.data.imageViewPics.splice(0);
      store.state.data.imageViewPics.push(...pics);
      store.state.data.imageViewIndex = index;
      store.state.data.imageViewPicQuery = query;
      // 等待移动到对应地方以后再打开
      setTimeout(() => {
        store.state.model.imageViewFlag = true;
      }, 50);
      
    }
    return{
      isFold,
      // ...toRefs(props.user),
      // ...toRefs(props.post),
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
      handleLike,
      route,
      isDetail,
      shareCopy,
      store,
      imgSection2Ref,
      imgSize,
      handleDeletePost,
      dialogVisible,
      commentInput,
      picLoaded,
      show,
      router,
      showImageView
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
      // box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
      // transform: translateY(-3px);
    }
  }
  .header{
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break:break-all; 
    margin-bottom: 3px;
    img{
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 2%;
      &:hover{
        opacity: 0.8;
      }
    }
    .title{
      margin-left: 10px;
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
      // transition: 0.1s;
      color: var(--main-text);
    p{
      font-size: var(--post-card-font-size);
      margin: 10px 0;
      word-wrap:break-word;
      line-height: 1.5em;
      transition: 0.3s;
    }
    .pics{
      transition: .2s;
      .el-image{
        transition: .6s ease;
      }
      .transparent{
        position: absolute;
        opacity: 0;
      }
      .section2{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
        .el-image-viewer__btn{
          background: rgba(0,0,0,.1);
        }
        .el-image-viewer__next{
          right: 10px;

        }
        .el-image-viewer__prev{
          left: 10px;
        }
        // el-image-viewer__next
      }
      .section2{
        display: grid;
        gap: 5px;
        .el-image{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .img-box{
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
        }
      }
      margin-bottom: 10px;
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
    a.router-link-active span, a.router-link-active .tag{
      color: var(--primary-color);
      border-color: var(--primary-color) !important;
    }
    .tag{
      transition: .2s;
      border-color:  var(--secondary-border);
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
        & + span:hover{
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
  em{
    font-style:normal;
    color: var(--primary-color);
  }

}
</style>