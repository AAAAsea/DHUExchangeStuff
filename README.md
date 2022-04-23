# 东华以物易物平台（开发中...）

## 前台开发说明

1. clone
2. npm install 
3. npm run serve
4. 如果无法启动，多半是npm安装sass失败导致的，请执行`cnpm i node-sass sass-loader style-loader -D`
5. npm run serve（重新启动）
6. 对接后端接口应该再`vue.config.js`里修改，找到`proxy`配置项，修改后端地址即可
7. 如果提示跨域问题，确定`/src/utils/request.js`里的baseUrl中的localhost还是127.0.0.1，访问两者结果并不一样

## 需要解决的问题
1. 获取评论
2. 点赞
3. tag重复加一
4. 获取热门tag
5. 根据tag获取postList
6. 根据posti的id获取post详情（包括评论）
7. 字符编码