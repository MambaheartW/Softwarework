// pages/index/search/search.js
const app = getApp();   //引用全局变量
var key = ""
Page({

  /*** 页面的初始数据 */
  data: {
    list:[],
    likeSucceed: true,                             //默认=1，熄灭状态
    //喜欢图标
    iconlike: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love.png",   
    //添加喜欢成功图标  
    iconlikeSucceed: "cloud://soya-fzu-rice-0grey0qla568ff6f.736f-soya-fzu-rice-0grey0qla568ff6f-1314877683/images/love1.png",         
    
      dialogShow: false,
      showOneButtonDialog: false,
      buttons: [{text: '取消'}, {text: '确定'}],
      array:app.globalData.array,            //引用全局变量
  },
///////////点亮红心///////////////
chooselike: function() {
  let value = this.data.likeSucceed;
  wx.showToast({
    title: '喜欢成功',      //标题
    icon: "success",        //图标类型, 默认success
    duration: 1500                //提示框停留时间, 默认1500ms
  })
  this.setData({
    likeSucceed: !value
  })
  console.log(value)
},
///////////熄灭红心///////////////
choosedislike: function() {
  let value = this.data.likeSucceed;
  wx.showToast({
    title: '移除喜欢成功',      //标题
    icon: "success",        //图标类型, 默认success
    duration: 1500                //提示框停留时间, 默认1500ms
  })
  this.setData({
    likeSucceed: !value
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
  
  /** 生命周期函数--监听页面加载**/
  onLoad(options) {
    key = options.inputValue
    this.getList(options.inputValue)
}, 
  //获取数据
  getList(key) {
    wx.cloud.callFunction({
      name: 'search',
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
        if (res.result.data.length <= 0) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none'
          })
        }
        this.setData
          ({
            list: this.data.list.concat(res.result.data)
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
    this.getList(key)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})