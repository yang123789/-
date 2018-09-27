// pages/feedback/feedback.js
import { User } from '../user/user-module.js';
var user = new User();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getmatter:function(e){
      this.setData({
          value:e.detail.value
      })
  },
    feedback:function(){
        var value=this.data.value;
        console.log(value)
        user.feedback(value,(data) => {
            // wx.showToast({
            //     icon:'none',
            //     title: data.msg,
            //     duration: 2000
            // })
            wx.navigateTo({
                url: '../myfeedback/myfeedback',
            })
        });
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