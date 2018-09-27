// // pages/sjtg/sjtg.js
import {
    Book
} from '../book/book-model.js';
var book = new Book();
Page({

    /**
    * 页面的初始数据
    */
    data: {
        bbb:'/imgs/file.jpg',
        canvasWidth:'',
        canvasHeight: ''
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        
    },
    aa() {
        var _this = this;
        // _this.setData({
            
        // })
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            success: function (photo) {
                wx.getImageInfo({
                    src: photo.tempFilePaths[0],
                    success: function (res) {
                        //console.log(res)
                        var ctx = wx.createCanvasContext('photo_canvas');
                        var str = res.width / res.height;
                        var width = wx.getSystemInfoSync().windowWidth;
                        var canvasWidth = 520 / 750 * width;
                        var canvasHeight = canvasWidth / str;
                        
                        _this.setData({
                            canvasWidth: canvasWidth,
                            canvasHeight: canvasHeight,
                            bbb: ''
                        })//设置canvas尺寸
                        ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight) //将图片填充在canvas上
                        ctx.draw()
                        //下载canvas图片
                        setTimeout(function () {
                            wx.canvasToTempFilePath({
                                canvasId: 'photo_canvas',
                                success: function (res) {
                                    console.log(res.tempFilePath)
                                    
                                    wx.uploadFile({
                                        url: 'https://xmr.bjcaicheng.com/api/fungusread/postPhoto', //这个方法就是后台处理上传的方法
                                        filePath: res.tempFilePath, //获取到上传的图片
                                        name: 'file',
                                        success: function (info) {
                                            console.log(JSON.parse(info.data))
                                            var dburl = JSON.parse(info.data).dburl
                                            var fileimg = JSON.parse(info.data).fileurl;
                                            _this.setData({
                                                bbb: fileimg,
                                            })
                                           // console.log(that.data.source)
                                           setTimeout(function(){
                                               wx.showModal({
                                                   title: '提示',
                                                   content: '您确定要投稿吗？',
                                                   success: function (res) {
                                                       if (res.confirm) {
                                                           book.saveimg(dburl, (res) => {
                                                               console.log(res)
                                                               if (res.code == 1) {
                                                                   wx.showToast({
                                                                       title: '投稿成功，待审核',
                                                                       icon: 'none',
                                                                       duration: 2000
                                                                   })
                                                                   setTimeout(function(){
                                                                       wx.navigateTo({
                                                                           url: '../shuji/shuji'
                                                                       })
                                                                   },1000)
                                                                   
                                                               } else {
                                                                   wx.showToast({
                                                                       title: '投稿失败',
                                                                       icon: 'none',
                                                                       duration: 2000
                                                                   })
                                                               }
                                                           })
                                                       } else if (res.cancel) {
                                                           wx.showToast({
                                                               title: '您已取消投稿',
                                                               icon: 'none',
                                                               duration: 2000
                                                           })
                                                       }
                                                   }
                                               })
                                           },1000)
                                            
                                        }
                                    })
                                },
                                fail: function (error) {
                                    console.log(error)
                                }
                            })
                        }, 100)
                    },
                    fail: function (error) {
                        console.log(error)
                    }
                })

            },
            error: function (res) {
                console.log(res);
            }
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
    // onShareAppMessage: function () {
    // }
})