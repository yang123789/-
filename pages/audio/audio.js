// pages/radio/radio.js
import { Book } from '../book/book-model.js';
var book = new Book();
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      j: 0,
      hide:false,
      audioId:'',
      playbtn: true,
      playbtn1: true,
      toubtn:false,
      rulesbtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          options: options
      })
      var id = 0;
      var daytime = options.daytime;
      book.book(id, daytime, (data) => {
          console.log(data);
          this.setData({
              book: data
          })
      });
      
  },
    playVoice: function (e) {
        console.log(e);
        var playbtn = e.currentTarget.dataset.play;
        var that = this;
        that.setData({
            hide: true,
            audioId: e.currentTarget.id
        })
        var audiosrc = e.currentTarget.dataset.src;
        innerAudioContext.autoplay = false;
        innerAudioContext.src = audiosrc;
        //话筒帧动画  
        if (playbtn == true) {
            that.setData({
                playbtn: false
            })
            var i = 0;
            clearInterval(that.timer);
            that.timer = setInterval(function () {
                i++;
                i = i % 3;
                that.setData({
                    j: i
                })
            }, 400);
            innerAudioContext.play();
        } else {
            that.setData({
                playbtn: true
            })
            innerAudioContext.stop();
            clearInterval(that.timer);
            that.setData({
                hide: false,
            })
        }
        innerAudioContext.onEnded(() => {
            //console.log("停止")
            clearInterval(that.timer);
            that.setData({
                hide: false,
            })
        })
    },
  vote:function(e){
      var id=e.target.dataset.id;
      var that=this;
      that.setData({
          toubtn:true
      })
      book.vote(id, (data) => {
          wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000
          })
          that.setData({
              toubtn: false
          })
          that.onLoad(that.data.options);
      });
  },
    openrules: function () {
        this.setData({
            rulesbtn: true
        })
    },
    closerules: function () {
        this.setData({
            rulesbtn: false
        })
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