const db = wx.cloud.database({
  env: 'mini-store-op3rr'
})

const app = getApp()

const util = require('util.js')

module.exports = {
  getMovies() {
    return db.collection('movies').get()
  },

  getMovie(id) {
    return wx.cloud.callFunction({
      name: 'getMovie',
      data: {
        id
      },
    })
  },

  addReview(data) {
    return wx.cloud.callFunction({
      name: 'addReview',
      data,
    })
  },

  getReviews(movieId) {
    return db.collection('review').where({
      movieId: movieId
    }).orderBy('createTime', 'desc').get()
  },

  getReview(id) {
    return wx.cloud.callFunction({
      name: 'getReview',
      data: {
        id
      },
    })
  },

  getRandomReview() {
    return wx.cloud.callFunction({
      name: 'getRandomReview'
    })
  },

  addFavorite(data) {
    if (app.globalData.userInfo) {
      return wx.cloud.callFunction({
        name: 'addFavorite',
        data,
      })
    }
  },

  getFavorites() {
    return wx.cloud.callFunction({
      name: 'getFavorites'
    })
  },

  getMyReviews() {
    return wx.cloud.callFunction({
      name: 'getMyReviews'
    })
  },

  uploadAudioFile(filePath){
    return wx.cloud.uploadFile({
      cloudPath: `review/${util.getId()}`,
      filePath: filePath,
    })
  }

}
