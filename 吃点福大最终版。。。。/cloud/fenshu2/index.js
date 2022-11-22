//需要event.id,foodid（UserFood库中的）

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('FoodValue')
    .add({
      data: {
        foodid: event.foodid,
        id: event.id,
        value: event.value
      }
    })
}