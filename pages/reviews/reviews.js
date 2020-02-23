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

  getReviews() {
    db.getReviews(this.data.movieId).then(res => {
      this.setData({
        reviews: res.data
      })
    })
  },

  reviewItemTapped() {
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=8',
    })
  }
})