// pages/fullAnswer/fullAnswer.js
import { Study } from '../study/study-model.js';
var study = new Study();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      dialogue:'',
      maskshow:true,
      sub:true,
      textarea:true,
      textarea1:true,
      notetext:'',
      note:'',
      id:'',
      noteid:'',
      newnum:'',
      arr2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      var courseid = options.courseid;
      this.setData({
          id: options.id
      })
      study.relforum(courseid, (data) => {
          console.log(data)
          if (data.code == 1) {
              this.course();
              
          } else {
              wx.navigateTo({
                  url: '../noapply/noapply?id=' + courseid,
              })
          }
      });
      
 
   
  },
  course:function(){

      var id = this.data.id;
      var newnum = '';

      study.course1(id, newnum, (data) => {
          console.log(data);
          this.setData({
              dialogue: data,
              newnum: data.num
          })      
      });
  },
  
  collect:function(e){
      var id = e.currentTarget.dataset.id;
      var that=this;
      study.collect(id, (data) => {
          console.log(data.msg);
          wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 2000
          })
         that.course();
      });
  },
    clickbtn:function(){
        var newnum = this.data.newnum;
        
        this.setData({
            newnum: newnum+1
        })
        //console.log(this.data.newnum)
        study.course1(this.data.id, this.data.newnum, (data) => {
            console.log(data)
            if (data.courseCont.length==data.num){
                //var newnum = parseInt(data.num);
                this.setData({
                    dialogue: data,
                    newnum: data.num
                }) 
                wx.createSelectorQuery().select('.container').boundingClientRect(function (rect) {

                    rect.bottom // 节点的下边界坐标
                    rect.height // 节点的高度
                    //console.log(rect.bottom)
                    //console.log(rect.height)
                    wx.setStorageSync("height1", rect.height)
                }).exec()
                wx.createSelectorQuery().select('.pin').boundingClientRect(function (rect) {

                    rect.bottom // 节点的下边界坐标
                    rect.height // 节点的高度
                    //console.log(rect.bottom)
                    //console.log(rect.height)
                    wx.setStorageSync("height2", rect.height)
                }).exec()

                var height = wx.getStorageSync('height1') + wx.getStorageSync('height2');
                //console.log(height)
                wx.pageScrollTo({
                    scrollTop: height,
                    duration: 300
                })
            }else{
                wx.showToast({
                    title: '已经到底了',
                    icon: 'none',
                    duration: 2000
                })
            }
            
        });
              
        
    },
    note:function(e){
        var note = e.currentTarget.dataset.note;
        if (note==0){
            this.setData({
                sub:false,
                maskshow:false,
                textarea1:false,
                textarea:true,
                noteid:e.currentTarget.dataset.id
            })
        }else{
            this.setData({
                sub: true,
                maskshow: false,
                textarea1: true,
                textarea: false,
                notetext: note
            })
        }
    },
    closenote:function(){
        this.setData({
            maskshow: true,
        })
    },
    getNoteText:function(e){
        this.setData({
            note: e.detail.value
        })
    },
    sub:function(){
        var note=this.data.note;
        var nid = this.data.noteid;
        var that=this;
        study.note(nid,note, (data) => {
            console.log(data);
           if(data.code==1){
               this.setData({
                   maskshow: true,
                   textarea: false,
                   textarea1: true,
                   note:''
               })
               that.course();
           }
            
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
        var id = this.data.id;
        //console.log(id)
        return {
            title: '木耳讲坛',
            path: '/pages/fullAnswer/fullAnswer?id=' + id,
            // imageUrl: '/imgs/card.jpg'
        }
    }
})