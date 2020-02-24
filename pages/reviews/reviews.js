const db = require('../../utils/db.js')

Page({

  /**
   * Page initial data
   */
  data: {
    reviews: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      movieId: options.movieId || ''
    })
    this.getReviews()
  },

  getReviews(callback) {
    db.getReviews(this.data.movieId).then(res => {
      this.setData({
        reviews: res.data
      })
      callback()
    }).catch(err => {
      console.log(err)
      callback()
    })
  },

  reviewItemTapped(event) {
    let reviewId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=' + reviewId,
    })
  },

  onPullDownRefresh() {
    this.getReviews(() => {
      wx.stopPullDownRefresh()
    })
  }
})