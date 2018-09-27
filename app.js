import {
  Config
} from 'utils/config.js';
App({
  onLaunch: function() {
    // 获取用户信息
    var that = this;
    var url = Config.restUrl;
    wx.login({
      success: function(res) {
        wx.request({
          url: url + 'login/minprogram',
          method: 'POST',
          data: {
            code: res.code,
          },
          success: function(ress) {
            console.log(ress);
            if (ress) {
              var loginarr = ress.data;
              wx.setStorageSync('uid', loginarr.uid);
              wx.setStorageSync('createtime', loginarr.createtime);
              wx.setStorageSync('nickname', loginarr.nickname);
              wx.setStorageSync('avatar', loginarr.avatar);
              wx.setStorageSync('group_id', loginarr.group_id);
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
});