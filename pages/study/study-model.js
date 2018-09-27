import { Base } from '../../utils/base.js';

class Study extends Base {
    constructor() {
        super();
    }
    //购买课程
    Buy(otype, forumId, callback) {
        var param = {
            url: 'login/pay',
            data: {
                otype: otype,
                forumId: forumId
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    // 木耳讲坛列表
    studylist(callback) {
        var param = {
            url: 'forum/forumlist',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    relforum(id, callback) {
        var param = {
            url: 'forum/relforum',
            data: {
                forumId: id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    CourseList(id, callback) {
        var param = {
            url: 'forum/CourseList',
            data: {
                forumId: id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    course(id,callback){
        var param = {
            url: 'forum/getCourseCont',
            data: {
                courseId:id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    } 
    course1(id, newnum,callback) {
        var param = {
            url: 'forum/getCourseCont',
            data: {
                courseId: id,
                num:newnum
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    collect(id, callback) {
        var param = {
            url: 'forum/collect',
            data: {
                courseContId: id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    note(id, note, callback) {
        var param = {
            url: 'forum/MakeNote',
            data: {
                courseContId: id,
                note: note
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    noteCollect(callback) {
        var param = {
            url: 'forum/MynoteAndCollect',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    mine(callback) {
        var param = {
            url: 'forum/Personal',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    /*
     * 拉起微信支付
     * params:
     * norderNumber - {int} 订单id
     * return：
     * callback - {obj} 回调方法 ，返回参数 可能值 0:商品缺货等原因导致订单不能支付;  1: 支付失败或者支付取消； 2:支付成功；
     * */
    execPay(order_no, callback) {
        var allParams = {
            url: 'pay/getPreOrder?order_no=' + order_no,
            sCallback: function (data) {
                var timeStamp = data.timeStamp;
                if (timeStamp) { //可以支付
                    wx.requestPayment({
                        'timeStamp': timeStamp.toString(),
                        'nonceStr': data.nonceStr,
                        'package': data.package,
                        'signType': data.signType,
                        'paySign': data.paySign,
                        success: function () {
                            callback && callback(2);
                        },
                        fail: function () {
                            callback && callback(1);
                        }
                    });
                } else {
                    callback && callback(0);
                }
            }
        };
        this.request(allParams);
    }
}
export {
    Study
};