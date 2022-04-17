<template>
  <div class="card">
    <div class="userInfo">
      <img src="../assets/logo.png" alt="">
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
      {{comment.cotent}}
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
    border: 1px solid red;
    .userInfo{
      display: flex;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
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