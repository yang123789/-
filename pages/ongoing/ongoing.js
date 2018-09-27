// pages/ongoing/ongoing.js
import { Study } from '../study/study-model.js';
var study = new Study();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          id: options.id
      })
     
  },
    goAnswer:function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../fullAnswer/fullAnswer?id='+id,
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
      var id=this.data.id;
      study.relforum(id, (data) => {
          //console.log(data)
          if (data.code == 1) {
              study.CourseList(id, (data) => {
                  console.log(data);
                  this.setData({
                      studylist: data
                  })

              });
          } else {
              wx.navigateTo({
                  url: '../noapply/noapply?id=' + id,
              })
          }
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
        var id = this.data.id;
        //console.log(id)
        return {
            title: '木耳讲坛',
            path: '/pages/ongoing/ongoing?id=' + id,
            // imageUrl: '/imgs/card.jpg'
        }
    }
})