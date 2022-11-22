// pages/filter.js
var whatFoods=['面','饭','炸物','粉肠'];
var dat={"restaurantData":[]};
var d=[
  {
   restaurantId:0,
   imgrest:'/images/index.png',
   restName:'桃桃养乐多',
   restAddress:'玫瑰园',
   restDetail: '校园送',
   collection:false,
   flavour:['准时'],
  },
  {
    restaurantId:1,
   imgrest:'/images/logo.png',
   restName:'兄弟烧烤',
   restAddress:'玫瑰园',
   restDetail: '脆香可口',
   collection:false,
   flavour:['量大','免配送费','特别好吃'] 
  },
  {
    restaurantId:2,
    imgrest:'/images/logo.png',
    restName:'螺蛳粉',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:3,
    imgrest:'/images/logo.png',
    restName:'福鼎肉片',
    restAddress:'紫荆园',
    restDetail: '脆香可口',
    collection:false,
    flavour:['热情掌柜','“经常点蛋炒饭”'] 
   },
   {
    restaurantId:4,
    imgrest:'/images/logo.png',
    restName:'杨国福麻辣烫',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:5,
    imgrest:'/images/logo.png',
    restName:'粗粮鱼粉',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:6,
    imgrest:'/images/logo.png',
    restName:'豪吉客汉堡',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:7,
    imgrest:'/images/logo.png',
    restName:'花甲粉',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:8,
    imgrest:'/images/logo.png',
    restName:'烤冷面',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:9,
    imgrest:'/images/logo.png',
    restName:'手抓饼',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   },
   {
    restaurantId:10,
    imgrest:'/images/logo.png',
    restName:'新疆炒米粉',
    restAddress:'二层3号',
    restDetail: '脆香可口',
    collection:false,
    flavour:['好吃','很好吃','特别好吃'] 
   }
  ];
let temp=new Array();
var diningRoom=['玫瑰园','紫荆园'];
var labelSelect=true;
var diningSelect=true;
var nothingl=true;
var nothingr=true;
var flag=true;
var words=new Array();
var rooms=new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name:'select',
      data:{

      }
    }).then(res=>{
      console.log(res);
      var obj={};
      temp=res.result;
      dat.restaurantData=[];
      temp.forEach((item)=>{
        obj.restaurantId=item.data.id;
        obj.restName=item.data.name;
        obj.restAddress=item.data.address;
        obj.restDetail=item.data.sort;
        dat.restaurantData.push(obj);
        obj={};
      });
    }).catch(err=>{
      console.log(err);
    });
    words=[];
    rooms=[];
    let obj={};
    whatFoods.forEach((item)=>{
        obj.word=item;
        obj.show=false;
        words.push(obj);
        obj={};
    });
    diningRoom.forEach((item)=>{
      obj.room=item;
      obj.show=false;
      rooms.push(obj);
      obj={};
  });
    this.setData({
      leftselected:diningSelect,
      rightselected:labelSelect,
      foods:words,
      initData:dat.restaurantData,
      diningRooms:rooms,
      nothingl:true,
      nothingr:true
    });
  },

/**
 * 点击小星星收藏
 */
onTapCollect(event){
  var index=event.currentTarget.dataset.restaurantId;
  restaurantData[index].collection=!restaurantData[index].collection;
  this.setData({
    initData:restaurantData
  });
  wx.showToast({
    title:restaurantData[index].collection? '谢谢收藏':'取消成功',
    duration:1000,
    icon:'success',
    mask:true
  })
},
/**
 * 点击左侧按钮
 */
onTapLeft(){
   diningSelect=false;
   labelSelect=true;
   this.setData({
     diningRooms:rooms,
     leftselected:diningSelect,
     rightselected:labelSelect
  })
},
/**
 * 点击右侧按钮
 */
onTapRight(){
  labelSelect=false;
  diningSelect=true;
  this.setData({
    foods:words,
    rightselected:labelSelect,
    leftselected:diningSelect
  })
},
/**
 * 隐藏选择餐厅页面
 */
onTapLeftCancel(event){
  diningSelect=true;
    this.setData({
      leftselected:diningSelect
    })
},
/**
 *  隐藏选择标签页面
 */
onTapRightCancel(event){
  labelSelect=true;
  this.setData({
    rightselected:labelSelect
  })
},
/**
 * 取消推荐
 */
onTapDislike(event){
  wx.showModal({
    title: '不喜欢',
    content: '以后将不会再向您推荐此菜品',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
/**
 * 标签被点击
 */
onTapFoods(event){
  let idx=event.currentTarget.dataset.index;
  let cr=true;
  words.forEach((item,index)=>{
    if(index===idx){
      item.show=!item.show;      
    }else{
      item.show=false;
    }
    if(item.show){
      cr=false;
    }
  });
  this.setData({
    foods:words,
    nothingr:cr
  });
},
/**
 * 餐厅被点击
 */
onTapRooms(event){
  console.log(event);
  let idx=event.currentTarget.dataset.index;
  let cl=true;
  rooms.forEach((item,index)=>{
    if(index===idx){
      item.show=!item.show;      
    }else{
      item.show=false;
    }
    if(item.show){
      cl=false;
    }
  });
  this.setData({
    diningRooms:rooms,
    nothingl:cl
  });
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