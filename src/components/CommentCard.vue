<template>
  <el-collapse-transition>
    <div 
      class="comment-container" 
      v-if="comments" 
    >
      <!-- 最外层评论区 -->
      <div 
        class="comment-box" 
        v-for="item in comments" 
        :key="item.comment.id" 
      >
        <!-- 头像 -->
        <div class="user-face">
          <router-link :to="/user/+item.user.id">
            <img :src="item.user.headerUrl.replace('/header','/image') + '?width=100'" alt="">
          </router-link>
        </div>
        <!-- 评论区内容（包含子评论） -->
        <div class="con" >
          <!-- 用户昵称 -->
          <div class="user">
            <router-link :to="/user/+item.user.id">
              {{item.user.nickName || item.user.username}}
            </router-link>
          </div>
          <!-- 主评论内容 -->
          <p>{{item.comment.content}}</p>
          <!-- 时间、点赞等 -->
          <div class="info">
            <!-- 时间 -->
            <span class="time">
              {{timeFormat(new Date(item.comment.createTime).getTime())}}
            </span>
            <!-- 点赞 -->
            <span 
            class="iconfont icon-like" 
            :style="{color: item.likeStatus ? 'var(--primary-color)' : ''}" 
            @click="handleLike(2, item.comment.id, item.user.id, item)"
            >
              <span class="like">{{item.likeCount}}</span>
            </span>
            <!-- 评论数-->
            <span class="iconfont icon-comment_light">
              <span class="reply">
                {{item.replyCount}}
              </span>
            </span>
            <!-- 回复按钮 -->
            <span 
              class="btn" 
              @click="showCommentInput('回复'+item.user.nickName ?? item.user.username,2, item.comment.id)"
            >
              回复
            </span>
          </div>
          <!-- 子评论最外层 -->
          <div 
            class="reply-box" 
            v-if="item.replys?.length > 0"
          >
            <!-- 每个子评论 -->
            <div 
              class="reply-item" 
              v-for="subItem in item.replys.slice(0,subItemNums)" 
              :key="subItem.reply.id"
            >
              <!-- 头像 -->
              <router-link :to="/user/+subItem.user.id">
                <img :src="subItem.user.headerUrl.replace('/header','/image')  + '?width=100'">
              </router-link>
              <!-- 子评论区内容区 -->
              <div class="reply-con">
                <!--  子评论内容点击回复-->
                <span 
                  class="reply-user" 
                  @click="showCommentInput( '@'+subItem.user.nickName ?? item.user.username,2, item.comment.id, subItem.user.id)"
                >
                  <!-- 子评论用户昵称 -->
                  <span @click.stop="">
                    <router-link :to="/user/+subItem.user.id">
                      {{subItem.user.nickName ?? subItem.user.username}}:
                    </router-link>
                  </span> 
                  <!-- @用户 -->
                  <span 
                    v-if="subItem.target"
                  >
                    <router-link :to="/user/+subItem.target.id">
                      @{{subItem.target.nickName ?? subItem.target.username}}
                    </router-link>
                  </span>
                  <!-- 子评论内容 -->
                  {{subItem.reply.content}}
                </span>
                <!-- 子评论时间点赞回复等 -->
                <div class="info">
                  <!-- 子评论时间 -->
                  <span class="time">
                    {{timeFormat(new Date(subItem.reply.createTime).getTime())}}
                  </span>
                  <!-- 点赞 -->
                  <span 
                  class="iconfont icon-like" 
                  :style="{color: subItem.likeStatus ? 'var(--primary-color)' : ''}" 
                  @click="handleLike(2, subItem.reply.id, subItem.user.id, subItem)"
                  >
                    <span class="like">
                      {{subItem.likeCount}}
                    </span>
                  </span>
                  <!-- 回复 -->
                  <span 
                  class="btn" 
                  @click="showCommentInput( '@'+subItem.user.nickName ?? item.user.username,2, item.comment.id, subItem.user.id)"
                  >
                    回复
                  </span>
                </div>
              </div>
            </div>
            <!-- 子评论区最后提示语 -->
            <div 
            class="reply-total" 
            v-if="item.replyCount > 3 && item.replyCount > subItemNums"
            @click="subItemNums += 10"
            >
              共{{item.replyCount}}条回复，点击展开更多
            </div>
          </div>
        </div>
      </div>
      <!-- 主评论区最后提示语 -->
      <div 
      class="comment-footer" 
      v-if="post.commentCount > 3"
      @click="toDetail"
      >
        <div v-if="!isDetail">
          <span >
            查看全部{{post.commentCount}}条回复
          </span>
          <span class="iconfont icon-cc-right"></span>
        </div>
        <span v-else style="color: var(--secondary-text)" @click="loadMoreComment">
          {{post?.commentCount === comments?.length ? '——到底了——' : '点击加载更多'}}
        </span>
      </div>
      <!-- 评论回复弹窗 -->
      <teleport to='body' >
        <el-dialog 
          v-model="dialogVisible"
          title="评论"
          :width="store.state.model.modelWidth"
        >
          <div class="comment" >
            <el-input 
            v-model="comment.content" 
            :placeholder="replyInputPlaceHolder" 
            type="textarea"  
            :minlength="1" 
            :maxlength="140" 
            :autosize="{ minRows: 1, maxRows: 5 }" 
            show-word-limit>
          </el-input>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button 
              type="primary" 
              @click="replyToComment" 
              :disabled="comment.content.trim() === ''"
              >
                确定
              </el-button
              >
            </span>
          </template>
        </el-dialog>
      </teleport>
    </div> 
  </el-collapse-transition>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { timeFormat } from '@/utils/tools'
