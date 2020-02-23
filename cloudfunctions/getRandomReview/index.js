// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const countRes = await db.collection('review').count()
  const count = countRes.total
  
  const skip = Math.floor(Math.random() * parseInt(count, 10))
  const reviewRes = await db.collection('review').skip(skip).get()
  const review = reviewRes.data[0]

  const movieRes = await db.collection('movies').doc(review.movieId).get()
  const movie = movieRes.data

  review.movie = movie

  return review
}