<template>
  <div class="footer">
    Footer
  </div>
</template>

<script >
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"Footer",
}
</script>

<style lang="scss" scoped>
  .footer{ 
    margin-top: 20px;
    height: 20vh;
    background: var(--footer-bg);
    display: flex;
    justify-content: center;
    padding: 20px;
    color: var(--footer-text);
  }
</style>