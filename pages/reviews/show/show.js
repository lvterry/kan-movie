const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    movie: {},
    review: {},
    preview: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    let userInfo = app.globalData.userInfo

    if (!userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }

    wx.getStorage({
      key: 'movie',
      success: function(res) {
        that.setData({
          movie: res.data
        })
      },
    })

    this.setData({
      review: {
        type: options.type,
        content: options.content,
        author: {
          avatar: userInfo.avatarUrl,
          name: userInfo.nickName
        }
      }
    })

    if (options.preview) {
      this.setData({
        preview: true
      })
    }
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