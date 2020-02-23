//const util = require('./util')

const db = wx.cloud.database({
  env: 'mini-store-op3rr'
})

module.exports = {
  getMovies() {
    return db.collection('movies').get()
  },

  getMovie(id) {
    return db.collection('movies').doc(id).get()
  },

  addReview(data) {
    return wx.cloud.callFunction({
      name: 'addReview',
      data,
    })
  },
}
