//引入VueRouter
import store from '@/store'
import {createRouter,  createWebHashHistory} from 'vue-router'
// 引入工具
import { isAccountLoggedIn } from '../utils/auth'
//创建routes
const	routes=[
		{
			path:'/',
			redirect: '/home'
		},
		{
			path:'/home',
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
						title:'🔐 账号设置'
					},
				}
			]
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
		next();
	}
	
})
// 全局后置首位
router.afterEach(to => {
	// 设置title
	document.title = to.meta.title;
	store.state.model.leftDrawerModelFlag = false
})
export default router;