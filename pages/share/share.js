
// pages/share/share.js
import { Sign } from '../sign/sign-model.js';
var sign = new Sign();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sign: '',
        mapath: '',
        path: '',
        past: '',
        text: "",
        author: '',
        subanswer: '',
        bgimg: '',
        day: '',
        setting: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.quesid);
        var quesid = options.quesid;
        wx.showLoading({
            title: '生成中',
        })
        sign.save(quesid, (data) => {
            console.log(data);
            this.setData({
                text: data.dayTask[0].celebrityMotto,
                author: data.dayTask[0].author,
                bgimg: data.dayTask[0].image,
                day: data.dayTask[0].days,
                qrcode: data.dayTask[0].qrcode
            })
            wx.setStorageSync('bgimg', data.dayTask[0].image);
            wx.setStorageSync('qrcode', data.dayTask[0].qrcode);
            this.getallimg();
        });
    },

    getbgimg: function (callBack) {
        return new Promise(function (resolve, reject) {

            var bgimg = wx.getStorageSync('bgimg');
            // var bgimg = 'https://lg-5b8938g4-1256973110.cos.ap-shanghai.myqcloud.com/sharebg.png';
            wx.downloadFile({
                url: bgimg,
                success: function (res) {
                    // 下载成功后拿到图片的路径，然后开始绘制
                    var path = res.tempFilePath;
                    resolve(path);
                    callBack && callBack(path);
                }, fail: function (res) {
                    console.log(res)
                }
            });
        })
    },
   
    getallimg: function () {
        var that = this;
        that.getbgimg().then(function (path) {
            wx.setStorageSync('path', path);
                var path = wx.getStorageSync('path');
                var width = wx.getSystemInfoSync().windowWidth;
                const ctx = wx.createCanvasContext('shareCanvas');
                ctx.drawImage(path, 0, 0, 750 / 750 * width, 1200 / 750 * width);
                ctx.setFillStyle("#000000");
                //名言-换行超出两行省略
                //   var text = '人生有三样东西无法掩盖人生有三样东西无法掩盖人生有三样东西无法掩盖人生有三样东西无法掩盖。';//这是要绘制的文本
                var text = that.data.text
                var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
                var temp = "";
                var row = [];
                ctx.setFontSize(44 / 750 * width);
            
                for (var a = 0; a < chr.length; a++) {
                    if (ctx.measureText(temp).width < 380 / 750 * width) {
                        temp += chr[a];
                    }
                    else {
                        a--;
                        row.push(temp);
                        temp = "";
                    }
                }
                row.push(temp);
                if (row.length > 3) {
                    var rowCut = row.slice(0, 3);
                    var rowPart = rowCut[2];
                    var test = "";
                    var empty = [];
                    console.log(rowCut)
                    for (var a = 0; a < rowPart.length; a++) {
                        if (ctx.measureText(test).width < 220) {
                            test += rowPart[a];
                        }
                        else {
                            break;
                        }
                    }
                    empty.push(test);
                    console.log(test)
                    var group = empty[0] + "..."//这里只显示两行，超出的用...表示
                    console.log(rowCut)
                    rowCut.splice(2, 1, group);
                    row = rowCut;
                }
                for (var b = 0; b < row.length; b++) {
                    ctx.fillText(row[b], 180 / 750 * width, 336 / 750 * width + b * 36, 750 / 750 * width);
                }
                //作者

                var author = that.data.author
                ctx.setFontSize(40 / 750 * width);
            
                ctx.setTextAlign('center')
                ctx.fillText(author, 750 / 750 / 2 * width, 590 / 750 * width)

              
                //打卡天数
                var day = '我已在木耳读书“天天种草”打卡' + that.data.day + '天';
                ctx.setFontSize(34 / 750 * width);
                var daywidthleft = 570 / 750 * width - ctx.measureText(day).width;
                ctx.setTextAlign('center')
                ctx.fillText(day, 750 / 750 / 2 * width, 898 / 750 * width)
                ctx.draw();
                wx.hideLoading();
           
        });


    },

    scimg: function (e) {
        console.log(e)
        var _this = this;
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
                console.log(res);
                _this.setData({
                    setting: false
                })
            }, fail: (res) => {
                console.log(res)
                wx.showModal({
                    title: '提示',
                    content: '您未授权保存到相册，功能将无法使用',
                    showCancel: false,
                    confirmColor: "#52a2d8",
                    success: function (res) {
                        if (res.confirm) {
                            _this.setData({
                                setting: true
                            })

                        }
                    }
                })
            }
        })
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.writePhotosAlbum']) {

                    var width = wx.getSystemInfoSync().windowWidth;
                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 750 / 750 * width,
                        height: 1200 / 750 * width,
                        canvasId: 'shareCanvas',
                        success: function (res) {
                            console.log(res.tempFilePath);
                            wx.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success(res) {
                                    wx.showModal({
                                        title: '保存图片成功',
                                        content: '已经保存到相册，您可以手动分享到朋友圈！',
                                        showCancel: false,
                                        success: function (res) {
                                            if (res.confirm) {
                                                wx.navigateTo({
                                                    url: '../sign/sign',
                                                })
                                            }
                                        }
                                    });


                                },
                                fail: function (res) {
                                    console.log(res);
                                    if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                                        wx.showModal({
                                            title: '保存图片失败',
                                            content: '您已取消保存图片到相册！',
                                            showCancel: false
                                        });
                                    } else {
                                        wx.showModal({
                                            title: '提示',
                                            content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
                                        });
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })

    },
    setting: function () {
        var _this = this;
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.writePhotosAlbum']) {
                    _this.setData({
                        setting: false
                    })

                }
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
        this.setting();
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