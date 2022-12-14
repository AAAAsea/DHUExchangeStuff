<template>
  <div class="chat">
      <!-- 标题栏 -->
      <div class="title">
        <a @click="router.back(-1)"> 
          <span class="iconfont icon-back">返回</span>
        </a>
        <!-- 标题 -->
        <span>
          {{target.nickName}}
        </span>
      </div>
      <!-- 信息展示区 -->
      <div class="chat-box" ref="chatBoxRef" id="chat-box">
        <div class="loadmore" 
        v-if="haveMore"
        @click="loadMore">  查看历史消息记录
        </div>
        <!-- 消息主窗口 -->
        <div 
          class="message-box" 
          :class="{me: item.fromUser.id === store.state.data.user.id}"
          v-for="item in messages"
          :key="item.letter.id"
        >
          <!-- 用户消息 -->
            <!-- 头像 -->
            <img 
              @click="router.push({path: '/user/' + item.fromUser.id})"
              :src="item.fromUser.headerUrl + '?width=100'" 
            >
            <div class="content-box" >
              <!-- 文字消息 -->
              <div class="bubble-cont">
                {{item.letter.content}}
              </div>
            </div>
            <!-- 时间 -->
            <span class="time">
              {{timeFormat(item.letter.createTime)}}
            </span>
        </div>
      </div>
      <div class="bottom">
        <!-- 工具栏 -->
        <div class="toolbar">
          <!-- <DiscordPicker
            class="emoji"
            gif-format="md"
            @emoji="text += $event"
          /> -->
        </div>
        <!-- 输入框 -->
          <textarea 
            @keydown.enter="sendMessage" 
            v-model="text"
            maxlength="500"
          />
          <button @click="sendMessage">发送</button>
      </div>
  </div>
</template>

<script setup>
import { getChatRecord, sendLetter } from '@/api/user';
import { nextTick, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import DiscordPicker from 'vue3-discordpicker'
import { useStore } from 'vuex';
import { timeFormat } from '@/utils/tools'
const store = useStore()
const route = useRoute();
const router = useRouter();
const haveMore = ref(true);
const userId = store.state.data.user.id;
const conversationId = Math.min(route.params.id, userId) + '_' + Math.max(route.params.id, userId);
const messages = reactive([])
const target = reactive({
  id: '',
  nickName: '',
  username: ''
})
function initMessages(offset = 0, limit = 10, spliceFlag = true, scrollFlag = true ){
  getChatRecord(conversationId, offset, limit)
  .then(res=>{
    if(spliceFlag) messages.splice(0);
    messages.unshift(...res.data.letters.reverse())
    target.id = res.data.target.id;
    target.nickName = res.data.target.nickName;
    target.username = res.data.target.username;
  })
  .then(()=>{
    if(scrollFlag){
      initScroll();
      haveMore.value = messages.length >= 10;
    }
  })
}
initMessages()

function loadMore(){
  // 记录scrollHeight
  let chatBox = document.getElementById('chat-box')
  const lastScrollHeight = chatBox.scrollHeight;
  getChatRecord(conversationId, messages.length, 20)
  .then(res=>{
    if(res.data.letters.length < 20)
    {
      haveMore.value = false;
    }
    messages.unshift(...res.data.letters.reverse())
    // 保持页面不动
    nextTick(()=>{
      chatBox.scrollTop = chatBox.scrollHeight - lastScrollHeight;
    })
  })
}
// 调整聊天窗口在最下面
function initScroll(){
  nextTick(()=>{
    let chatBox = document.getElementById('chat-box')
    chatBox.scrollTop = chatBox.scrollHeight + 200;
  })
}

const text = ref('');
function sendMessage(e){
  e.preventDefault();
  if(text.value.trim() === '') return;
  let msg = text.value;
  text.value = '';
  sendLetter(target.username, msg)
  .then(()=>{
    initMessages()
  })
  .catch(()=>{
    text.value = msg;
  })
}
// 这里没用socket，所以采用轮询http，5秒一次
const pollingInterval = setInterval(() => {
  initMessages(0, messages.length, true, false);
}, 10000);

onUnmounted(()=>{
  clearInterval(pollingInterval)
})
</script>

<style lang="scss" scoped>
  .chat{
    width: 100%;
    height: 90vh;
    background: var(--post-card-bg);
    .loadmore{
      margin: 10px auto;
      cursor: pointer;
      font-size: .9em;
      color: var(--secondary-text);
    }
    .title{
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid var(--secondary-bg);
      position: relative;
      a{
        position: absolute;
        left: 10px;
      }
    }
    .chat-box{
      height: 60%;
      background: varf(--post-card-bg);
      width: 100%;
      padding: 0 10px;
      padding-top: 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: auto;
      box-sizing: border-box;
      .message-box{
        display: flex;
        width: 100%;
        margin-bottom: 15px;
        align-items: center;
        img{
          height: 40px;
          width: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
          cursor: pointer;
          transition: .2s;
        }
        img:hover{
          opacity: .9;
        }
        .content-box{
          background: var(--secondary-bg);
          display: flex;
          align-items: center;
          padding: 8px 10px;
          border-radius: 5px;
          position: relative;
          max-width: 55%;
          word-break: break-all;
          line-height: 1.5em;
        }
        .content-box::before{
          content: '';
          border: 6px solid transparent;
          border-right: 6px solid  var(--secondary-bg);
          position: absolute;
          right: 100%;
        }
        .time{
          font-size: 14px;
          vertical-align: bottom;
          color: var(--secondary-text);
          transform: scale(0.7);
        }
      }
      .me{
        flex-direction: row-reverse;
        margin-left: 0;
        img{
          margin-right: 0;
          margin-left: 10px;
        }

        .content-box::before{
          position: absolute;
          left: 100%;
          border-right: 6px solid transparent;
          border-left: 6px solid  var(--secondary-bg);
        }

      }
    }
    .chat-box::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .chat-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        background: rgba(106, 106, 106, 0.2);
    }
    .chat-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
        border-radius: 0;
        background: rgba(129, 129, 129, 0.1);
    }
    .bottom{
      height: 30%;
      position: relative;
      .toolbar{
        border-bottom: 1px solid var(--secondary-bg);
        padding-bottom: 3px;
        .emoji{
          float: right;
          margin-right: 10px;
          img{
            max-width: '';
          }
        }
      }
      textarea{
        position: relative;
        font-size: 1em;
        line-height: 1.3em;
        color: var(--main-text);
        border:0;
        background: transparent;
        resize: none;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 50%;
        overflow: auto;
        outline: 0;
        word-break:break-all; 
      }
      textarea::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      textarea::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          background: rgba(106, 106, 106, 0.2);
      }
      textarea::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: rgba(129, 129, 129, 0.1);
      }
      button{
        position: absolute;
        right: 20px;
        bottom: 20px;
        background: var(--primary-color);
        color: var(--main-bg);
        width: 60px;
        height: 30px;
        border-radius: 15px;
        transition: .3s;
      }
      button:hover{
        opacity: .7;
      }
      button:focus{
        border: none;
        outline: none;
      }
    }
  }
</style>