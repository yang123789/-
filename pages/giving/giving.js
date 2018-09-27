// pages/giving/giving.js
import {
    Giving
} from 'giving-model.js';
var giving = new Giving();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:1,
    givingbtn:false,
    price:'',
    allprice:'',
    uid:wx.getStorageSync('uid')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      giving.getPrice((res) => {
        //console.log(res);
        this.setData({
            price: res
        })
        var money = this.data.money;
        var price = this.data.price;
        this.setData({
            allprice: price * money
        })
      })
      
  },
    jian:function(){
        var money = this.data.money;
        var price=this.data.price;
        if(money<2){
            this.setData({
                money: 1,
                allprice: price * money
            })
        }else{
        this.setData({
            money: money-1,
            allprice: price * (money - 1)
        })
        }

    },
    add: function () {
        var money=this.data.money;
        var price = this.data.price;
        this.setData({
            money:money+1,
            allprice: price * (money+1)
        })
        //console.log(money)
    },
    giving: function () {
        var that = this;
        var money=this.data.money;
        that.setData({
            givingbtn: true
        })
        giving.Buy('gift', money, (res) => {
            if (res.code) {
                giving.execPay(res.order_no, (statusCode) => {
                    if (statusCode == 2) {
                        wx.navigateTo({
                            url: '../records/records'
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
    _orderFail: function () {
        this.setData({
            givingbtn: false
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
  // onShareAppMessage: function (res) {
     
  // }

})