// app.js
const app = getApp();
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'soya-fzu-rice-0grey0qla568ff6f',
    })
  },
  globalData: {
    userInfoDetail: {
      userName: '',
      gender: '',
      age: '',
      birthday: '',
      constellation: '',
      location: '',

    },
    currentFood:{},
    array: [{
        dishname: '凉皮',
        dishprice: 10,
        storename: '鸡动马达许阿姨凉皮',
        address: '紫荆园1楼',
        dishphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dish1.jpg',
        storephoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/store1.jpg',
        point: '4.3',
        introduce: '这是一段介绍',
        tags: ["特点1", "特点2", "特点3", "特点4", "特点5"],
        likeSucceed: true
      },
      {
        dishname: '沙茶面',
        storename: '漳州风味小吃',
        address: '紫荆园2楼',
        dishphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dish21.jpg',
        storephoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/store2.jpg',
        point: '4.5',
        introduce: '这是一段介绍',
        tags: ["特点1", "特点2", "特点3", "特点4", "特点5"],
        likeSucceed: true
      },
      {
        dishname: '漳州鸭面',
        storename: '漳州风味小吃',
        address: '紫荆园2楼',
        dishphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dish22.jpg',
        storephoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/store2.jpg',
        point: '4.6',
        introduce: '这是一段介绍',
        tags: ["特点1", "特点2", "特点3", "特点4", "特点5"]
      },
      {
        dishname: '水煮鱼',
        storename: '食汇特色水煮',
        address: '紫荆园2楼',
        dishphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dish31.jpg',
        storephoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/store3.jpg',
        point: '4.4',
        introduce: '这是一段介绍',
        tags: ["特点1", "特点2", "特点3", "特点4", "特点5"]
      },
      {
        dishname: '金汤无骨鱼',
        storename: '食汇特色水煮',
        address: '紫荆园2楼',
        dishphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dish32.jpg',
        storephoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/store3.jpg',
        point: '4.2',
        introduce: '这是一段介绍',
        tags: ["特点1", "特点2", "特点3", "特点4", "特点5"]
      },
      {
        dishname: '',
        storename: '',
        address: '',
        dishphoto: '',
        storephoto: '',
        point: '',
        introduce: '',
        tags: ["", ""]
      },
    ],
  }
})