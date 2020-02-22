// pages/me/me.js
Page({

  /**
   * Page initial data
   */
  data: {
    movies: [
      {
        id: 2,
        title: '利刃出鞘',
        genre: '剧情 / 喜剧 / 悬疑 / 犯罪',
        poster: 'poster2.jpg',
        review: {
          content: '我昨天看完以后在剧情上纠结了很长时间，有很多为什么...',
          author: {
            avatar: 'yi.jpg',
            name: '小小易'
          }
        }
      },
      {
        id: 3,
        title: '追随',
        genre: '悬疑 / 惊悚 / 犯罪',
        poster: 'poster3.jpg',
        review: {
          content: '随着叙述的深入，一个年轻人孤单的生活展现在观众面前...',
          author: {
            avatar: 'jia.jpg',
            name: '加书亚在路上'
          }
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

  }
})