<template>
  <div class="container">
    <div class="detail">
      <div class="title">
        <h1>测试标题</h1>
      </div>
      <div class="detail">
        你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好
      </div>
    </div>
    <div class="comment-container">
      <CommentCard
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      class="comment"/>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import CommentCard from './CommentCard.vue'
export default {
  name: 'PostDetail',
  props: ['id'],
  components: {
    CommentCard
  },
  setup(){
    const data = reactive({
      comments: [
        {
          id: 0,
          avataUrl: "../assets/logo.png",
          nickName: "Asea",
          time: "2022-04-17 16:37:16",
          cotent: "哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈 哈哈"
        }
      ]
    })
    return{
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .detail{
    padding: 20px;
  }
  .comment-container{
    padding: 20px;
    width: 85vw;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
}
</style>
