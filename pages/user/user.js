//index.js
//获取应用实例
import {
  User
} from 'user-module.js';
var user = new User();
import {
    Book
} from '../book/book-model.js';
var book = new Book();
import {
  Pay
} from '../../utils/pay.js';
var pay = new Pay();
const app = getApp()

Page({
  data: {
    group: '',
    order_no: '',
    userInfo: {},
    hasUserInfo: false,
    buyvipbtn: false,
    createtime: '',
    loginarr: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function() {

  },
  loaddata: function() {
    var that = this;
    var createtime = wx.getStorageSync('createtime');
    if (createtime == 0) {
      wx.navigateTo({
        url: '../logs/logs'
      })
    } else {
      this.setData({
        createtime: wx.getStorageSync('createtime'),
        nickname: wx.getStorageSync('nickname'),
        avatar: wx.getStorageSync('avatar'),
        group_id: wx.getStorageSync('group_id')
      })
        this.getvipstate();
    }
  },
    getvipstate:function(){
        book.userVipState((data) => {
            console.log(data.group_id)
            this.setData({
                group: data
            })
        });
},
  //我的活动
  Go: function(e) {
    var url = e.currentTarget.dataset.url;
    var createtime = wx.getStorageSync('createtime');
    if (createtime == 0) {
      wx.navigateTo({
        url: '../logs/logs',
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },
  onShow: function() {
    this.loaddata();
  },
  BuyVip: function() {
    var that = this;
    that.setData({
      buyvipbtn: true
    })
    pay.Buy('group', (res) => {
      if (res.code) {
        pay.execPay(res.order_no, (statusCode) => {
          if (statusCode == 2) {
            wx.switchTab({
              url: '../user/user'
            });
            that.getvipstate();
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
  _orderFail: function() {
    this.setData({
      buyvipbtn: false
    })
    wx.showToast({
      title: '支付失败，请稍后重试',
      icon: 'none',
      duration: 1000
    })
   
  },
    onShareAppMessage: function (res) {
        return {
            title: '木耳读书',
            path: '/pages/user/user',
            // imageUrl: '/imgs/card.jpg'
        }
    }

})