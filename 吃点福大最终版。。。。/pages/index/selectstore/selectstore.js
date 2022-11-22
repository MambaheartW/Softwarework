// pages/index/selectstore/selectstore.js
var key = ['简餐', '粉面', '汉堡', '饺子', '炸鸡', '日料', '早餐', '韩料', '西餐', '甜品', '面包', '饮品', '紫荆园', '玫瑰园']
var id = 0;
Page({

  /**页面的初始数据**/
  data: {
    list: [],
    starSucceed: true,                             //默认=1，熄灭状态
    //收藏图标
    iconstar: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/star.png",
    //添加收藏成功图标  
    iconstarSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/star1.png",

    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },

  ///跳转店铺详情
  store: function (e) {
    console.log(e.currentTarget.dataset.storeid)
    wx.navigateTo({
      url: '/pages/store/store?storeid='+e.currentTarget.dataset.storeid,
    })
  },
  ///////////点亮收藏///////////////
  chooselike: function () {
    let value = this.data.starSucceed;
    wx.showToast({
      title: '收藏成功',      //标题
      icon: "success",        //图标类型, 默认success
      duration: 1500                //提示框停留时间, 默认1500ms
    })
    this.setData({
      starSucceed: !value
    })
    console.log(value)
  },
  ///////////熄灭红心///////////////
  choosedislike: function () {
    let value = this.data.starSucceed;
    wx.showToast({
      title: '取消收藏成功',      //标题
      icon: "success",        //图标类型, 默认success
      duration: 1500                //提示框停留时间, 默认1500ms
    })
    this.setData({
      starSucceed: !value
    })
    console.log(value)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    id = options.id - 1
    console.log(key[id])
    this.getList(key[id])
  },
  getList(key) {
    wx.cloud.callFunction({
      name: 'tagbusiness',
      data: {
        key: key,
        length: this.data.list.length
      }
    }
    )
      .then(res => {
        console.log("获取搜索结果成功", res);
        wx.hideLoading()
        //app.globalData.openid=res.result.openid
        if (res.result.list.length <= 0) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        this.setData
          ({
            list: this.data.list.concat(res.result.list)
          })
      })
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        console.log("获取搜索结果失败", err);
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.showLoading({
      title: '加载中'
    })
    this.getList(key[id])
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})