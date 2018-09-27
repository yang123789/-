// pages/logs/logs.js
import {
  Config
} from '../../utils/config.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setbtn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var timer = null;
    var timer = setInterval(function() {
      var hascreate = wx.getStorageSync('createtime');
      if (hascreate > 0) {
        // wx.switchTab({
        //   url: '../user/user'
        // })
        wx.navigateBack({
          delta:1
        })
        clearInterval(timer);
      } 
    }, 200)

  },
  onGotUserInfo: function(e) {
    var that = this;
    console.log(e);
    var user_info = e.detail.userInfo;
    var hascreate = wx.getStorageSync('createtime');
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.setData({
                setbtn: true
              })
              that.gologin(user_info);
            },
            fail() {
              that.setData({
                setbtn: false
              })
              wx.showModal({
                title: '提示',
                content: '您未授权获取头像、昵称，将无法使用',
                showCancel: false,
                confirmColor: "#52a2d8",
                success: function(res) {
                  if (res.confirm) {
                    that.setData({
                      setbtn: false
                    })
                  }
                }
              })
            }
          })
        } else {
          that.gologin(user_info);
        }
      }
    })

  },
  gologin: function(user_info) {
    var that = this;
    var url = Config.restUrl;
    wx.login({
      success: function(res) {
        wx.request({
          url: url + 'login/minprogram',
          method: 'POST',
          data: {
            code: res.code,
            nickname: user_info.nickName,
            avatar: user_info.avatarUrl,
          },
          success: function(ress) {
            if (ress) {
              var loginarr = ress.data;
              wx.setStorageSync('uid', loginarr.uid);
              wx.setStorageSync('createtime', loginarr.createtime);
              wx.setStorageSync('nickname', loginarr.nickname);
              wx.setStorageSync('avatar', loginarr.avatar);
              wx.setStorageSync('group_id', loginarr.group_id);
              wx.switchTab({
                url: '../user/user'
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      setbtn: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})