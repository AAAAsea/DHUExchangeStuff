<template>
  <div class="home-right">
    <h2>#️⃣热门话题</h2>
    <el-icon :style="{position: 'absolute', top: '15px', right: '10px', color:'#eee', transform: 'rotate('+ (isFold ? 0 : 180) +'deg)', transition: '0.3s'}" @click.stop="isFold = !isFold" ><arrow-down-bold /></el-icon>
    <ul :style="{height: isFold ? 0 : ulHeight}">
      <div class="li-container"  ref='ulRef'>
        <li v-for="tag in tags" :key="tag.id"># {{tag.name}}</li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { ArrowDownBold } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
const isFold = ref(false)
const ulRef = ref('')
const ulHeight = computed(()=>ulRef.value.offsetHeight + 'px')
const tags = [{id:1,name:"吃肉"},{id:1,name:"吃火锅"},{id:1,name:"洗澡"},{id:1,name:"跑步跑步跑步跑步"},{id:1,name:"吃肉"},{id:1,name:"吃肉"}]
</script>

<style lang="scss" scoped>
  .home-right{
    position: sticky;
    top: 60px;
    background: var(--secondary-bg);
    border-radius: 5px;
    margin-left: 8px;
    h2{
      padding: 10px;
    }
    ul{
      transition: .3s ease;
      overflow: hidden;
      li{
        padding: 10px;
        box-sizing: border-box;
        line-height: 1.5em;
        width: 100%;
        background: var(--main-bg);
        font-size: 1em;
        font-weight: bold;
        display: flex;
        align-items: center;
        &:hover{
          background: var(--secondary-bg);
        }
      }
    }
  }
</style>