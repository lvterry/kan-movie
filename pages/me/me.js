const util = require('../../utils/util')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    movies: []
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
  },
})