// index.js
const app = getApp(); //引用全局变量
const db = wx.cloud.database()
Page({

  data: {
    list: [],
    listtag: [], //存放标签取出的数据
    select_tag: [{
        tagname: '简餐',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/salad.png',
        id: '1'
      },
      {
        tagname: '粉面',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/ramen.png',
        id: '2'
      },
      {
        tagname: '汉堡',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/burgers.png',
        id: '3'
      },
      {
        tagname: '饺子',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/dumplings.png',
        id: '4'
      },
      {
        tagname: '炸鸡',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/fried chicken.png',
        id: '5'
      },
      {
        tagname: '日料',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/sushi.png',
        id: '6'
      },
      {
        tagname: '早餐',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/bao.png',
        id: '7'
      },
      {
        tagname: '韩料',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/bibimbap.png',
        id: '8'
      },
      {
        tagname: '西餐',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/steak.png',
        id: '9'
      },
      {
        tagname: '甜品',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/cake.png',
        id: '10'
      },
      {
        tagname: '面包',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/croissant.png',
        id: '11'
      },
      {
        tagname: '饮品',
        tagphoto: 'cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/boba.png',
        id: '12'
      },
    ],
    tagname: '',
    inputValue: '', //搜索框输入内容
    likeSucceed: '', //默认=1，熄灭状态
    iconlike: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love.png", //喜欢图标
    iconlikeSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love1.png", //添加喜欢成功图标  

    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    array: app.globalData.array, //引用全局变量

    id: '', ///存放标签id
    dishid: ""
  },
  ////搜索框输入
  searchinput: function (e) {
    if (e.detail.value.length < 1) {
      this.setData({
        inputValue: 搜索,
      })
    } else {
      this.setData({
        inputValue: e.detail.value, //搜索内容
      })
    }
    //console.log(e.detail.value);
    console.log(this.data.inputValue);
  },
  //搜索
  search: function () {
    if (this.data.inputValue != '') {
      wx.navigateTo({
        url: './search/search?inputValue=' + this.data.inputValue,
      })
    } else {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //清空搜索框内容
  clean: function () {
    this.setData({
      inputValue: ' ',
    })
  },

  //筛选紫荆园店
  zijing: function (e) {
    this.setData({
      id: 13
    })
    wx.cloud.callFunction({

        name: 'storemessage',

        data: {
          id: this.data.id
        }
      })
      .then(res => {
        console.log("获取紫荆成功", res);
        //app.globalData.openid=res.result.openid

        //console.log(this.data.list[0].point[0].id)
      })
      .catch(err => {
        console.log("获取紫荆失败", err);
      })
    wx.navigateTo({
      url: './selectstore/selectstore?id=' + this.data.id,
    })
  },

  //筛选玫瑰园店
  meigui: function (e) {
    this.setData({
      id: 14
    })
    wx.cloud.callFunction({
        name: 'storemessage',
        data: {
          id: this.data.id
        }
      })
      .then(res => {
        console.log("获取玫瑰园成功", res);
        //app.globalData.openid=res.result.openid

        //console.log(this.data.list[0].point[0].id)
      })
      .catch(err => {
        console.log("获取玫瑰园失败", err);
      })
    console.log(this.data.id)
    wx.navigateTo({
      url: './selectstore/selectstore?id=' + this.data.id,
    })
  },

  //筛选标签店
  tagstore: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      id: e.currentTarget.dataset.id
    })
    wx.cloud.callFunction({
        name: 'storemessage',
        data: {
          id: e.currentTarget.dataset.id
        }
      })
      .then(res => {
        console.log("获取标签_店成功", res);
        //app.globalData.openid=res.result.openid
        this.setData({
          listtag: res.result.data,
        })
        //console.log(this.data.list[0].point[0].id)
      })
      .catch(err => {
        console.log("获取标签_店失败", err);
      })
    // console.log(this.data.id)
    console.log("ndifjkxdhfihdxi")
    console.log(this.data.listtag.length)

    /* if(this.data.listtag.length>0){
         wx.navigateTo({
           url: './selectstore/selectstore?id='+e.currentTarget.dataset.id,
        })
      }
      else{
        wx.navigateTo({
          url: './selectstore/selectstore null/selectstore null',
       })
      }*/
    wx.navigateTo({
      url: './selectstore/selectstore?id=' + e.currentTarget.dataset.id,
    })

  },


  //跳转随机一款页面
  select_1: function () {
    wx.navigateTo({
      url: './select_1/select_1',
    })
  },
  //跳转随机三款页面
  select_3: function () {
    wx.navigateTo({
      url: './select_3/select_3',
    })
  },
  ///跳转菜品详情
  dish: function (e) {
    app.globalData.currentFood = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/dish/dish',
    })
  },


  ///////////点亮红心///////////////
  chooselike: function (e) {
    console.log("123456")
    let value = e.currentTarget.dataset.liked;
    this.data.dishid = e.currentTarget.dataset.dishid;
    console.log(value + "fudifjdkfjk")
    console.log(this.data.dishid)
    wx.showToast({
      title: '喜欢成功', //标题
      icon: "success", //图标类型, 默认success
      duration: 1500 //提示框停留时间, 默认1500ms
    })
    this.setData({
      likeSucceed: !value,
    })

    console.log(this.data.likeSucceed)
    wx.cloud.callFunction({
        name: "changelike",
        data: {
          likeSucceed: this.data.likeSucceed,
          dishid: this.data.dishid
        }
      })
      .then(res => {
        console.log("1111获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
        this.setData({
          list: res.result,
        })

      })
      .catch(err => {
        console.log("获取菜品失败", res)
      })
    /*wx.cloud.callFunction(
      {
        name:"dish1" , 
      }
    )
    .then(res  =>{
        console.log("1111获取菜品成功",res);
        //app.globalData.openid=res.result.openid
        this.setData
        ({
          list:res.result,
        })
        
    })
    .catch(err =>{
      console.log("获取菜品失败",res)
    })*/
  },
  ///////////熄灭红心///////////////
  choosedislike: function (e) {
    console.log("456789")
    let value = e.currentTarget.dataset.liked;
    let dishid = e.currentTarget.dataset.dishid;
    console.log(value)
    console.log(dishid)

    wx.showToast({
      title: '移除喜欢成功', //标题
      icon: "success", //图标类型, 默认success
      duration: 1500 //提示框停留时间, 默认1500ms
    })
    this.setData({
      likeSucceed: !value
    })
    console.log(this.data.likeSucceed)
    wx.cloud.callFunction({
        name: "changelike",
        data: {
          likeSucceed: this.data.likeSucceed,
          dishid: dishid
        }
      })
      .then(res => {
        console.log("2222获取喜欢成功", res);
        //app.globalData.openid=res.result.openid
        this.setData({
          list: res.result,
        })

      })
      .catch(err => {
        console.log("2222获取菜品失败", err)
      })
    /*
    wx.cloud.callFunction(
      {
        name:"dish1" , 
      }
    )
    .then(res  =>{
        console.log("获取菜品成功",res);
        //app.globalData.openid=res.result.openid
        this.setData
        ({
          list:res.result,
        })
        
    })
    .catch(err =>{
      console.log("获取菜品失败",res)
    })*/
  },


  ///////////取消推荐弹窗////////////
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },

  /*scroll触底*/
  upperFunction: function (e) {
    console.log('已到达顶部');
  },
  lowerFunction: function (e) {
    console.log('已到达底部');
  },

  ///////////////////////////
  gettag: function (tagid) {
    wx.cloud.database().collection("Tags").
    where({
        id: 3
      })
      .get()
      .then(res => {
        console.log("获取成功!!!", res)
        // app.globalData.openid=res.result.openid
        this.setData({
          tagname: res.data[0].name,
        })
        console.log(this.data.tagname + "dsidhjsh")
      })
    return tagname;
  },

  ////页面加载函数/////
  onLoad(options) {
    wx.showModal({
      title: '登录提示',
      content:'确定登录吗',
      success (res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              console.log(res.userInfo)
              app.globalData.userInfoDetail = res.userInfo
              wx.showToast({
                title:'登录成功',
                duration:1000,
                icon:'success',
                mask:true
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title:'用户点击取消',
            duration:1000,
            icon:'success',
            mask:true
          })
          console.log('用户点击取消')
        }
      }
    })
    //调用云函数显示热门推荐
    //console.log(app.globalData.openid);
    wx.cloud.callFunction({
        name: "dish1",
      })
      .then(res => {
        console.log("获取菜品成功", res);
        //app.globalData.openid=res.result.openid
        this.setData({
          list: res.result,
        })

      })
      .catch(err => {
        console.log("获取菜品失败", err)
      })
      console.log(this.data.list.tedian.length)
    /////////////////////////////////////////////
    wx.cloud.database().collection("Tags").
    where({
        id: 3
      })
      .get()
      .then(res => {
        console.log("获取成功6565656", res)
        // app.globalData.openid=res.result.openid
        /*this.setData({
          tagname:res.result.list,
        })*/

      })
      .catch(res => {
        console.log("获取失败3121212", err)
      })
    ////////////////////////////
  },




  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  showwd: function () {

  },
  showtk: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})