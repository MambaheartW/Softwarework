// pages/restaurant/restaurant.js
let category=[{name:''}];
let words=new Array();
let dish=[
];
let card={};
let datas={};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drName:'兰庭居',
    drAddress:'刀枪街20号',
    imgcard:'../../images/index.png',
    list:[],
    liststore:[],
  },
  /**
   * 点击分数到下一页
   */
onTapGrade(e){
  console.log(e.currentTarget.dataset.dishid)
  wx.navigateTo({
    url: '../dish/dish?dishid='+e.currentTarget.dataset.dishid,
  })
},
/**
 * 点击全部
 * @param {} options 
 */
onTapAll(){

},
/**
 * 点击条目
 * @param {index} options 
 */
onTapItem(event){
  console.log(event);
  let idx=event.currentTarget.dataset.index;
  words.forEach((item,index)=>{
    if(index===idx){
      item.show=!item.show;      
    }else{
      item.show=false;
    }
  });
  this.setData({
    categories:words
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("参数是："+options.storeid);
    wx.cloud.callFunction({
      name:'storess',
      //name:'sortback',
      data:{
        businessid:Number( options.storeid)
      }
    })
    .then(res=>{
      console.log("获取店铺详情成功", res);
      this.setData({
        
        list:res.result.list,
        liststore:res.result.list[0].Bussiness
      }) 
      
      /*console.log(res);
      card.drName=res.result.list[0].Bussiness[0].name;
      card.drAddress=res.result.list[0].Bussiness[0].address;
      card.score=res.result.list[0].Food_Value[0].value;
      card.imgcard=res.result.list[0].Bussiness[0].photo;
      let obj={};
      dish=[];
      res.result.list.forEach((item)=>{
        obj.name=item.Foods[0].name;
        obj.price=item.Foods[0].price;
        obj.id=item.Foods[0].id;
        dish.push(obj);
        obj={};
      });
      category[0].name=res.result.list[0].Foods[0].sortx;
    })*/
  })
    .catch(err=>{
      console.log(err);
    });
     /* let obj={};
      words=[];
      category.forEach((item)=>{
          obj.word=item.name;
          obj.show=false;
          words.push(obj);
          obj={};
      });
      this.setData({
        datas:card,
        categories:words,
        dishes:dish
      })*/

     
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