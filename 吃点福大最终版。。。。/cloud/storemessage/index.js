//返回商家信息
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // return cloud.database().collection('Business')
  // .get()
  //   .then(res => {
  //     return res
  //   })
  //   .catch(res =>{
  //     return res
  //   })
    if(event.id == '13')
    {
      return await db.collection('Business').where({
        address: _.eq("紫荆园一层").or(_.eq("紫荆园二层"))
      })
      .get()
    }
    else if(event.id == '14')
    {
      return await db.collection('Business').where({
        address: _.eq("玫瑰园二层").or(_.eq("玫瑰园一层"))
      })
      .get()
    }
    else if(event.id == '1')
    {
      return await db.collection('Business').where({
        sortid:1
      })
      .get()
    }
    else if(event.id == '2')
    {
      return await db.collection('Business').where({
        sortid:2
      })
      .get()
    }
    else if(event.id == '3')
    {
      return await db.collection('Business').where({
        sortid:3
      })
      .get()
    }
    else if(event.id == '4')
    {
      return await db.collection('Business').where({
        sortid:4
      })
      .get()
    }
    else if(event.id == '5')
    {
      return await db.collection('Business').where({
        sortid:5
      })
      .get()
    }
    else if(event.id == '6')
    {
      return await db.collection('Business').where({
        sortid:6
      })
      .get()
    }
    else if(event.id == '7')
    {
      return await db.collection('Business').where({
        sortid:7
      })
      .get()
    }
    else if(event.id == '8')
    {
      return await db.collection('Business').where({
        sortid:8
      })
      .get()
    }
    else if(event.id == '9')
    {
      return await db.collection('Business').where({
        sortid:9
      })
      .get()
    }
    else if(event.id == '10')
    {
      return await db.collection('Business').where({
        sortid:10
      })
      .get()
    }
    else if(event.id == '11')
    {
      return await db.collection('Business').where({
        sortid:11
      })
      .get()
    }
    else 
    {
      return await db.collection('Business').where({
        sortid: 1
    })
      .get()
    }
}