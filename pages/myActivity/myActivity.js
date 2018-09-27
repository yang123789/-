// pages/myActivity/myActivity.js
import { User } from '../user/user-module.js';
var user = new User();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      user.myfungread((data) => {
          console.log(data);
          this.setData({
              myact: data
          })
      });
  },
  goact: function (e) {
      var dtype = e.currentTarget.dataset.dtype;
      var daytime = e.currentTarget.dataset.daytime;
      if (dtype == 1) {
          wx.navigateTo({
              url: '../guoxue/guoxue?daytime=' + daytime,
          })
      } else if (dtype == 2) {
          wx.navigateTo({
              url: '../jiezi/jiezi?daytime=' + daytime,
          })
      } else if (dtype == 3) {
          wx.navigateTo({
              url: '../shuji/shuji?daytime=' + daytime,
          })
      } else if (dtype == 4) {
          wx.navigateTo({
              url: '../shige/shige?daytime=' + daytime,
          })
      } else if (dtype == 5) {
          wx.navigateTo({
              url: '../wenxue/wenxue?daytime=' + daytime,
          })
      } else if (dtype == 6) {
          wx.navigateTo({
              url: '../cuicuidu/cuicuidu?daytime=' + daytime,
          })
      } else {
          wx.navigateTo({
              url: '../audio/audio?daytime=' + daytime,
          })
      }
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
  // onShareAppMessage: function () {
  
  // }
})