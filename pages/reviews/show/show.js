// pages/reviews/show/show.js
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
    review: {
      id: 2,
      type: 'audio',
      content: '随着叙述的深入，一个年轻人孤单的生活展现在观众面前。他没有工作，一个人住在污秽的单身公寓里，读柏拉图，想成为一名作家却连承认这一梦想的勇气都没有，对梦露这样的金发美女有着性幻想（他床头张贴着梦露的海报），没有朋友，是“一条缺乏社交的可怜虫”。孤独超过了一定限度就容易发生心理变态行为，我们的主人公开始尾随陌生人，偷窥他们的生活和工作，陶醉于一些意想不到的发现之中。',
      author: {
        avatar: 'jia.jpg',
        name: '加书亚在路上'
      }
    },
    preview: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(parseInt(options.preview))
    this.setData({
      preview: parseInt(options.preview)
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

  addReviewTapped: () => {
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/reviews/new/new',
          })
        } else {
          wx.navigateTo({
            url: '/pages/reviews/new/new?audio=true',
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  editButtonTapped: () => {
    wx.navigateBack()
  }
})