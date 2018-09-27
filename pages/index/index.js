// pages/index/index.js
const app = getApp();
import {
  Book
} from '../book/book-model.js';
var book = new Book();
import {
  Pay
} from '../../utils/pay.js';
var pay = new Pay();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novip: true,
    act: '',
    order_no: '',
    newact: '',
    group: '',
    buyvipbtn: false,
    xfvipbtn: false,
    createtime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },
  Go: function(e) {
    var url = e.currentTarget.dataset.url;
      if (url == '../book/book' || url == '../sign/sign'){
          if (this.data.group.group_id==1){
              wx.showToast({
                  title: '您还不是会员，不能浏览此栏目',
                  icon: 'none',
                  duration: 1000
              })
          }else{
              wx.navigateTo({
                  url: url,
              })
          }
    }else{
          wx.navigateTo({
              url: url,
          })
    }
   
  },
    zsVip:function(){
        wx.navigateTo({
            url: '../giving/giving',
        })
    },
    gomr:function(e){
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
                url: '../cuicuidu/cuicuidu?daytime=' + daytime,
            })
            
        } else if (dtype == 6) {
            wx.navigateTo({
                url: '../zuowen/zuowen?daytime=' + daytime,
            })
        } else {
            wx.navigateTo({
                url: '../audio/audio',
            })
        }
    },
  goact: function(e) {
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
              url: '../cuicuidu/cuicuidu?daytime=' + daytime,
          })

      } else if (dtype == 6) {
          wx.navigateTo({
              url: '../zuowen/zuowen?daytime=' + daytime,
          })
      } else {
          wx.navigateTo({
              url: '../audio/audio',
          })
      }
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
              url: '../index/index'
            });
            that.loadata();
          } else {
            that._orderFail(); // 下单失败
          }
        })
      } else {
        that._orderFail(); // 下单失败
      }
    });
  },
  //续费
  xfVip: function() {
      var that=this;
    pay.Buy('renew', (res) => {
      if (res.code) {
        pay.execPay(res.order_no, (statusCode) => {
          if (statusCode == 2) {
              that.onShow();
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
    this.setData({
      xfvipbtn: false
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadata();
  },
  loadata: function() {
    book.myfungread((data) => {
      //console.log(data);
      this.setData({
        act: data
      })
    });
    book.newact((data) => {
      console.log(data);
      this.setData({
        newact: data
      })
    });
    book.userVipState((data) => {
      console.log(data)
      this.setData({
        group: data
      })
    });
  },
    // gonoapply:function(e){
    //     var id = e.currentTarget.dataset.id;
    //     wx.navigateTo({
    //         url: '../noapply/noapply?id='+id,
    //     })
    // },
    // goreading: function (e) {
    //     var id = e.currentTarget.dataset.id;
    //     wx.navigateTo({
            
    //         url: '../apply/apply?id=' + id,
    //     })
    // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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