// pages/shige/shige.js
import {
    Book
} from '../book/book-model.js';
var book = new Book();
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
const options = {
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    format: 'mp3',
}
var page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: '',
        carrt: '',
        progress: 0,
        j: 0,
        hide: false,
        audioId: '',
        isSpeaking: false,
        setting: true,
        playbtn: true,
        playbtn1: true
    },
    playVoice: function (e) {
        console.log(e);
        var playbtn = e.currentTarget.dataset.play;
        var that = this;
        that.setData({
            hide: true,
            audioId: e.currentTarget.id
        })
        var audiosrc = e.currentTarget.dataset.src;
        innerAudioContext.autoplay = false;
        innerAudioContext.src = audiosrc;
        //话筒帧动画  
        if (playbtn == true) {
            that.setData({
                playbtn: false
            })
            var i = 0;
            clearInterval(that.timer);
            that.timer = setInterval(function () {
                i++;
                i = i % 3;
                that.setData({
                    j: i
                })
            }, 400);
            innerAudioContext.play();
        } else {
            that.setData({
                playbtn: true
            })
            innerAudioContext.stop();
            clearInterval(that.timer);
            that.setData({
                hide: false,
            })
        }
        innerAudioContext.onEnded(() => {
            //console.log("停止")
            clearInterval(that.timer);
            that.setData({
                hide: false,
            })
        })
    },
    //撤回
    revoke: function (e) {
        var recordId = e.currentTarget.dataset.recordid;
        book.removerecord(recordId, (data) => {
            if (data.code == 1) {
                wx.showToast({
                    title: '撤回成功',
                    icon: 'none'
                })
            }
        })
    },
    //   touchdown: function() {
    //     var that = this;
    //     //调取小程序新版授权页面
    //     wx.authorize({
    //       scope: 'scope.record',
    //       success() {
    //         console.log("录音授权成功11");
    //         //第一次成功授权后 状态切换为2
    //         that.setData({
    //           status: 2,
    //         })
    //         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //         // wx.startRecord();
    //         recorderManager.start(options); //使用新版录音接口，可以获取录音文件

    //       },
    //       fail() {
    //         console.log("第一次录音授权失败");
    //         wx.showModal({
    //           title: '提示',
    //           content: '您未授权录音，功能将无法使用',
    //           showCancel: true,
    //           confirmText: "授权",
    //           confirmColor: "#52a2d8",
    //           success: function(res) {
    //             if (res.confirm) {
    //               //确认则打开设置页面（重点）
    //               wx.openSetting({
    //                 success: (res) => {
    //                   console.log(res.authSetting);
    //                   if (!res.authSetting['scope.record']) {
    //                     //未设置录音授权
    //                     console.log("未设置录音授权");
    //                     wx.showModal({
    //                       title: '提示',
    //                       content: '您未授权录音，功能将无法使用',
    //                       showCancel: false,
    //                       success: function(res) {

    //                       },
    //                     })
    //                   } else {
    //                     //第二次才成功授权
    //                     console.log("设置录音授权成功222");
    //                     that.setData({
    //                       status: 2,
    //                     })
    //                     recorderManager.start(options);
    //                     recorderManager.onStop((res) => {
    //                       console.log('recorder stop', res)
    //                     })
    //                   }
    //                 },
    //                 fail: function() {
    //                   console.log("授权设置录音失败");
    //                 }
    //               })
    //             } else if (res.cancel) {
    //               console.log("cancel");
    //             }
    //           },
    //           fail: function() {
    //             console.log("openfail");
    //           }
    //         })
    //       }
    //     })

    //   },

    touchdown: function () {
        var _this = this;
        wx.authorize({
            scope: 'scope.record',
            success: (res) => {
                _this.setData({
                    setting: true
                })

            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '您未授权录音，功能将无法使用',
                    showCancel: false,
                    confirmColor: "#52a2d8",
                    success: function (res) {
                        if (res.confirm) {
                            _this.setData({
                                setting: false
                            })

                        }
                    }
                })
            }
        })

        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.record']) {
                    //console.log("手指按下了...");
                    _this.setData({
                        isSpeaking: true
                    })
                    recorderManager.start(options);
                }
            }
        })


    },
    setting: function () {
        var _this = this;
        wx.getSetting({
            success: (res) => {
                //console.log(res)
                if (res.authSetting['scope.record']) {
                    _this.setData({
                        setting: true
                    })

                }
            }
        })
    },
    oldDetail: function (e) {
        var datt = e.currentTarget.dataset.time;
        wx.navigateTo({
            url: '../cuicuidu/cuicuidu?daytime=' + datt,
        })
    },
    //手指抬起 
    touchup: function () {
        console.log("手指抬起了...")
        this.setData({
            isSpeaking: false
        })
        clearInterval(this.timer)
        recorderManager.stop();
        recorderManager.onStop((res) => {
            //console.log('22recorder stop', res.tempFilePath);
            var tempFilePath = res.tempFilePath;
            wx.uploadFile({
                url: 'https://xmr.bjcaicheng.com/api/fungusread/postrecord', //仅为示例，非真实的接口地址
                filePath: tempFilePath,
                name: 'file',
                success: function (res) {
                    console.log(res)
                    var Fungreadid = wx.getStorageSync('funid');
                    var dburl = JSON.parse(res.data).dburl;
                    //console.log(dburl);
                    book.dbRecord(Fungreadid, dburl, (data) => {
                        //console.log(data);



                    });

                }
            })
        })
    },
    //点击播放录音 
    gotoPlay: function (e) {
        var filePath = e.currentTarget.dataset.key;
        //点击开始播放 
        wx.showToast({
            title: '开始播放',
            icon: 'success',
            duration: 1000
        })
        wx.playVoice({
            filePath: filePath,
            success: function () {
                wx.showToast({
                    title: '播放结束',
                    icon: 'success',
                    duration: 1000
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = 5;
        var daytime = options.daytime;
        book.book(id, daytime, (data) => {
            console.log(data);
            
            if (data.Fungread!=null){
                this.setData({
                    book: data
                })
                var carrt = this.data.book.Fungread.content.split('\n');
                this.setData({
                    carrt: carrt
                })
                wx.setStorageSync('funid', data.Fungread.id)
                this.getfungusread(wx.getStorageSync('funid'));
            }
            
        });
        var timers = null;
        var that = this;
        timers = setInterval(function () {
            that.getfungusread(wx.getStorageSync('funid'));
        }, 1000)

    },
    getfungusread: function (funid) {
        var Fungreadid = funid;
        var that = this;
        book.fungusread(Fungreadid, (data) => {
            //console.log(data);
            that.setData({
                list: data
            });
        });

    },
    MusicStart: function (e) {
        var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
        var that = this;
        that.setData({
            progress: progress
        })
        //console.log('音乐播放进度为' + progress + '%')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

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
   

})