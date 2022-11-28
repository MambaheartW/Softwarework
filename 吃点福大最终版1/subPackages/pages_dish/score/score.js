const app = getApp()
Page({
  data: {
    value: 2,
  },
  onLoad() {
    this.setData({
      currentFood: app.globalData.currentFood
    })
  },
  onChange(e) {
    console.log("onChange", e)
    this.setData({
      value: e.detail
    })
  },

  submit: function (e) {
    console.log("2222", this.data.value)
    wx.cloud.callFunction({
      name: 'fenshu2',
      data: {
        foodid: this.data.currentFood.data.foodid,
        id: this.data.currentFood.data.id,
        value: this.data.value
      }
    }).then(res => {
      console.log('成功', res)
      // 提示框
      wx.showModal({
        title: '提示',
        content: '已完成评分！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          } else {
            wx.navigateBack()
          }
        }
      })
    }).catch(res => {
      console.log('失败', res)
      wx.showToast({
        title: '评分失败',
      })
    })

  },
  last: function () {
    wx.navigateTo({
      url: '/pages/dish/dish',
    })
  },


})