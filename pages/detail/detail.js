// pages/detail/detail.js
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      j: 0,
      hide: false,
      audioId: '',
      isSpeaking: false,
      audioList: [
          {
              img: "https://lg-5b8938g4-1256973110.cos.ap-shanghai.myqcloud.com/timg.png",
              src: "http://img95.699pic.com/audio/903/039/5aec32fad4d92_all.mp3",
              time:"05月25日",
              sf:0
          },
          {
              img: "https://lg-5b8938g4-1256973110.cos.ap-shanghai.myqcloud.com/userimg.png",
              src: "http://img95.699pic.com/audio/910/107/5aefb5e21be06_all.mp3",
              time: "05月25日",
              sf:1
          }
      ]
  },
  playVoice: function (e) {
      //console.log(e);
      var that = this;
      that.setData({
          hide: true,
          audioId: e.currentTarget.id
      })
      //话筒帧动画  
      var i = 0;
      clearInterval(that.timer);
      that.timer = setInterval(function () {
          i++;
          i = i % 3;
          that.setData({
              j: i
          })
      }, 400);
      var audiosrc = e.currentTarget.dataset.src;
      innerAudioContext.autoplay = false;
      innerAudioContext.play();
      innerAudioContext.src = audiosrc;
      innerAudioContext.onEnded(() => {
          //console.log("停止")
          clearInterval(that.timer);
          that.setData({
              hide: false,
          })
      })
  },
  touchdown: function () {
      var _this = this; 
      console.log("手指按下了...");
      //开始录音 
      _this.setData({
          isSpeaking: true
      })
      wx.startRecord({
          success: function (res) {
              //临时路径,下次进入小程序时无法正常使用 
              var tempFilePath = res.tempFilePath
              console.log("tempFilePath: " + tempFilePath)
              //持久保存 
              wx.saveFile({
                  tempFilePath: tempFilePath,
                  success: function (res) {
                      //持久路径 
                      //本地文件存储的大小限制为 100M 
                      var savedFilePath = res.savedFilePath
                      console.log("savedFilePath: " + savedFilePath)
                  }
              })
              wx.showToast({
                  title: '恭喜!录音成功',
                  icon: 'success',
                  duration: 1000
              })
              //获取录音音频列表 
              wx.getSavedFileList({
                  success: function (res) {
                      console.log(res)
                      var voices = [];
                      for (var i = 0; i < res.fileList.length; i++) {
                          //格式化时间 
                          var createTime = new Date(res.fileList[i].createTime)
                          //将音频大小B转为KB 
                          var size = (res.fileList[i].size / 1024).toFixed(2);
                          var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
                          console.log("文件路径: " + res.fileList[i].filePath)
                         
                          voices = voices.concat(voice);
                      }
                      _this.setData({
                          voices: voices
                      })
                  }
              })
          },
          fail: function (res) {
              //录音失败 
              wx.showModal({
                  title: '提示',
                  content: '录音的姿势不对!',
                  showCancel: false,
                  success: function (res) {
                      if (res.confirm) {
                          console.log('用户点击确定')
                          return
                      }
                  }
              })
          }
      }) 

  },
  //手指抬起 
  touchup: function () {
      console.log("手指抬起了...")
      this.setData({
          isSpeaking: false
      })
      //clearInterval(this.timer)
      wx.stopRecord()
  }, 
  //点击播放录音 
  gotoPlay: function (e) {
      var filePath = e.currentTarget.dataset.key;
      //点击开始播放 
      wx.showToast({
          title: '开始播放',
          icon: 'success',
          duration: 1000
      })
      wx.playVoice({
          filePath: filePath,
          success: function () {
              wx.showToast({
                  title: '播放结束',
                  icon: 'success',
                  duration: 1000
              })
          }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
    bindplay: function (e) {
    
    },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
 
})