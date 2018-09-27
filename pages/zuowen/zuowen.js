// pages/zuowen/zuowen.js
import { Book } from '../book/book-model.js';
var book = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:'',
    progress: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = 6;
      var daytime = options.daytime;
      book.book(id, daytime, (data) => {
          if (data.Fungread != null) {
          console.log(data);
          this.setData({
              book: data
          })
          var carrt = this.data.book.Fungread.content.split('\n');
          this.setData({
              carrt: carrt
          })
              console.log(carrt)
          wx.setStorageSync('funid', data.Fungread.id);
          this.getzw(wx.getStorageSync('funid'));
          }
      });
  },
  getzw: function (Fungreadid){
        book.getzw(Fungreadid, (data) => {
            console.log(data);
            this.setData({
                zuowen:data
            })
        });
    },
    gocomposition:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../composition/composition?id='+id,
        })
    },
    gofabu:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../fabu/fabu?id=" + id
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
      this.getzw(wx.getStorageSync('funid'));
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