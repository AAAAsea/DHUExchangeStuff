<template>
  <div class="home-right">
    <h2>#️⃣热门话题</h2>
    <el-icon 
    :style="{
      position: 'absolute', 
      top: '15px',
      right: '10px', 
      color:'#eee', 
      transform: 'rotate('+ (isFold ? 0 : 180) +'deg)', 
      transition: '0.3s',
      cursor: 'pointer'
    }" 
    @click.stop="isFold = !isFold" >
      <arrow-down-bold />
    </el-icon>
    <el-collapse-transition>
    <ul v-show="!isFold">
      <div class="li-container">
        <router-link :to="'/tag/' + tag.tagId" v-for="tag in tags" :key="tag.tagId"  >
          <li @click="store.state.model.rightDrawerModelFlag =false">
              # {{tag.tagName}}
          </li>
        </router-link>
      </div>
    </ul>
    </el-collapse-transition>
    <div class="load-more" @click="loadMoreTags">
      {{isFold ? '点击箭头展开' : (haveMoreTags ? '加载更多' : '已加载全部') }}
    </div>
  </div>
</template>

<script setup>
import { ArrowDownBold } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const isFold = ref(false)
const store = useStore()
const tags = computed(()=>store.state.data.tags)
const haveMoreTags = ref(true)
// console.log(tags.value.length)
store.dispatch('fetchHotTags', {offset: tags.value.length, limit: 10})
.then(()=>{
})

function loadMoreTags(){
  if(!haveMoreTags.value) return;
  // 记录更新前tags数量
  let _length = tags.value.length
  store.dispatch('fetchHotTags', {offset: tags.value.length, limit: 5})
  .then(()=>{
    if(tags.value.length === _length || tags.value.length - _length < 5)
    {
      haveMoreTags.value = false; // 标记没有tags了
    }
  })
}
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
      max-height: 70vh;
      overflow: scroll;
      transition: .3s ease;
      .li-container{
        transition: .3s ease;
      }
      li{
        transition: 0.2s ease;
        padding: 10px;
        box-sizing: border-box;
        line-height: 1.5em;
        width: 100%;
        background: var(--post-card-bg);
        font-size: 1em;
        font-weight: bold;
        display: flex;
        align-items: center;
        &:hover{
          background: var(--secondary-bg);
        }
      }
      .router-link-active{
        li{
          color: var(--main-bg);
          background: var(--primary-color) !important;
        }
      }
    }
    ul::-webkit-scrollbar{
      display: none
    }
    .load-more{
      height: 35px;
      font-size: 16px;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>