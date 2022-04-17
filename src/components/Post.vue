<template>
  <div class="card">
    <h1 class="title">
      <img :src="avatarUrl" alt="">
      {{title}}
    </h1>
    <div class="sub">
      <p>{{subTitle}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  props: ['title', 'subTitle','avatarUrl'],
}
</script>

<style lang="scss" scoped>
.card{
  background: rgba(37, 26, 74, 0.425);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 30px;
  box-sizing: border-box;
  .title{
    display: flex;
    align-items: center;
    img{
      width: 40px;
      border-radius: 50%;
      margin-right: 3%;
    }
  }
}
</style>