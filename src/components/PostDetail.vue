<template>
  <div class="container">
    <PostCard
      :title="postDetail.title"
      :content="postDetail.content"
      :avatarUrl="postDetail.avatarUrl"
      :time="postDetail.time"
      :tagName="postDetail.tagName"
      class="post-card"
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
import PostCard from './PostCard.vue'

export default {
  name: 'PostDetail',
  props: ['id', 'postDetail'],
  components: {
    CommentCard,
    PostCard
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
  .post-card{
    font-size: 20px;
    width: 100%;
  }
  .comment-container{
    
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .comment{
      box-sizing: border-box;
      padding: 15px 25px 25px 25px;
      margin-top: 20px;
    }
  }
  
}
</style>
