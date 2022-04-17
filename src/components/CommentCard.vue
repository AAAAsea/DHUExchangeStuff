<template>
  <div class="card">
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
  .card{
    width: 100%;
    background: #eee;
    border-radius: 10px;
    // padding: 10px;
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
  }
</style>