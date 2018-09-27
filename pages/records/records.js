// pages/records/records.js
import { User } from '../user/user-module.js';
var user = new User();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      records:'',
      lrecords:'',
      options:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.buyuid){
          this.setData({
              options:options
          })
          var buyuid = options.buyuid;
          var listid = options.listid;
         
          user.myrecords(buyuid, listid, (data) => {
              console.log(data);
              this.setData({
                  lrecords: data
              })
          });
      }else{
          var buyuid = wx.getStorageSync('uid');
          var listid='';
          user.myrecords(buyuid, listid, (data) => {
              console.log(data);
              this.setData({
                  records: data
              })
          });
      }
      
  },
    Receivevip:function(e){
        var listid = e.target.dataset.listid;
        //var options = this.data.options;
        user.Receivevip(listid, (data) => {
            console.log(data);
            wx.showToast({
                title: '领取成功',
                icon: 'none',
                duration: 2000
            })
            wx.switchTab({
                url: '../user/user',
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
  onShareAppMessage: function (res) {
      if (res.from === 'button') {
          // 来自页面内转发按钮
          //console.log(res.target.dataset.listid);
          var listid = res.target.dataset.listid;
          var buyuid=wx.getStorageSync('uid')
      }
      //console.log(listid)
      return {
          title: '领取会员',
          path: '/pages/records/records?listid=' + listid + '&buyuid=' + buyuid,
          imageUrl:'/imgs/card.jpg'
      }
  }
})