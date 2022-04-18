<template>
  <div class="comment-card">
    <div class="userInfo">
      <img :src="comment.avatarUrl" alt="">
      <div class="info">
        <div class="nickname">
          {{comment.nickName}}
        </div>
        <div class="time">
          {{comment.time}}
        </div>    
      </div>
    </div>
    <div class="content">
      {{comment.content}}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: ['comment']
}
</script>

<style lang="scss" scoped>
  .comment-card{
    color: white;
    width: 100%;
    background: var(--comment-bg);
    border-radius: 15px;
    transition: 0.2s;
    &:hover{
      box-shadow: 0 5px 15px -5px rgba(0,0,0,.3);
      transform: translateY(-3px);
    }
    .userInfo{
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .info{
        .nickname{
          font-weight: bold;
        }
        .time{
          font-size: 13px;
        }
      }
    }
    .content{
      text-indent:1.5em;
      text-align: justify;
      letter-spacing: 1px;
      line-height: 20px;
      font-size: 15px;
      word-wrap:break-word
    }
  }
</style>