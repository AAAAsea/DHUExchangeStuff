//1.导入express模块
const express = require('express');
//2.创建web服务器
const app = express();
let postList = [
  {
    id: 0,
    title: "换啤酒",
    avatarUrl: "https://img1.baidu.com/it/u=1997274485,1417839140&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    content: "下个月那个很强的系列中端机外观细节就是类似GT2 Pro的三摄排列矩阵模组，细条闪光灯在右侧镜头下方。单孔孔径目测3.8mm±。非对称双扬，实体侧边指纹，顶部3.5mm耳机孔回归~ ",
    time: '2022-04-18 09:01:40',
    tagName: '#10',
    comments: [
      {
        id:0,
        avatarUrl:"https://img1.baidu.com/it/u=2012376574,4042062034&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"4月17日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例2742例。其中境外输入病例19例（四川5例，北京4例，上海3例，广东3例，云南2例，福建1例，广西1例），含2例由无症状感染者转为确诊病例（广东1例，四川1例"
      },
      {
        id:1,
        avatarUrl:"https://img0.baidu.com/it/u=3249553370,1997602126&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"午觉睡醒，脑壳迷糊了好一阵，天花板和墙纸都很陌生，整个人被一个念头（或一句话）死死占据：“怎么变成这样的”。躺床上往窗外看，只能看到天，没有房子也没有树冠。去年这个时候住在四楼，树冠和天空平分画面。如果把它们想像成海，就会真的很像海。"
      },{
        id:2,
        avatarUrl:"https://img2.baidu.com/it/u=3157001577,1779563894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"昨天也劝朋友这是一场共业，唉。//@洛之秋:三友人就是这样劝约伯安心受着的，劝他把不合理的苦难合理化，劝他耐心等待神圣的救赎。惟独约伯不信，他愤怒地质问那个神——神不以为忤，反而称赞约伯的诚实。所以，去你妈的消业。//@圆觉傅李剑锋: 消业的过程很痛苦。唉，众生生来皆苦。"
      },{
        id:3,
        avatarUrl:"https://img0.baidu.com/it/u=2311398155,2815501652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=912",
        nickName:"Asea",
        time:"2022-04-17 20:10:35",
        content:"昨天也劝朋友这是一场共业，唉。//@洛之秋:三友人就是这样劝约伯安心受着的，劝他把不合理的苦难合理化，劝他耐心等待神圣的救赎。惟独约伯不信，他愤怒地质问那个神——神不以为忤，反而称赞约伯的诚实。所以，去你妈的消业。//@圆觉傅李剑锋: 消业的过程很痛苦。唉，众生生来皆苦。"
      },
    ]
  },{
    id: 1,
    title: "换花生",
    avatarUrl: "https://img1.baidu.com/it/u=1073732341,1335771798&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500",
    content: "换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生换花生",
    tagName: '#20',
    time: '2022-04-18 09:01:40',
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
    time: '2022-04-18 09:01:40',
    tagName: '#15',
    content: "换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水换洗发水",
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
    time: '2022-04-18 09:01:40',
    tagName: '#24',
    content: "换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子换被子",
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
    tagName: '#15',
    time: '2022-04-18 09:05:18',
    content: "换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公换老公",
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

