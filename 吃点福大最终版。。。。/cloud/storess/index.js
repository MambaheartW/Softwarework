// 云函数入口文件

const cloud = require('wx-server-sdk')



cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

//筛选界面根据标签返回商家信息

// 云函数入口函数

const db = cloud.database()

const _ = db.command

exports.main = async (event, context) => {

 const wxContext = cloud.getWXContext()

 return await db.collection('BusinessFood').aggregate()

  .lookup({
   from: "Foods",
   localField: "foodid", // 主表连接键，即 article.id
   foreignField: "id", // 子表连接键，即 tag.article_id
   as: "Foods", // 窗口介绍
  })

  .lookup({
   from: "FoodValue",
   localField: "foodid", // 主表连接键，即 article.id
   foreignField: "foodid", // 子表连接键，即 tag.article_id
   as: "Food_Value", // 窗口介绍

  })

  .lookup({
   from: "Business",
   localField: "businessid", // 主表连接键，即 article.id
   foreignField: "id", // 子表连接键，即 tag.article_id
   as: "Bussiness",
  })
  .lookup({
    from: "BusinessValue",
    localField: "businessid", // 主表连接键，即 article.id
    foreignField: "businessid", // 子表连接键，即 tag.article_id
    as: "Bussinessvalue",
   })                                                                
  .match({
    businessid:event.businessid//
  })
  .end()
  
}