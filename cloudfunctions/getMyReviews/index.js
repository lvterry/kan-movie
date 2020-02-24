// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()

  let reviewRes = await db.collection('review').where({
    user: wxContext.OPENID
  }).get()

  let reviews = reviewRes.data

  return reviews
}