<template>
  <div class="construct" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">      
        <div class="construct-mid">
          <div class="users">
            <span>社区人数</span>
            <span>{{usersCount}}</span>
          </div>
          <div class="users">
            <span>发帖总数</span>
            <span>{{postCount}}</span>
          </div>
          <el-timeline>
            <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in list" :key="index">
              <el-card>
                <h4>{{item.title}}</h4>
                <p>{{item.content}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
  <!-- <EditButton/> -->
</template>

<script setup>
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import { getUsersCount } from '@/api/user'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';

// 回到顶部
document.body.scrollTop = 0;
// 帖子总数
const postNum = useStore().state.data.postCount;
const postCount = ref(0);
// 用户总数
const usersCount = ref(0);
getUsersCount().then(res=>{
  let rate = 1;
  let speed = 500/res.data;
  let addInterval;
  let postInterval;
  const userAdd = ()=>{
    if(usersCount.value + rate < res.data)
    {
      usersCount.value += rate;
      // if(speed > 1 )
      // {
      //   clearInterval(addInterval);
      //   speed -= 1;
      //   rate += 1;
      //   addInterval = setInterval(selfAdd, speed)
      // }
    }else{
      usersCount.value = res.data;
      clearInterval(addInterval);
    }
  }
  const postAdd = ()=>{
    if(postCount.value + rate < postNum)
    {
      postCount.value += rate;
    }else{
      postCount.value = postNum;
      clearInterval(postInterval);
    }
  }
  addInterval = setInterval(userAdd, speed)
  postInterval = setInterval(postAdd, (res.data/postNum)*speed);
})



const list = []
const myAppend = (time, title, content)=>{
  list.push({
    time,
    title,
    content
  })
  return myAppend
}
myAppend(
  "2022-04-17",
  "基本功能完善"
)(
  "2022-04-18",
  "调整UI，增加发帖、登录模块"
)(
  "2022-04-19",
  "完善登陆注册校验"
)(
  "2022-04-20",
  "接入登录接口，修复登录校验"
)(
  "2022-04-21 ",
  "登录、注册后续逻辑，无限滚动加载，大改UI，发帖校验、回车登录、标签换行"
)(
  "2022-04-22",
  "移动端卡片点击波纹效果，右滑呼出侧边导航栏，发帖自动更新，下拉刷新"
)(
  "2022-04-23",
  "优化下拉刷新、优化发帖校验、ctrl+回车发帖、优化导航栏响应式、身份过期自动logout、增强登录判定、不登录不显示个人主页、热门tag栏"
)(
  "2022-04-23",
  "发布post后自动清除、注册昵称密码二次校验、用户信息界面"
)(
  "2022-04-24",
  "可以评论了！"
)(
  "2022-04-25",
  "登录校验、评论懒加载、可以点赞了！"
)(
  "2022-04-26",
  "修复评论bug、详情界面施工中、点赞评论数据及时更新、触底加载优化、我发布的"
)(
  "2022-04-27",
  "增加用户主页，完善个人主页、可以更换背景、取消点赞hover、修复点赞不显示颜色bug、增加分享复制链接功能、优化窗口滚动监听事件，修复默认背景图不显示，禁止短时间重复提交注册，修复个人主页移动端不适配问题，增加关注、粉丝界面"
)(
  "2022-04-28",
  "新增热门标签，可根据标签跳转，修复异常无限加载的bug，修复刷新登陆状态丢失，发帖tag不允许重复，修复头像边缘缝隙，生产关闭devtool，优化滚动监听，修复tagpost页重复加载异常，调整话题栏UI，修复未登录加载不出内容bug、增加进度条动画"
)(
  "2022-04-29",
  "修复首页切换页面后丢失滚动监听、发评论时自动隐藏发帖和返回顶部按钮、增加过渡动画、头像增加设置入口、优化图片获取尺寸，减少流量消耗，话题导航栏、账号设置、图片大小、主页背景图、过渡动画抖动"
)(
  "2022-04-30",
  "可以发图片了！"
)(
  "2022-05-01",
  "发帖移动到后台运行，可以删帖啦！"
)(
  "2022-05-02",
  "移动端增加热门tag栏"
)(
  "2022-05-03",
  "新增发帖进度条"
)(
  "2022-05-06",
  "修改头像和背景图时增加上传进度条"
)(
  "2022-06-13",
  "增加搜贴功能、子评论可以展开了、通知在路上了..."
)(
  "2022-06-14",
  "增加点赞、评论、关注通知、私信聊天"
)(
  "2022-06-27",
  "增加找回密码功能"
)(
  "2022-06-28",
  "手机端增加搜索功能",
  "优化图片加载动画"
)(
  "2022-06-29",
  "私信界面增加时间显示，全局时间显示调整，修复搜索跳转到下一个的bug，调整图片显示，各种优化..."
)(
  "2022-07-02",
  "增加版主标识"
)(
  "2022-07-02",
  "适配浅色模式和深色模式"
)(
  "2022-07-04",
  "图片懒加载优化、增加全站总帖数和个人总帖数"
)(
  "2022-07-05",
  "重写了一个图片预览模块"
)(
  "2022-07-06",
  "图片预览模块优化..."
)
list.reverse()

</script>

<style lang="scss" scoped>
.construct{
  width: 1200px;
  margin: 0 auto;
  .users{
    display: flex;
    flex-direction: column;
    width: 170px;
    height: 90px;
    justify-content: space-around;
    align-items: center;
    border-radius: 5px;
    background: var(--main-text);
    color: var(--main-bg);
    font-weight: bold;
    margin: 0 auto 40px;
    padding: 5px 0;
    span:last-child{
      color: var(--primary-color);
      text-shadow: 1px 1px 1px var(--main-bg);
      font-size: 2em;
    }
  }
  .construct-mid{
    padding: 20px;
    width: 100%;
    background: var(--post-card-bg);
    box-sizing: border-box;
    border-radius: 5px;
    .el-card{
      width: 100%;
      background: var(--secondary-bg);
      color: var(--main-text);
      border-color: var(--post-card-border);
    }
  }
}

@media screen and (max-width: 1200px) {
  .construct{
    width: 100%;
    margin: 0 auto;
  }
}

</style>