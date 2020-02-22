//const util = require('./util')

const db = wx.cloud.database({
  env: 'mini-store-op3rr'
})

module.exports = {
  getMovies() {
    return db.collection('movies').get()
  },

  // getProductDetail(id) {
  //   return wx.cloud.callFunction({
  //     name: 'productDetail',
  //     data: {
  //       id
  //     },
  //   })
  // },

  // addToOrder(data) {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'addToOrder',
  //         data,
  //       })
  //     })
  //     .catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // getOrders() {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'getOrders',
  //       })
  //     })
  //     .catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // addToCart(data) {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'addToCart',
  //         data,
  //       })
  //     }).catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // getCart() {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'getCart',
  //       })
  //     }).catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // updateCart(list) {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'updateCart',
  //         data: {
  //           list,
  //         },
  //       })
  //     }).catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // addReview(data) {
  //   return util.isAuthenticated()
  //     .then(() => {
  //       return wx.cloud.callFunction({
  //         name: 'addReview',
  //         data,
  //       })
  //     }).catch(() => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: 'Please Login First'
  //       })
  //       return {}
  //     })
  // },

  // getReviews(productId) {
  //   return db.collection('review').where({
  //     productId,
  //   }).get()
  // },

  // uploadImage(imgPath) {
  //   return wx.cloud.uploadFile({
  //     cloudPath: `review/${util.getId()}`,
  //     filePath: imgPath,
  //   })
  // },
}
