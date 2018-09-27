// pages/apply/apply.js
import { Read } from '../read/read-model.js';
var read = new Read();
import { Sign } from '../sign/sign-model.js';
var sign = new Sign();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tel:'',
      id:'',
      readDeatil:'',
      content:'',
      past:'',
      schecked:true,
      svalue:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        id: options.id
    })
    console.log(options.id)
      read.readDeatil(options.id, (data) => {
          console.log(data)
          this.setData({
              readDeatil:data
          })
          
          var content = data.details.split('\n');
          console.log(content)
          this.setData({
              content: content
          })
      })
      sign.past((data) => {
          console.log(data);
          this.setData({
              past: data.grass
          })
          
      });
  },
    check:function(e){
        var svalue = e.target.dataset.value;
        if (svalue==1){
            this.setData({
                svalue: 0
            })
        }else{
            this.setData({
                svalue: 1
            })
        }
    },
    formSubmit:function(e){
        var that=this;
        var detail = e.detail.value;
        var rpid = that.data.id;//小木耳读书会id
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!detail.name) {
            wx.showToast({
                title: '请输入您的姓名',
                icon: 'none',
                duration: 1000
            })
        } else if (!myreg.test(detail.tel)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 1000
            })
        }else{
            that.setData({
                applybtn: true
            })
            read.Buyreading('reading', rpid, detail.name, detail.tel,that.data.svalue, (res) => {
                if (res.code) {
                    read.execPay(res.order_no, (statusCode) => {
                        console.log(statusCode);
                        if (statusCode == 2) {
                            wx.navigateTo({
                                url: '../myReading/myReading',
                            })
                        } else {
                            that._orderFail(); // 下单失败
                        }
                    })
                } else {
                    that._orderFail(); // 下单失败
                }
            });
        }
    },
    _orderFail: function () {
        this.setData({
            applybtn: false
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

})