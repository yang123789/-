// pages/read/read.js
import { Read } from 'read-model.js';
var read = new Read();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    read:'',
    avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
    apply:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../apply/apply?id='+id,
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
      read.read((data) => {
          console.log(data);
          this.setData({
              read: data
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
    onShareAppMessage: function (res) {
        return {
            title: '木耳读书',
            path: '/pages/user/user',
            // imageUrl: '/imgs/card.jpg'
        }
    }
})