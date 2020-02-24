const util = require('../../utils/util')
const db = require('../../utils/db')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    favorites: []
  },

  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              that.getFavorites()
            }
          })
        }
      }
    })

    
  },

  getUserInfo(event) {
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
    this.getFavorites()
  },

  getFavorites() {
    wx.showLoading({
      title: '正在加载'
    })
    db.getFavorites().then(res => {
      wx.hideLoading()
      let favorites = res.result
      favorites.forEach(item => {
        if (item.review.content.length > 24) {
          item.review.content = item.review.content.substr(0, 24) + '...'
        }
      })
      this.setData({ favorites })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '加载失败'
      })
    })
  },

  showReview(event) {
    let reviewId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/reviews/show/show?id=' + reviewId,
    })
  }
})