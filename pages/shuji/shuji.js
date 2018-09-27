// pages/shuji/shuji.js
import { Book } from '../book/book-model.js';
var book = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      book: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = 3;
      var daytime = options.daytime;
      book.book(id, daytime, (data) => {
          if (data.secretary != null) {
          console.log(data);
          this.setData({
              book: data
          })
          } 
      });
  },
  oldDetail: function (e) {
      var datt = e.currentTarget.dataset.time;
      wx.navigateTo({
          url: '../shuji/shuji?daytime=' + datt,
      })
  },
    gofile:function(){
        wx.navigateTo({
            url: '../sjtg/sjtg',
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
  // onShareAppMessage: function () {
  
  // }
})