// 云函数入口文件
//注意：
// 其中 userid 是 微信用户唯一的 标识 也就是指openid
// 

const cloud = require('wx-server-sdk')
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})
const db = cloud.database();
const wxContext = cloud.getWXContext()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 //增
  var openid = wxContext.OPENID
  if(event.option=='add'){
    db.collection('UserBusiness').add({
      //花括号里面是你要添加的对象
      data: event.addData//addData是一个类
    })
    //要得到数据（js里面）
    // add:function(e){
    // console.log(e);
    // wx.cloud.callFunction({
    //   name: 'storerike',
    //   data: {
    //     option: 'add',
    //     addData:{
    //       userid:this.data._openid,  // 请前端那边获取一下_openid
    //       businessid:this.data.businessid
    //     }
    //   }
    //}
    //event:包含传过来的所有数据的一个对象

  //是否进行刷新，因为该函数只实现了收藏与移除收藏
  // return await db.collection('UserBusiness').aggregate()
  //   .lookup({
  //     from: "Business",
  //     localField: "businessid", // 主表连接键，即 article.id
  //     foreignField: "id", // 子表连接键，即 tag.article_id
  //     as: "business_user", // 窗口介绍
  //   }).match({
  //     userid:openid//真正使用的时候会改成_openid,这里先以UserBusinesses数据里面为准
  //   })
  //   .end()
  }

//删
else if(event.option=="delete"){
    db.collection('UserBusiness').where({
    businessid:event.businessid,//店家的id
    userid:event._openid//用户的id，实际使用的时候，改成_openid
  }).remove();
  //js里面
  // removeDataFn:function(){
  //   wx.cloud.callFunction({
  //     name: 'storerike',
  //     data: {
  //       option: 'delete',
  //       //要删除的数据
  //        businessid:this.data.businessid
  //        userid:this.data._openid//请前端那边获取一下_openid的数据
  //     },

  //是否进行刷新，因为该函数只实现了收藏与移除收藏
  // return await db.collection('UserBusiness').aggregate()
  //   .lookup({
  //     from: "Business",
  //     localField: "businessid", // 主表连接键，即 article.id
  //     foreignField: "id", // 子表连接键，即 tag.article_id
  //     as: "business_user", // 窗口介绍
  //   }).match({
  //     userid:openid//得到用户的id
  //   })
  //   .end()
}
//查
}
