// pages/w_test/w_test.js
var store1 = ''
var len = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list : [],
      obj1 :{
        name:'',
        address:''
      },
      store : '',
  },
  getlist()
  {
    wx.cloud.callFunction()({
      name:'enjoystore'
    })
    .then(res => {
      console.log("成功",res)
    })
      .catch(res => {
        console.log("失败",res)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() 
  {
    wx.cloud.callFunction()({
      name:'enjoystore'
    })
    .then(res => {
      console.log("成功",res)
    })
      .catch(res => {
        console.log("失败",res)
      })
  }
})