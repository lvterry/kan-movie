const util = require('../../utils/util')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
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

  getUserInfo (event) {
    app.globalData.userInfo = event.detail.userInfo
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
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
  }
})