const db = require('../../../utils/db')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    movie: {},
    review: {},
    preview: false,
    hasUserInfo: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo

    if (!userInfo) {
      wx.showToast({
        icon: 'none',
        title: '请先登录',
      })
    }

    this.setData({
      userInfo,
      hasUserInfo: true
    })

    if (options.preview) {
      // preview the review
      let that = this
      
      wx.getStorage({
        key: 'movie',
        success: function (res) {
          that.setData({
            movie: res.data
          })
        },
      })

      this.setData({
        preview: true,
        review: {
          type: options.type,
          content: options.content,
          author: {
            avatar: userInfo.avatarUrl,
            name: userInfo.nickName
          }
        }
      })
    } else {
      //display a review detail
      this.getReview(options.id)
    } 
  },

  addReviewTapped() {
    wx.setStorage({
      key: 'movie',
      data: this.data.movie
    })

    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/me/me',
      })
      return
    }

    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/reviews/new/new',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '功能未实现',
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
  },

  addReview(event) {
    let movieId = this.data.movie._id

    wx.showLoading({
      title: '正在提交...'
    })

    db.addReview({
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content: this.data.review.content,
      type: this.data.review.type,
      movieId: this.data.movie._id
    }).then(res => {
      wx.hideLoading()

      const data = res.result

      if (data) {
        wx.showToast({
          title: '提交成功'
        })

        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/reviews/reviews?movieId=' + movieId,
          })
        }, 1500)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: '提交失败'
      })
    })
  },

  getReview(id) {
    wx.showLoading({
      title: '数据加载中'
    })

    db.getReview(id).then(res => {
      wx.hideLoading()
      this.setData({
        review: res.result,
        movie: res.result.movie
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '获取数据失败'
      })
    })
  },

  addFavorite() {
    if (!this.data.hasUserInfo) {
      wx.navigateTo({
        url: '/pages/me/me',
      })
      return
    }
    wx.showLoading({
      title: '正在收藏'
    })
    db.addFavorite({
      review: this.data.review,
      movie: this.data.movie
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '收藏成功'
      })
      let review = this.data.review
      review.isFavorited = true
      this.setData({
        review
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '收藏失败'
      })
    })
  },

  notImplemented() {
    wx.showToast({
      icon: 'none',
      title: '功能未实现',
    })
  }
})