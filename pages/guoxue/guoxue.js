// pages/guoxue/guoxue.js
import {
    Book
} from '../book/book-model.js';
var book = new Book();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: '',
        carrt: '',
        hideplay: true,
        progress: 0,
        messmatter: '',
        messlist: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = 1;
        var daytime = options.daytime;
        console.log(daytime);
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
            wx.setStorageSync('funid', data.Fungread.id);
            this.getmess(data.Fungread.id)
            }
        });


    },
    oldDetail: function(e) {
        var datt = e.currentTarget.dataset.time;
        wx.navigateTo({
            url: '../guoxue/guoxue?daytime=' + datt,
        })


    },
    maessmatter: function(e) {
        this.setData({
            messmatter: e.detail.value
        })
    },
    getmess: function(id) {
        book.getmess(id, (data) => {
            console.log(data);
            this.setData({
                messlist: data
            })
        });
    },
    messbtn: function() {
        var id = wx.getStorageSync('funid');
        var word = this.data.messmatter;
        if (word==''){
            wx.showToast({
                title: '留言内容不能为空',
                icon: 'none',
                duration: 2000
            })
        }else{
        book.mess(id, word, (data) => {
            console.log(data);
            this.setData({
                messmatter: ''
            })
            wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 2000
            })

        });
        }
    },
    MusicStart: function(e) {
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
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
   
})