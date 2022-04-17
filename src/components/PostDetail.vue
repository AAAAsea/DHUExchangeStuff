<template>
  <div class="container">
    <Post
      :title="postDetail.title"
      :subTitle="postDetail.subTitle"
      :avatarUrl="postDetail.avatarUrl"
    />
    <div class="comment-container">
      <CommentCard
      v-for="comment in postDetail.comments"
      :key="comment.id"
      :comment="comment"
      class="comment"/>
    </div>
  </div>
</template>

<script>

import CommentCard from './CommentCard.vue'
import Post from './Post.vue'

export default {
  name: 'PostDetail',
  props: ['id', 'postDetail'],
  components: {
    CommentCard,
    Post
  },
  setup(props){

    return{
      ...props
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .comment-container{
    
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .comment{
      box-sizing: border-box;
      padding: 20px;
      margin-top: 20px;
    }
  }
  
}
</style>
