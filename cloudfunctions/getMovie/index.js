// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const movieRes = await db.collection('movies').doc(event.id).get()
  const movie = movieRes.data

  const movieId = movie._id
  const user = wxContext.OPENID

  const reviewRes = await db.collection('review').where({
    movieId,
    user
  }).get()

  const review = reviewRes.data
  
  if (review.length > 0) {
    movie.hasReview = true
    movie.reviewId = review[0]._id
  } else {
    movie.hasReview = false
  }

  return movie
}