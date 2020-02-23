// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let user = wxContext.OPENID

  const favoriteRes = await db.collection('favorites').where({
    user,
    review
  }).count()

  const isFavorited = parseInt(favoriteRes.total) > 0

  if (!isFavorited) {
    await db.collection('favorites').add({
      data: {
        user,
        review: event.review,
        moviePoster: event.movie.poster,
        movieName: event.movie.title,
        createdAt: +new Date()
      }
    })
  }
  
  return {}
}