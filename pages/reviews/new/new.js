// pages/reviews/new/new.js
Page({

  /**
   * Page initial data
   */
  data: {
    movie: {
      id: 3,
      title: '追随',
      genre: '悬疑 / 惊悚 / 犯罪',
      poster: 'poster3.jpg',
      desc: '比尔（杰里米•希尔伯德 Jeremy Theobald 饰）是个游手好闲的作家，借跟踪陌生人打发时间。这让他体验到形形色色的人生，很神秘，也很刺激。不过，有一次，比尔盯上了一个西服革履的家伙克布（艾利克斯•浩尔 Alex Haw 饰）。'
    },
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
      url: '/pages/reviews/show/show?preview=1',
    })
  }
})