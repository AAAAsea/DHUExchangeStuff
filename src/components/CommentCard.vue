<template>
  <div class="comment-container" v-if="comments">
    <div class="comment-box" v-for="item in comments.slice(0,3)" :key="item.comment.id" >
      <div class="user-face">
        <img :src="item.user.headerUrl" alt="">
      </div>
      <div class="con" >
        <div class="user">{{item.user.nickName ?? item.user.username}}</div>
        <p>{{item.comment.content}}</p>
        <div class="info">
          <span class="time">{{timeFormat(new Date(item.comment.createTime).getTime())}}</span>
          <span class="iconfont icon-like">
            <span class="like">123</span>
          </span>
          <span class="iconfont icon-comment_light">
            <span class="reply">{{item.replyCount}}</span>
          </span>
          <span class="btn" @click="showCommentInput('回复'+item.user.nickName ?? item.user.username,2, item.comment.id)">回复</span>
        </div>
        <div class="reply-box" v-if="item.replys.length > 0">
          <div class="reply-item" v-for="subItem in item.replys.slice(0,3)" :key="subItem.reply.id">
            <!-- <img :src="subItem.user.headerUrl" alt=""> -->
            <div class="reply-con">
              <span class="reply-user" @click="showCommentInput( '@'+subItem.user.nickName ?? item.user.username,2, item.comment.id, subItem.user.id)">
                <span @click.stop="">{{subItem.user.nickName ?? subItem.user.username}}：</span> 
                <span v-if="subItem.target">@{{subItem.target.nickName ?? subItem.target.username}}</span>
                {{subItem.reply.content}}
              </span>
              <div class="info"></div>
            </div>
          </div>
          <div class="reply-total" v-if="item.replys.length > 3">共{{item.replys.length}}条回复</div>
        </div>
      </div>
    </div>
    <div class="comment-footer" v-if="comments.length > 3">
      <span>查看全部{{comments.length}}条回复</span>
      <span class="iconfont icon-cc-right"></span>
    </div>
    <!-- 评论回复弹窗 -->
    <teleport to='body' >
      <el-dialog
        v-model="dialogVisible"
        title="评论"
        :width="store.state.model.modelWidth"
      >
        <div class="comment" >
          <el-input v-model="comment.content" :placeholder="replyInputPlaceHolder" type="textarea"  :minlength="1" :maxlength="140" :autosize="{ minRows: 1, maxRows: 5 }" show-word-limit></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="replyToComment" :disabled="comment.content.trim() === ''"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </teleport>
  </div> 
</template>

<script>
import {reactive, ref } from 'vue'
import { timeFormat } from '@/utils/tools'
import {  addComment } from '@/api/post'
import { useStore } from 'vuex'

export default{
  emits: ['on-reply'],
  props: ['comments', 'postId'],
  setup(props, context){
    const store = useStore()
    const dialogVisible = ref(false)
    const replyInputPlaceHolder = ref('')
    const comment = reactive({
      id: props.postId, 
      entityType: '',
      entityId: '',
      targetId: '',
      content: ''
    })
    function showCommentInput(placeHolder, entityType,entityId,targetId=0){
      comment.entityType = entityType;
      comment.entityId = entityId;
      comment.targetId = targetId;
      replyInputPlaceHolder.value = placeHolder
      dialogVisible.value = true;
    }
    function replyToComment(){
      dialogVisible.value = false
      addComment(comment).then(res=>{
        console.log(res)
        if(res.code === 20000){
          store.commit('showToast',{
            type: "success",
            message: "评论成功",
          })
          context.emit('on-reply')
          comment.content = ''
        }
      })
    }
    return {
      store,
      timeFormat,
      dialogVisible,
      showCommentInput,
      comment,
      replyToComment,
      replyInputPlaceHolder
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box{
  // border: 1px solid red;
  // padding-bottom: 15px;
  display: flex;
  .user-face{
    padding: 10px 10px 15px 5px;
    text-align: center;
    img{
      border-radius: 50%;
      width: 40px;
    }
  }

  .con{
    width: 100%;
    padding: 10px 0 10px 0;
    border-bottom: 1px solid var(--secondary-bg);
    .user{
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: bold;
      color: var(--secondary-primary-color);
    }
    p{
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
      .time{
        color: var(--secondary-text);
      }
      span{
        margin-right: 10px;
        font-size: 13px;
      }
    }
    .reply-box{
      margin-top: 5px;
      padding: 10px 5px 5px 5px;
      border-radius: 4px;
      background: var(--secondary-bg);
      .reply-item{
        display: flex;
        .reply-con{
          padding: 0 5px;
          .reply-user{
            font-size: 13px;
            margin-right: 10px;
            span{
              // font-weight: bold;
              color: var(--secondary-primary-color)
            }
          }
        } 
      }
      .reply-total{
        cursor: pointer;
        color: var(--secondary-primary-color);
        margin-top: 3px;
        padding-left: 5px;
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