// pages/fabu/fabu.js
import { Book } from '../book/book-model.js';
var book = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fungreadId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          fungreadId: options.id
      })
  },
  formSubmit: function (e) {
      var detail = e.detail.value;
      if (!detail.title) {
          wx.showToast({
              title: '请输入文章标题',
              icon: 'none',
              duration: 1000
          })
      } else if (!detail.content) {
          wx.showToast({
              title: '请输入文章内容',
              icon: 'none',
              duration: 1000
          })
      } else {
          wx.showToast({
              title: '发布成功',
              icon: 'none',
              duration: 1000
          })
          var fungreadId = this.data.fungreadId;
          var title = detail.title;
          var content = detail.content;
          book.postComposition(fungreadId,title,content, (data) => {
              wx.navigateBack({
                  delta:1
              })
          });
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
  
})