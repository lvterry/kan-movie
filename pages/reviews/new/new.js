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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

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
      url: '/pages/reviews/show/show?preview=true&content=' + content
    })
  }
})