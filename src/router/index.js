//引入VueRouter
import {createRouter,  createWebHashHistory} from 'vue-router'

//创建routes
const	routes=[
		{
			path:'/',
			name: '广场',
			component: ()=>import("@/views/Home"),
			meta: {
				index: 1
			}
		},
    {
			path:'/detail/:id',	
			name: 'Detail',
			component: ()=>import("@/views/Detail"),
			props: true,
			meta: {
				index: 1
			}
		},
		{
			path:'/mine',	
			name: '我',
			component: ()=>import("@/views/Mine"),
			props: true,
			meta: {
				index: 1
			}
		},
]
		
//创建router
const router = createRouter({
	history:  createWebHashHistory(),
  routes
})

// 全局前置守卫
// router.beforeEach((to, from, next) => {
// 	// 是否需要登录
// 	if (to.meta.requireAccountLogin) {
// 		if (isAccountLoggedIn()) {
// 			next();
// 		} else {
// 			next({ path: '/loginphone' });
// 		}
// 	}else if(to.path.startsWith('/login'))
// 	{
// 		if (!isAccountLoggedIn()) {
// 			next();
// 		}else(
// 			next({ path: '/library' })
// 		)
// 	}else{
// 		next();
// 	}
	
// })

export default router;