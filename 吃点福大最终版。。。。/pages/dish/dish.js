const app = getApp()
// 获取应用实例
Page({
  data: {
    tagArr: [{
      id: 1,
      name: "酸",
      num: 1
    }],
    value: 2,
    showView: true,
    icon_like: 'https://img2022.cnblogs.com/blog/2580100/202211/2580100-20221114162623017-1594140391.png',
    icon_unlike: 'https://img2022.cnblogs.com/blog/2580100/202211/2580100-20221114162632566-1704191628.png',
    like: false, //是否已点赞
    count: 0 //点赞数量
  },
  // 点击添加标签
  addTag(e) {
    let tagArr = this.data.tagArr
    let item = e.currentTarget.dataset.item
    let tagName = item.name
    console.log(tagName)

    var ret2 = tagArr.find((v) => {
      return v.name == tagName;
    });

    if (ret2 && ret2.name) { //添加过
      tagArr.forEach(item => {
        if (item.name == tagName) {
          item.num += 1
        }
      })
    } else { //没有添加过
      tagArr.push({
        id: 66,
        name: tagName,
        num: 1
      })
    }
    this.setData({
      tagArr
    })


    // return {id:233, name:'jobs'}



  },
  onLoad(e) {
    let food = app.globalData.currentFood
    this.setData({
      currentFood: food
    })
    //console.log("curr"+app.globalData.currentFood)



    // 获取标签列表
    wx.cloud.database().collection('Tags').get()
      .then(res => {
        console.log('标签列表', res)
        this.setData({
          list: res.data
        })
      })
  },
  onShow() {
    wx.cloud.database().collection('FoodValue')
      .where({
        foodid:this.data.currentFood.foodid
      }).get()
      .then(res=>{
        console.log('得分',res)
        let arr=res.data
        if (arr) {
          let valueNum = 0
          arr.forEach(item => {
            valueNum += item.value
          })
          let value = Math.ceil(valueNum / arr.length)
          this.setData({
            value: value
          })
        }
      })

  },
  onChange(event) {
    Toast('当前值：' + event.detail);
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`,
    });
  },
  showButton: function () {
    var that = this;
    that.setData({
      showView: false
    })
  },
  hideButton: function () {
    var that = this;
    that.setData({
      showView: true
    })
  },
  next_calculator: function () {

    wx.navigateTo({
      url: '/pages/dish/score/score',
    })
  },
  last: function () {
    wx.navigateTo({
      url: '/pages/store/store',
    })
  },
  //点赞
  onLike(e) {
    wx.vibrateShort() //手机振动API
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
    let like = this.properties.like
    let count = this.properties.count
    count = like ? count - 1 : count + 1
    if (!like) {
      setTimeout(function () {
        this.animation.scale(1.5).step();
        this.animation.scale(1.0).step();
        this.setData({
          animation: this.animation.export()
        });
      }.bind(this), 50);
      wx.cloud.callFunction({
          name: 'dishlike2',
          data: {
            id: 0,
            foodid: 7,
            userid: 4
          }
        })
        .then(res => {
          console.log('添加喜欢成功', res)
        })
        .catch(res => {
          console.log('添加喜欢失败', res)
        })
    } else {
      wx.cloud.callFunction({
          name: 'dishlike2',
          data: {
            id: 1,
            foodid: 7,
            userid: 4
          }
        })
        .then(res => {
          console.log('取消喜欢成功22', res)
        })
        .catch(res => {
          console.log('取消喜欢失败22', res)
        })
    }
    this.setData({
      count,
      like: !like
    })
  }
})