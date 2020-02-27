const db = require('../../../utils/db.js')
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    movie: {},
    audio: false,
    recording: 0 //0: not started, 1: in progress; 2: finished
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.audio) {
      this.setData({ audio: true })
    }
    let that = this
    let movie = wx.getStorage({
      key: 'movie',
      success: function(res) {
        that.setData({
          movie: res.data
        })
      },
    })

    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onInput(event) {
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  submitButtonTapped() {
    if (this.data.audio) {
      this.submitAudioReview()
    } else {
      this.previewContent()
    }
  },

  previewContent(){
    let content = this.data.reviewContent
    if (!content) { return }

    wx.navigateTo({
      url: '/pages/reviews/show/show?preview=true&type=text&content=' + content
    })
  },

  submitAudioReview() {
    let movieId = this.data.movie._id

    if(this.data.recording === 2) {
      wx.showLoading({
        title: '正在提交'
      })

      this.uploadAudioFile(filePath => {
        db.addReview({
          username: this.data.userInfo.nickName,
          avatar: this.data.userInfo.avatarUrl,
          content: '',
          type: 'audio',
          filePath,
          duration: this.data.duration,
          movieId: this.data.movie._id,
          movieName: this.data.movie.title,
          moviePoster: this.data.movie.poster
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
      })
    }
  },

  startRecording() {
    const recorderManager = wx.getRecorderManager()
    const that = this

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath, duration } = res
      that.setData({
        recording: 2,
        duration,
        tempFilePath
      })
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }

    recorderManager.start(this.recordingOptions())

    this.setData({
      recording: 1,
      recorderManager
    })
  },

  stopRecording() {
    this.data.recorderManager.stop()
  },

  restartRecording() {
    this.setData({
      recording: 1,
      audioPlaying: false
    })
    this.data.recorderManager.start(this.recordingOptions())
  },

  recordingOptions() {
    return {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
  },

  playAudio() {
    let innerAudioContext = this.data.innerAudioContext
    if (!innerAudioContext) {
      innerAudioContext = wx.createInnerAudioContext()
      this.setupAudioContext(innerAudioContext)
      this.setData({ innerAudioContext })
    }
    
    innerAudioContext.src = this.data.tempFilePath

    if (this.data.audioPlaying) {
      innerAudioContext.stop()
    } else {
      innerAudioContext.play()
    }
    
  },

  setupAudioContext(context) {
    const that = this

    context.onPlay(() => {
      console.log('开始播放')
      that.setData({
        audioPlaying: true
      })
    })
    context.onStop(() => {
      console.log('停止播放')
      that.setData({
        audioPlaying: false
      })
    })
    context.onEnded(() => {
      console.log('播放结束')
      that.setData({
        audioPlaying: false
      })
    })
    context.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      that.setData({
        audioPlaying: false
      })
    })
  },

  uploadAudioFile(callback) {
    const tempFilePath = this.data.tempFilePath

    if (tempFilePath) {
      db.uploadAudioFile(tempFilePath).then(result => {
        console.log(result)
        callback && callback(result.fileID)
      }).catch(err => {
        console.log('err', err)
      })
    } else {
      callback && callback('')
    }
  }
})