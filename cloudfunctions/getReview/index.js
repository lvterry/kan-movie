// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  const reviewRes = await db.collection('review').doc(event.id).get()
  const review = reviewRes.data

  const movieRes = await db.collection('movies').doc(review.movieId).get()
  const movie = movieRes.data

  review.movie = movie

  review.author = {
    avatar: review.avatar,
    name: review.username
  }

  const favoriteRes = await db.collection('favorites').where({
    user,
    review
  }).count()

  review.isFavorited = parseInt(favoriteRes.total) > 0

  return review
}