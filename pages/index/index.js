const db = require('../../utils/db')
const app = getApp()

Page({
  data: {
    review: {}
  },
  onLoad: function () {
    this.getRandomReview()
  },

  showMovie() {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.review.movie._id,
    })
  },

  showReview() {
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=' + this.data.review._id,
    })
  },

  getRandomReview() {
    wx.showLoading({
      title: '数据加载中'
    })
    db.getRandomReview().then(res => {
      wx.hideLoading()
      this.setData({
        review: res.result
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '获取数据失败'
      })
    })
  }
})
