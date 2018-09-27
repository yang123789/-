// pages/study/study.js
import { Study } from 'study-model.js';
var study = new Study();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      studylist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },
    goAnswer: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../fullAnswer/fullAnswer?id=' + id,
        })
    },
    gofull:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../full/full?id=' + id,
        })
    },
    gonoapply: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../noapply/noapply?id=' + id,
        })
    },
    goGoing:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../ongoing/ongoing?id=' + id,
        })
    },
    gointegral:function(){
        wx.navigateTo({
            url: '../mine/mine',
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
      study.studylist((data) => {
          console.log(data);
          this.setData({
              studylist: data
          })
      });
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
  // onShareAppMessage: function () {
  
  // }
})