// pages/composition/composition.js
import { Book } from '../book/book-model.js';
var book = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      carr:'',
    zw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var zwid=options.id;
    this.setData({
        zwid: zwid
    })
    book.getzwDetail(zwid, (data) => {
        console.log(data);
        this.setData({
            zw: data
        });
        var kg = '\t\t\t\t';
        var carrt = data.composition.split('\n');
        var newarr = [];
        for (var i = 0; i < carrt.length; i++) {
            newarr[i] = '\t\t' + carrt[i];
        }
        this.setData({
            carr: newarr
        })
        this.setData({
            title: kg + data.title,

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
        var that=this;
        if (res.from === 'button') {
            var zwid = that.data.zwid;
        }
        //console.log(listid)
        return {
            title: '作文',
            path: '/pages/composition/composition?id=' + zwid,
        }
    }
})