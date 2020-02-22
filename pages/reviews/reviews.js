// pages/reviews/reviews.js
Page({

  /**
   * Page initial data
   */
  data: {
    reviews: [
      {
        id: 1,
        content: '我昨天看完以后在剧情上纠结了很长时间，有很多为什么...',
        author: {
          avatar: 'yi.jpg',
          name: '小小易'
        }
      },
      {
        id: 2,
        content: '随着叙述的深入，一个年轻人孤单的生活展现在观众面前...',
        author: {
          avatar: 'jia.jpg',
          name: '加书亚在路上'
        }
      }
    ]
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

  reviewItemTapped: () => {
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=8',
    })
  }
})