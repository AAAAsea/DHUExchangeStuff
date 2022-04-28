const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: process.env.NODE_ENV !== 'evelopment'
                    ? 'http://124.222.191.66' 
                    : 'http://localhost:8081',// 后台接口地址
                ws: false,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite:{	// 重写路径
                    // '^/api':''
                }
            }
        }
    },
    productionSourceMap: false
})