import { isAccountLoggedIn } from '@/utils/auth'
import { addComment, changeLikeStatus  } from '@/api/post'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default{
  emits: ['on-reply','on-bottom'],
  props: ['comments', 'post'],
  setup(props, context){  
    const store = useStore()
    const dialogVisible = ref(false)
    const router = useRouter()
    const replyInputPlaceHolder = ref('')
    const route = useRoute()
    const subItemNums = ref(3) // 默认子评论展示3个
    // let canLoadComment = true;
    const isDetail = computed(()=>route.name === '详情') // 判断是否是详情页
    // let likeTimeOut; // 点赞定时器(优化为item.likeTimeOut)
    // let isLikeChange = false; // 是否在发送请求之前改变了点赞，发送之后置为false（同上）
    const comment = reactive({
      id: props.post.id, 
      entityType: '',
      entityId: '',
      targetId: '',
      content: ''
    })
    function showCommentInput(placeHolder, entityType,entityId,targetId=0){
      if(!isAccountLoggedIn()){
        store.commit('showToast',{
            type: "warning",
            message: "请先点击头像登录",
        })
        return
      }
      comment.entityType = entityType;
      comment.entityId = entityId;
      comment.targetId = targetId;
      replyInputPlaceHolder.value = placeHolder
      dialogVisible.value = true;
    }
    function replyToComment(){
      addComment(comment).then(res=>{
        console.log(res)
        if(res.code === 20000){
          store.commit('showToast',{
            type: "success",
            message: "评论成功",
          })
          dialogVisible.value = false
          context.emit('on-reply')
          comment.content = ''
        }else if(res){
          store.commit('showToast',{
            type: "error",
            message: res.message ??  "评论失败",
          })
        }
      })
      .catch(()=>{
        store.commit('showToast',{
            type: "error",
            message: "出错了",
          })
      })
    }
    function handleLike(entityType, entityId, entityUserId, item){
      if(!isAccountLoggedIn())
      {
        store.commit('showToast',{
          type: 'warning',
          message: '请先点击头像登录'
        })
        return;
      }
      clearTimeout(item.likeTimeOut);
      item.isLikeChange = !item.isLikeChange;
      item.likeStatus = !item.likeStatus;
      item.likeCount += item.likeStatus || -1
      if(item.isLikeChange){
        item.likeTimeOut = setTimeout(() => {
          item.isLikeChange = false;
          changeLikeStatus({
            entityType,
            entityId,
            entityUserId,
            postId: props.post.id
          })
          .then(res=>{
            if(res.code === 20000)
            {
              console.log("改变点赞成功")
            }else{
              item.likeStatus = !item.likeStatus;
              item.likeCount += item.likeStatus || -1
            }
          })
          .catch(()=>{
            item.likeStatus = !item.likeStatus;
              item.likeCount += item.likeStatus || -1; // 请求失败，本地改回来
          })
        }, 1000);
      }
    }
    function toDetail(){
      router.push({
        path: '/home/'+props.post.id
      })
    }
    function loadMoreComment(){
      context.emit('on-bottom')
    }
    // // 详情页监听滚动
    // if(isDetail.value){
    //   window.addEventListener('scroll', loadMoreComment)
    //   loadMoreComment() // 防止刚开始三条评论无法触发滚动
    // }
    // // 离开页面时取消监听
    // onUnmounted(()=>{
    //   window.removeEventListener('scroll', loadMoreComment);
    // })
    // // 滚动时判断是否到底部，并且500ms之内未触发更新，且还有数据
    // function loadMoreComment(){
    //   // 加载完毕关闭监听
    //   if(props.post?.commentCount <= props?.comments?.length)
    //   {
    //     window.removeEventListener('scroll', loadMoreComment)
    //     return;
    //   }
    //   if(isDetail.value && canLoadComment && isOnBottom())
    //   {
    //     // console.log("loadMoreComment")
        
    //     canLoadComment = false;
    //     setTimeout(() => {
    //       canLoadComment = true; // 防止过快加载
    //       loadMoreComment() // 防止一秒内到底后不动导致不加载，所以自动多判断一次
    //     }, 1000);
    //   }
    // }
    return {
      store,
      timeFormat,
      dialogVisible,
      showCommentInput,
      comment,
      replyToComment,
      replyInputPlaceHolder,
      handleLike,
      toDetail,
      isDetail,
      loadMoreComment,
      subItemNums
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box{
  width: 100%;
  display: flex;
  .user-face{
    width: 45px;
    padding: 10px 10px 15px 5px;
    text-align: center;
    img{
      border-radius: 50%;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
  }

  .con{
    width: 100%;
    overflow: hidden; //避免英文元素撑开，我也不知道为啥
    padding: 10px 0 10px 0;
    border-bottom: 1px solid var(--secondary-bg);
    .user{
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: bold;
      color: var(--secondary-primary-color);
    }
    p{
      box-sizing: content-box;
      flex:1 1 auto;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 5px;
    }
    .info{
      color: var(--toolbar-text);
      padding-top: 5px;
      .iconfont{
        padding: 0;
        border: 0;
        width: 20px;
      }
      .like, .reply{
        padding-left: 3px;
      }
      .time{
        padding-right: 20px;
        color: var(--secondary-text);
      }
      span{
        margin-right: 10px;
        font-size: 13px;
      }
    }
    .reply-box{
      // width: 100%; 加了就超出宽度了，不清楚为啥
      margin-top: 5px;
      padding: 10px 5px 5px 10px;
      border-radius: 4px;
      background: var(--secondary-bg);
      .reply-item{
        padding-bottom: 10px;
        display: flex;
        img{
          margin-top: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          object-fit: cover;
        }
        .reply-con{
          padding: 0 5px;
          overflow: hidden; //避免英文元素撑开，我也不知道为啥
          .reply-user{
            font-size: 13px;
            margin-right: 10px;
            word-break: break-all;
            span{
              padding-right: 5px;
              // font-weight: bold;
              a{
                color: var(--secondary-primary-color)
              }
            }
          }
        } 
      }
      .reply-total{
        cursor: pointer;
        color: var(--secondary-primary-color);
        margin-top: 3px;
        padding-left: 25px;
        font-size: 13px;
      }
    }
  }
}
.comment-footer{
  cursor: pointer;
  align-items: center;
  display: flex;
  margin:0  auto;
  height: 50px;
  text-align: center;
  font-size: 15px;
  justify-content: center;
  width: fit-content;
  color: var(--main-text);
  transition: .2s;
  &:hover{
    color: var(--primary-color);
    span{
      color: var(--primary-color);
    }
  }
  .icon-cc-right{
    color: var(--main-text);
  }
}
</style>