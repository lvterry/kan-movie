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

  reviewItemTapped(event) {
    let reviewId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=' + reviewId,
    })
  }
})