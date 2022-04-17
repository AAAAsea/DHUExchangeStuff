<template>
  <div class="card">
    <h1 class="title">
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
  props: ['title', 'subTitle'],
}
</script>

<style scoped>
.card{
  background: #888;
  width: 80vw;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 30px;
}
</style>