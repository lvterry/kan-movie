// pages/reviews/new/new.js
Page({

  /**
   * Page initial data
   */
  data: {
    movie: {},
    audio: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.audio) {
      this.setData({ audio: true })
    }
    let that = this
    let movie = wx.getStorage({
      key: 'movie',
      success: function(res) {
        that.setData({
          movie: res.data
        })
      },
    })
  },

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  submitButtonTapped() {
    let content = this.data.reviewContent
    if (!content) { return }

    wx.navigateTo({
      url: '/pages/reviews/show/show?preview=true&type=text&content=' + content
    })
  },

  notImplemented() {
    wx.showToast({
      icon: 'none',
      title: '功能未实现',
    })
  }
})