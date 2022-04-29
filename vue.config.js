const { defineConfig } = require('@vue/cli-service')
// Element自动导入（icon需要手动导入，v-loading无法导入请不要使用，可以看issue4885）
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
                pathRewrite: process.env.NODE_ENV === 'evelopment' 
                ?
                {	// 重写路径
                    '^/api':''
                } 
                : {}
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            AutoImport({
            resolvers: [ElementPlusResolver()],
            }),
            Components({
            resolvers: [ElementPlusResolver()],
            }),
        ],
    },
})
