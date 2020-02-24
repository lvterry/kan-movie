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

  // attach movie info to review
  const movieRes = await db.collection('movies').doc(review.movieId).get()
  const movie = movieRes.data

  review.movie = movie

  review.author = {
    avatar: review.avatar,
    name: review.username
  }

  // check if the review is favorited by current user
  const favoriteRes = await db.collection('favorites').where({
    user,
    review
  }).count()

  review.isFavorited = parseInt(favoriteRes.total) > 0

  // check if current user had written review for this movie
  const reviewRes2 = await db.collection('review').where({
    movieId: review.movieId,
    user
  }).get()

  const reviewsOfThisUserAndMovie = reviewRes2.data

  if (reviewsOfThisUserAndMovie.length > 0) {
    review.hasReview = true
    review.previousReviewId = reviewsOfThisUserAndMovie[0]._id
  } else {
    review.hasReview = false
  }

  return review
}