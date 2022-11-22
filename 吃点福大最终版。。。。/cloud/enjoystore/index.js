// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
    //直接通过wxcontext获取该用户的openid
    var openid = wxContext.OPENID;

    var like= await cloud.database().collection("UserBusiness")
    .where({ userid:openid }).count()
    var likeres=like.total

    var likes=[]
    for(var i=0;i<likeres;i+=100)
    {     var data2= await cloud.database().collection("UserBusiness")
          .where({ userid:openid })
          .skip(i)
          .get()
          likes=likes.concat(data2.data)
    }

    const  result= await cloud.database().collection('Business').count();
    var limits=result.total;
    var list=[]
  
    for(var i=0;i<limits;i+=20){
    var data1 = await cloud.database().collection("Business")
    .aggregate()
    .lookup({
      from: "BusinessValue",
      localField: "id", // 主表连接键，即 article.id
      foreignField: "businessid", // 子表连接键，即 tag.article_id
      as: "point", // 评分
    })
    .skip(i)
    .end();
    list=list.concat(data1.list)
  }

    var len1 =limits

    var lists=[]
    for(var i=0;i<len1;i++)
    { 
      const per = {}
      //拼接自己想要的信息
      per.data = list[i]
      var x=list[i].id;
      var f=0;
      for(var j=0;j<likeres;j++)
      {    if(likes[j].businessid==x)   
          {
            f=1;
            break;
          }
              
      }
      if(f==1)
      {
          per.liked=true
          lists.push(per)
      }
      else
      {
          per.liked=false
      }
      // 返回对象    
    }
    return lists;
}