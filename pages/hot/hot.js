const db = require('../../utils/db')


Page({

  /**
   * Page initial data
   */
  data: {
    movies: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMovies()
  },

  movieTapped: (event) => {
    let movieId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + movieId
    })
  },

  getMovies() {
    wx.showLoading({
      title: '加载中',
    })

    db.getMovies().then(result => {
      wx.hideLoading()
      const movies = result.data
      if (movies.length) {
        this.setData({
          movies
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  }
})