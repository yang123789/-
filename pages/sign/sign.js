// pages/sign/sign.js
import { Sign } from 'sign-model.js';
var sign = new Sign();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sign:'',
      showmask:false,
      checkvalue:'',
      past:'',
      code:'',
      rulesbtn:false,
      quesid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
      
  },
    checkboxChange:function(e){
        console.log(e.detail.value)
        this.setData({
            checkvalue: e.detail.value
        })
    },
    openrules:function(){
        this.setData({
            rulesbtn:true
        })
    },
    goread:function(){
        wx.navigateTo({
            url: '../read/read',
        })
    },
    closerules: function () {
        this.setData({
            rulesbtn: false
        })
    },
    task:function(){
      sign.task((data) => {
        console.log(data)
      if(data.dayTask[0].code == 0){
          this.setData({
            sign: data.dayTask[0],
             showmask: true,
            
             });
          wx.setStorageSync('quesid', data.dayTask[0].id);
      } else if (data.dayTask[0].code == 1){
          var quesid = wx.getStorageSync('quesid');
            wx.navigateTo({
                url: '../share/share?quesid=' + quesid,
            });
      }else{
        wx.showModal({
           title: '提示',
           content: '今日已答题但是答错了',
           showCancel: false
            })
          }
      });
    },
    closetask:function(){
        this.setData({
            showmask:false
        })
    },
    subanswer:function(){
        var obj = this.data.checkvalue;
        var that = this;
        var quesid = wx.getStorageSync('quesid');
        sign.subanswer(obj, quesid,(data) => {
          console.log(data.code)
            if(data.code == 1){
              wx.navigateTo({
                  url: '../share/share?quesid=' + quesid,
              });
            } else{
              this.setData({
              showmask: false
             })
              wx.showModal({
                title: '提示',
                content: '答错了',
                showCancel:false
              })
            }
        });
    },
    // 
    past:function(){
      sign.past((data) => {
        console.log(data);
        this.setData({
          past: data.grass
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
      this.past();
      this.setData({
          showmask:false
      })
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