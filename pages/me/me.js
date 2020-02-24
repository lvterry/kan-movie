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
    favorites: [],
    currentTab: 0
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

  getFavorites(callback) {
    wx.showLoading({
      title: '正在加载'
    })
    db.getFavorites().then(res => {
      wx.hideLoading()
      callback && callback()
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
      callback && callback()
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
  },

  getMyReviews(callback) {
    wx.showLoading({
      title: '正在加载'
    })
    db.getMyReviews().then(res => {
      wx.hideLoading()
      callback && callback()
      let reviews = res.result
      console.log(reviews)
      reviews.forEach(item => {
        if (item.content.length > 24) {
          item.content = item.content.substr(0, 24) + '...'
        }
        item.review = {
          _id: item._id,
          avatar: item.avatar,
          username: item.username,
          content: item.content
        }
      })
      this.setData({ favorites: reviews })
      
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      callback && callback()
      wx.showToast({
        icon: 'none',
        title: '加载失败'
      })
    })
  },

  changeTab(event) {
    let id = parseInt(event.currentTarget.dataset.index)
    if (id !== this.data.currentTab) {
      this.setData({
        currentTab: id,
        favorites: []
      })
      // load data
      if (id === 0) {
        this.getFavorites()
      } else {
        this.getMyReviews()
      }
    }
  },

  onPullDownRefresh() {
    if (this.data.currentTab === 0) {
      this.getFavorites(() => {
        wx.stopPullDownRefresh()
      })
    } else {
      this.getMyReviews(() => {
        wx.stopPullDownRefresh()
      })
    }
  }


})