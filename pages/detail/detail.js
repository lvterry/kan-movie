const db = require('../../utils/db')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    movie: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.id) {
      this.getMovie(options.id)
    }
  },

  viewReviews () {
    wx.navigateTo({
      url: '/pages/reviews/reviews?movieId=' + this.data.movie._id,
    })
  },

  addReviewTapped (){
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
            url: '/pages/reviews/new/new'
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

  getMovie(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovie(id).then(result => {
      wx.hideLoading()
      const movie = result.data
      if (movie) {
        if (movie.desc.length > 100) {
          movie.desc = movie.desc.substr(0, 100) + '...'
        }
        this.setData({
          movie
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  }
})