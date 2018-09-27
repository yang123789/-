// pages/book/book.js
import { Book } from 'book-model.js';
var book = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: '',
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      currentTab:1,
      act:'',
      listenNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var avatar = wx.getStorageSync('avatar');
      this.setData({
          avatar: avatar
      })
      book.lunbo((data) => {
          //console.log(data);
          this.setData({
              imgUrls: data
          })
          
      });
     
      
  },
  swichNav: function (e) {
      var current = e.currentTarget.dataset.current;
      this.setData({
          currentTab: current
      })
  },
  goact:function(e){
      var dtype = e.currentTarget.dataset.dtype;
      if (dtype==1){
          wx.navigateTo({
              url: '../guoxue/guoxue',
          })
      } else if (dtype == 2){
          wx.navigateTo({
              url: '../jiezi/jiezi',
          })
      }else if (dtype == 3) {
          wx.navigateTo({
              url: '../shuji/shuji',
          })
      } else if (dtype == 4) {
          wx.navigateTo({
              url: '../shige/shige',
          })
      } else if (dtype == 5) {
          wx.navigateTo({
              url: '../cuicuidu/cuicuidu',
          })
      } else if (dtype == 6) {
          wx.navigateTo({
              url: '../zuowen/zuowen',
          })
          
      }else{
          wx.navigateTo({
              url: '../audio/audio',
          })
      }
  },
  gomine:function(){
      wx.switchTab({
          url: '../user/user',
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
      book.myfungread((data) => {
        console.log(data);
         this.setData({
             act:data
         })
      });
      book.num((data) => {
        console.log(data);
          this.setData({
              listenNum: data
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