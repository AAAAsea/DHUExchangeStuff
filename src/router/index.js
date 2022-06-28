//引入VueRouter
import store from '@/store'
import {createRouter,  createWebHashHistory} from 'vue-router'
// 引入工具
import { isAccountLoggedIn } from '../utils/auth'
// 进度条动画
// import NProgress from 'nprogress' //加到request里了
// import 'nprogress/nprogress.css'
//创建routes
const	routes=[
		{
			path:'/home',
			redirect: '/'
		},
		{
			path:'/',
			name: '🎈 DHU-广场',
			component: ()=>import("@/views/Home"),
			meta: {
				index: 1,
				title:'🎈 DHU-广场',
			},
		},
		{
			path:'/home/:id',	
			name: '详情',
			component: ()=>import("@/views/PostDetail"),
			props: true,
			meta: {
				title:'详情'
			},
		},
		{
			path:'/tag/:id',	
			name: '话题',
			component: ()=>import("@/views/HotTag"),
			props: true,
			meta: {
				title:'话题'
			},
		},
		{
			path:'/search',	
			name: '搜索',
			component: ()=>import("@/views/Search"),
			props: true,
			meta: {
				title:'搜索'
			},
		},
		{
			path:'/message',	
			name: '消息',
			component: ()=>import("@/views/Message"),
			redirect: "/message/like",
			meta: {
				title:'消息'
			},
			children:[
				{
					path:'/message/like',	
					name: '点赞',
					component: ()=>import("@/components/LikeMessage"),
					meta: {
						title:'点赞'
					},
				},
				{
					path:'/message/comment',	
					name: '评论',
					component: ()=>import("@/components/CommentMessage"),
					meta: {
						title:'评论'
					},
				},
				{
					path:'/message/follow',	
					name: '关注',
					component: ()=>import("@/components/FollowMessage"),
					meta: {
						title:'关注'
					},
				},
				{
					path:'/message/letter',	
					name: '私信',
					component: ()=>import("@/components/LetterMessage"),
					meta: {
						title:'私信'
					},
				}
			]
		},
		{
			path:'/user',
			name: '🐖 DHU-你',
			component: ()=>import("@/views/User"),
			meta: {
				index: 1,
				title:'🐖 DHU-你'
			},
			children:[
				{
					path:'/user/:id',	
					name: '账号主页',
					component: ()=>import("@/components/MinePost"),
					meta: {
						title:'账号主页'
					},
				},
				{
					path:'/user/set',	
					name: '账号设置',
					component: ()=>import("@/components/MineInfo"),
					props: true,
					meta: {
						title:'🔐 账号设置',
						requireAccountLogin: true
					},
				},
				{
					path:'/user/follow/:id',	
					name: '关注用户',
					component: ()=>import("@/components/FollowCard"),
					props: true,
					meta: {
						title:'🔐 关注用户',
						requireAccountLogin: true
					},
				},
				{
					path:'/user/chat/:id',	
					name: '聊天',
					component: ()=>import("@/components/ChatRoom"),
					props: true,
					meta: {
						title:'🔐 聊天',
						requireAccountLogin: true
					},
				},
			]
		},
		{
			path:'/constructing',	
			name: '项目进度',
			component: ()=>import("@/views/Constructing"),
			props: true,
			meta: {
				title:'🔐 constructing',
			},
		},

]
		
//创建router
const router = createRouter({
	history:  createWebHashHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 是否需要登录
	if (to.meta.requireAccountLogin) {
		if (isAccountLoggedIn()) {
			next();
		} else {
			store.state.model.loginModelFlag = true;
		}
	}else{
		// NProgress.start()
		next();
	}
	
})
// 全局后置首位
router.afterEach(to => {
	// 设置title
	document.title = to.meta.title;
	store.state.model.leftDrawerModelFlag = false
	// NProgress.done()
})
export default router;