// pages/noapply/noapply.js
import { Study } from '../study/study-model.js';
var study = new Study();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      studylist:'',
      buyclassbtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      this.setData({
          id: id
      })
      study.CourseList(id, (data) => {
          console.log(data);
          this.setData({
              studylist: data
          })
        var coursematter = data.course_syno.split('\n');
        this.setData({
          coursematter: coursematter
        })
      });
  },
  BuyClass: function () {
      var that = this;
      that.setData({
          buyclassbtn: true
      })
      var forumid=that.data.id;
      study.Buy('forum', forumid, (res) => {
          if (res.code) {
              study.execPay(res.order_no, (statusCode) => {
                  if (statusCode == 2) {
                      wx.navigateTo({
                          url: '../ongoing/ongoing?id=' + forumid,
                      })
                  } else {
                      that._orderFail(); // 下单失败
                  }
              })
          } else {
              that._orderFail(); // 下单失败
          }
      });
  },
 
  /*
 *下单失败
 * params:
 * data - {obj} 订单结果信息
 * */
  _orderFail: function () {
      this.setData({
          buyclassbtn: false
      })
      wx.showToast({
          title: '支付失败，请稍后重试',
          icon: 'none',
          duration: 1000
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