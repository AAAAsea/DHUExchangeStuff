//1.导入express模块
const express = require('express');
//2.创建web服务器
const app = express();
let postList = {
  "code": 0,
  "message": null,
  "data": [
    {
      "post": {
        "id": 275,
        "userId": 11,
        "title": "我是管理员",
        "content": "我是管理员，你们都老实点！",
        "type": 1,
        "status": 1,
        "createTime": "2019-05-16T02:58:44.000+0000",
        "commentCount": 12,
        "score": 1751.2900346113624
      },
      "user": {
        "id": 11,
        "username": "nowcoder11",
        "password": "25ac0a2e8bd0f28928de3c56149283d6",
        "salt": "49f10",
        "email": "nowcoder11@sina.com",
        "type": 1,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/11t.png",
        "createTime": "2019-04-17T01:11:27.000+0000"
      }
    },
    {
      "post": {
        "id": 234,
        "userId": 111,
        "title": "玄学帖",
        "content": "据说玄学贴很灵验，求大佬捞捞我这个菜鸡给个机会！",
        "type": 1,
        "status": 0,
        "createTime": "2019-04-13T01:54:04.000+0000",
        "commentCount": 13,
        "score": 1718.1335389083702
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 280,
        "userId": 149,
        "title": "事务",
        "content": "事务的4个特性，包括原子性、一致性、隔离性、持久性。",
        "type": 0,
        "status": 0,
        "createTime": "2019-05-20T01:41:30.000+0000",
        "commentCount": 16,
        "score": 1755.2095150145426
      },
      "user": {
        "id": 149,
        "username": "niuke",
        "password": "ebce124c4ba2de3be92dc9a3bc1ea75b",
        "salt": "90196",
        "email": "nowcoder149@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "d7a5714a145b4461b5a4199cc5a0014f",
        "headerUrl": "http://images.nowcoder.com/head/149t.png",
        "createTime": "2019-05-16T23:48:11.000+0000"
      }
    },
    {
      "post": {
        "id": 277,
        "userId": 149,
        "title": "Spring Cache",
        "content": "Spring Cache RedisCacheManager",
        "type": 0,
        "status": 0,
        "createTime": "2019-05-17T01:06:54.000+0000",
        "commentCount": 38,
        "score": 1752.5797835966168
      },
      "user": {
        "id": 149,
        "username": "niuke",
        "password": "ebce124c4ba2de3be92dc9a3bc1ea75b",
        "salt": "90196",
        "email": "nowcoder149@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "d7a5714a145b4461b5a4199cc5a0014f",
        "headerUrl": "http://images.nowcoder.com/head/149t.png",
        "createTime": "2019-05-16T23:48:11.000+0000"
      }
    },
    {
      "post": {
        "id": 276,
        "userId": 149,
        "title": "新人报道",
        "content": "新人报道，请多关照！",
        "type": 0,
        "status": 0,
        "createTime": "2019-05-16T23:50:18.000+0000",
        "commentCount": 6,
        "score": 1751.806179973984
      },
      "user": {
        "id": 149,
        "username": "niuke",
        "password": "ebce124c4ba2de3be92dc9a3bc1ea75b",
        "salt": "90196",
        "email": "nowcoder149@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "d7a5714a145b4461b5a4199cc5a0014f",
        "headerUrl": "http://images.nowcoder.com/head/149t.png",
        "createTime": "2019-05-16T23:48:11.000+0000"
      }
    },
    {
      "post": {
        "id": 274,
        "userId": 146,
        "title": "我要offer",
        "content": "跪求offer~~~",
        "type": 0,
        "status": 1,
        "createTime": "2019-05-14T19:34:14.000+0000",
        "commentCount": 37,
        "score": 1750.6522463410033
      },
      "user": {
        "id": 146,
        "username": "lihonghe",
        "password": "100489ece9bacfa4d57eb5777b4d4643",
        "salt": "00d7a",
        "email": "nowcoder146@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "5a61faee7af94e89ba7237b1277c9fed",
        "headerUrl": "http://images.nowcoder.com/head/146t.png",
        "createTime": "2019-04-28T19:47:24.000+0000"
      }
    },
    {
      "post": {
        "id": 273,
        "userId": 145,
        "title": "哈哈",
        "content": "哈哈哈哈",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-27T23:32:45.000+0000",
        "commentCount": 2,
        "score": 1732.3802112417115
      },
      "user": {
        "id": 145,
        "username": "lhh",
        "password": "d980a16ea0b3c8a81062ee806e65a4bc",
        "salt": "5abfc",
        "email": "nowcoder145@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "f217b637e9544e2a9b4a88f78c583d03",
        "headerUrl": "http://images.nowcoder.com/head/145t.png",
        "createTime": "2019-04-27T23:30:36.000+0000"
      }
    },
    {
      "post": {
        "id": 271,
        "userId": 138,
        "title": "public",
        "content": "public static void main",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-24T23:22:16.000+0000",
        "commentCount": 2,
        "score": 1729.3802112417115
      },
      "user": {
        "id": 138,
        "username": "yyy",
        "password": "046291c11cdfb896aa7cd48714bb6352",
        "salt": "968fc",
        "email": "nowcoder138@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "69dcd69f4c0145058df820e90820ba1e",
        "headerUrl": "http://images.nowcoder.com/head/138t.png",
        "createTime": "2019-04-24T23:18:07.000+0000"
      }
    },
    {
      "post": {
        "id": 270,
        "userId": 138,
        "title": "xxx",
        "content": "xxx",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-24T22:45:18.000+0000",
        "commentCount": 6,
        "score": 1729.7923916894983
      },
      "user": {
        "id": 138,
        "username": "yyy",
        "password": "046291c11cdfb896aa7cd48714bb6352",
        "salt": "968fc",
        "email": "nowcoder138@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": "69dcd69f4c0145058df820e90820ba1e",
        "headerUrl": "http://images.nowcoder.com/head/138t.png",
        "createTime": "2019-04-24T23:18:07.000+0000"
      }
    },
    {
      "post": {
        "id": 265,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的&ldquo;哀嚎&rdquo;与&ldquo;悲惨遭遇&rdquo;牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过&ldquo;寒冬&rdquo;，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&amp;19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-24T18:14:05.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 249,
        "userId": 134,
        "title": "&lt;script&gt;alert(1);&lt;/script&gt;",
        "content": "&lt;script&gt;alert(1);&lt;/script&gt;",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-19T02:16:02.000+0000",
        "commentCount": 1,
        "score": 0.0
      },
      "user": {
        "id": 134,
        "username": "www",
        "password": "3d3aeebb9cd302ae581dfa8fedd86ceb",
        "salt": "dfc00",
        "email": "nowcoder134@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/134t.png",
        "createTime": "2019-04-19T02:13:57.000+0000"
      }
    },
    {
      "post": {
        "id": 248,
        "userId": 134,
        "title": "lhh",
        "content": "aaa",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-19T02:15:25.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 134,
        "username": "www",
        "password": "3d3aeebb9cd302ae581dfa8fedd86ceb",
        "salt": "dfc00",
        "email": "nowcoder134@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/134t.png",
        "createTime": "2019-04-19T02:13:57.000+0000"
      }
    },
    {
      "post": {
        "id": 247,
        "userId": 133,
        "title": "haha",
        "content": "haha",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-19T01:25:27.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 133,
        "username": "vvv",
        "password": "252c226ba0a601ec3fa4d7c58b2291d9",
        "salt": "13211",
        "email": "nowcoder133@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/133t.png",
        "createTime": "2019-04-18T19:08:55.000+0000"
      }
    },
    {
      "post": {
        "id": 246,
        "userId": 133,
        "title": "Good",
        "content": "Good Morning",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-18T19:37:23.000+0000",
        "commentCount": 3,
        "score": 1723.5314789170423
      },
      "user": {
        "id": 133,
        "username": "vvv",
        "password": "252c226ba0a601ec3fa4d7c58b2291d9",
        "salt": "13211",
        "email": "nowcoder133@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/133t.png",
        "createTime": "2019-04-18T19:08:55.000+0000"
      }
    },
    {
      "post": {
        "id": 245,
        "userId": 111,
        "title": "Spring Boot整合Elasticsearch",
        "content": "Elasticsearch是一款分布式搜索引擎框架",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-17T00:27:58.000+0000",
        "commentCount": 1,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 244,
        "userId": 111,
        "title": "哎呀",
        "content": "好艰难啊好艰难!",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T19:59:00.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 243,
        "userId": 111,
        "title": "因特网哈哈",
        "content": "好啊",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T19:58:43.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 242,
        "userId": 111,
        "title": "爱国",
        "content": "我叫王爱国, 我爱中华人民共和国!",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T06:22:38.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 241,
        "userId": 111,
        "title": "华人",
        "content": "我爱中华人民共和国",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T06:22:19.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 240,
        "userId": 111,
        "title": "日本",
        "content": "大日本帝国",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T05:51:01.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 239,
        "userId": 111,
        "title": "美国",
        "content": "美利坚合众国",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T05:50:44.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 238,
        "userId": 111,
        "title": "中国",
        "content": "中华人民共和国",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-16T05:50:33.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 237,
        "userId": 111,
        "title": "测试2",
        "content": "测试2",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-13T06:20:31.000+0000",
        "commentCount": 7,
        "score": 1717.9242792860618
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 236,
        "userId": 111,
        "title": "测试1",
        "content": "测试1",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-13T02:33:39.000+0000",
        "commentCount": 2,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 235,
        "userId": 111,
        "title": "揭秘时尚科技的力量",
        "content": "它是最时尚的互联网公司之一，\n致力于帮助人们发现流行趋势；\n它是专注于科技的电商企业，\n力图让人们享受更优质的购物体验。",
        "type": 0,
        "status": 1,
        "createTime": "2019-04-13T02:24:41.000+0000",
        "commentCount": 1,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 233,
        "userId": 111,
        "title": "Hello",
        "content": "Hello World",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-09T19:10:00.000+0000",
        "commentCount": 15,
        "score": 1715.2741578492637
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 232,
        "userId": 132,
        "title": "发一个",
        "content": "发一个帖子, 哈哈!",
        "type": 0,
        "status": 1,
        "createTime": "2019-04-07T23:57:57.000+0000",
        "commentCount": 7,
        "score": 1713.167317334748
      },
      "user": {
        "id": 132,
        "username": "uuu",
        "password": "a80ba77157d2fd9c67dd3187907cef42",
        "salt": "f1113",
        "email": "nowcoder132@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/278t.png",
        "createTime": "2019-04-07T22:07:04.000+0000"
      }
    },
    {
      "post": {
        "id": 231,
        "userId": 132,
        "title": "灌水",
        "content": "新人灌水",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-07T22:08:11.000+0000",
        "commentCount": 1,
        "score": 0.0
      },
      "user": {
        "id": 132,
        "username": "uuu",
        "password": "a80ba77157d2fd9c67dd3187907cef42",
        "salt": "f1113",
        "email": "nowcoder132@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/278t.png",
        "createTime": "2019-04-07T22:07:04.000+0000"
      }
    },
    {
      "post": {
        "id": 230,
        "userId": 131,
        "title": "新人报道",
        "content": "新人报道,请多关照!",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-07T20:09:17.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 131,
        "username": "ttt",
        "password": "d50960f067142c59cc3bdac61b87759f",
        "salt": "72450",
        "email": "nowcoder131@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/677t.png",
        "createTime": "2019-04-07T20:05:49.000+0000"
      }
    },
    {
      "post": {
        "id": 229,
        "userId": 112,
        "title": "lala",
        "content": "lalalalala",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-05T06:33:00.000+0000",
        "commentCount": 1,
        "score": 1709.0791812460477
      },
      "user": {
        "id": 112,
        "username": "bbb",
        "password": "216dc48902665b6a6dba534717d49592",
        "salt": "90ad0",
        "email": "nowcoder112@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/112t.png",
        "createTime": "2019-04-04T02:36:24.000+0000"
      }
    },
    {
      "post": {
        "id": 228,
        "userId": 111,
        "title": "ccc",
        "content": "ccc",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:37:38.000+0000",
        "commentCount": 9,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 226,
        "userId": 111,
        "title": "&lt;script&gt;alert(1);&lt;/script&gt;",
        "content": "&lt;script&gt;alert(1);&lt;/script&gt;",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:21:04.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 225,
        "userId": 111,
        "title": "kkk",
        "content": "kkk",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:20:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 224,
        "userId": 111,
        "title": "ggg",
        "content": "ggg",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:20:16.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 223,
        "userId": 111,
        "title": "qqq",
        "content": "qqq",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:19:44.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 222,
        "userId": 111,
        "title": "www",
        "content": "www",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:18:20.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 221,
        "userId": 111,
        "title": "ddd",
        "content": "ddd",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:17:24.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 220,
        "userId": 111,
        "title": "heihei",
        "content": "heihei",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:16:10.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 219,
        "userId": 111,
        "title": "hehe",
        "content": "hehe",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:12:47.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 218,
        "userId": 111,
        "title": "haha",
        "content": "hahahaha",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-04T01:10:38.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 111,
        "username": "aaa",
        "password": "b8ca3cbc6fd57c78736c66611a7e7044",
        "salt": "167f9",
        "email": "nowcoder111@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/111t.png",
        "createTime": "2019-04-02T23:31:19.000+0000"
      }
    },
    {
      "post": {
        "id": 177,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 178,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 179,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 180,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 181,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 182,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 183,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 184,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 185,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 186,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    },
    {
      "post": {
        "id": 187,
        "userId": 103,
        "title": "互联网求职暖春计划",
        "content": "今年的就业形势，确实不容乐观。过了个年，仿佛跳水一般，整个讨论区哀鸿遍野！19届真的没人要了吗？！18届被优化真的没有出路了吗？！大家的“哀嚎”与“悲惨遭遇”牵动了每日潜伏于讨论区的牛客小哥哥小姐姐们的心，于是牛客决定：是时候为大家做点什么了！为了帮助大家度过“寒冬”，牛客网特别联合60+家企业，开启互联网求职暖春计划，面向18届&19届，拯救0 offer！",
        "type": 0,
        "status": 0,
        "createTime": "2019-04-03T19:53:37.000+0000",
        "commentCount": 0,
        "score": 0.0
      },
      "user": {
        "id": 103,
        "username": "zhangfei",
        "password": "390ba5f6b5f18dd4c63d7cda170a0c74",
        "salt": "12345",
        "email": "nowcoder103@sina.com",
        "type": 0,
        "status": 1,
        "activationCode": null,
        "headerUrl": "http://images.nowcoder.com/head/100t.png",
        "createTime": "2019-04-02T20:04:55.000+0000"
      }
    }
  ]
}

app.get('/postlist', (req, res) => {
  console.log("postlist")
  res.send(postList);
});

app.get('/postdetail', (req, res) => {
  console.log("postdetail",req.query)
  res.send(postList.data[req.query.id]);
});

app.post('/postlist', (req, res) => {
  console.log(req.query)
  postList.data.unshift({
    post: {
      ...req.query
    },
    user: {
      headerUrl: "http://images.nowcoder.com/head/11t.png"
    }
  })
  res.send("ok");
});

//3.调用app.listen()函数启动服务器
app.listen(4000, () => {
    console.log('running at http://127.0.0.1');
})

