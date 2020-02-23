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
    this.setData({
      movie: {
        id: options.id,
        title: options.title,
        poster: options.poster
      }
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

  submitButtonTapped: () => {
    wx.navigateTo({
      url: '/pages/reviews/show/show?preview=true',
    })
  }
})