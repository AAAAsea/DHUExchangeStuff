<template>
  <div class="post-card">
    <h2 class="title">
      <img :src="avatarUrl" alt="">
      {{title}}
    </h2>
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
.post-card{
  border: 1px solid var(--post-card-border);
  background: var(--post-card-bg);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 30px 25px 30px;
  box-sizing: border-box;
  transition: 0.2s ease;
  color: var(--main-text);
  &:hover{
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
    transform: translateY(-3px);
  }
  .title{
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break:break-all; 
    img{
      width: 40px;
      border-radius: 50%;
      margin-right: 2%;
    }
  }
  .sub{
    p{
      font-size: var(--post-card-font-size);
      margin: 10px 0;
      letter-spacing: 1px;
      word-wrap:break-word
    }
  }
  .footer{
    font-size: var(--post-card-footer-font-size);
    display: flex;
    justify-content: flex-end;
  }
}
</style>