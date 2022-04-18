<template>
  <div class="card">
    <h1 class="title">
      <img :src="avatarUrl" alt="">
      {{title}}
    </h1>
    <div class="sub">
      <p>{{content}}</p>
    </div>
    <div class="footer">
      <p>{{tagName+" "+time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ['title', 'content','avatarUrl','tagName','time'],
}
</script>

<style lang="scss" scoped>
.card{
  background: rgba(37, 26, 74, 0.425);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px 30px;
  box-sizing: border-box;
  color: white;
  transition: 0.2s ease;
  &:hover{
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
    transform: translateY(-3px);
  }
  .title{
    display: flex;
    align-items: center;
    margin: 0;
    word-wrap:break-word;
    img{
      width: 40px;
      border-radius: 50%;
      margin-right: 2%;
    }
  }
  .sub{
    p{
      letter-spacing: 1px;
      word-wrap:break-word
    }
  }
  .footer{
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>