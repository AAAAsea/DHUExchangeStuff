//1.导入express模块
const express = require('express');
//2.创建web服务器
const app = express();
let postList = [
  {
    id: 0,
    title: "换啤酒",
    avatarUrl: "https://img1.baidu.com/it/u=1997274485,1417839140&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    subTitle: "来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒来个人跟我换啤酒",
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
    ]
  },{
    id: 1,
    title: "换花生",
    avatarUrl: "https://img1.baidu.com/it/u=1073732341,1335771798&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500",
    subTitle: "换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生",
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
    ]
  },{
    id: 2,
    title: "换洗发水",
    avatarUrl: "https://img0.baidu.com/it/u=632813382,2012211699&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=640",
    subTitle: "换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水",
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
    ]
  },{
    id: 3,
    title: "换被子",
    avatarUrl: "https://img2.baidu.com/it/u=578639109,1719840045&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500",
    subTitle: "换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子",
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
    ]
  },{
    id: 4,
    title: "换老公",
    avatarUrl: "https://img2.baidu.com/it/u=661590960,3239484897&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    subTitle: "换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公",
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论"
      },
    ]
  }]
app.get('/postlist', (req, res) => {
  console.log("postlist")
  res.send(postList);
});

app.get('/postdetail', (req, res) => {
  console.log("postdetail",req.query)
  res.send(postList[req.query.id]);
});


//3.调用app.listen()函数启动服务器
app.listen(4000, () => {
    console.log('running at http://127.0.0.1');
})

