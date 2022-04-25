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
			name: '🎲 DHU-讨论',
			component: ()=>import("@/views/Detail"),
			props: true,
			meta: {
				index: 1,
				title:'🎲 DHU-讨论',
			}
		},
		{
			path:'/mine',	
			name: '🐖 DHU-你',
			component: ()=>import("@/views/Mine"),
			props: true,
			meta: {
				index: 1,
				requireAccountLogin: true,
				title:'🐖 DHU-你',

			},
			children: [
				{//在地址为空时，直接跳转cell路由
          path:'',
          redirect:'/mine/post',
        },
				{
					path: 'post',
					name: '📑 我的帖子',
					component: ()=>import("@/components/MinePost"),
					meta:{
						requireAccountLogin: true,
					}
				},
				{	
					path: 'info',
					name: '🔐 账户设置',
					component:  ()=>import("@/components/MineInfo"),
					meta:{
						requireAccountLogin: true,
					}
				},
			],
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