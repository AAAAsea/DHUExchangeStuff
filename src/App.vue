<template>
  <TopNavBar/>
  <router-view>
  </router-view>
</template>

<script>
import TopNavBar from './components/TopNavBar'

export default {
  name: 'App',
  components: {
    TopNavBar,
  }
}
</script>

<style scoped>
</style>
