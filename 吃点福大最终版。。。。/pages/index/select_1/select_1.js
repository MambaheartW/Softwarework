// pages/index/select_1/select_1.js
const app = getApp();   //引用全局变量
Page({

  /*** 页面的初始数据*/
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
      randomnum:(Math.random() * 5).toFixed(0)  //随机数 Math.random
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

/////再来一次,重新设置随机下标值/////////
  again:function(){
    wx.cloud.callFunction(
      {
        name:"randomdish" , 
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
    })

  },

  /**生命周期函数--监听页面加载**/
  onLoad(options) {
      //console.log(app.globalData.openid);
      wx.cloud.callFunction(
        {
          name:"randomdish" , 
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})