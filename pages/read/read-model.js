import { Base } from '../../utils/base.js';

class Read extends Base {
    constructor() {
        super();
    }

    // 木耳读书会列表
    read(callback) {
        var param = {
            url: 'readingparty/readingpartylist',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //木耳读书会详情
    readDeatil(id,callback) {
        var param = {
            url: 'readingparty/readingDetails',
            data:{
                readingId:id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //报名参加
    apply(applyarr,callback) {
        var param = {
            url: 'readingparty/joinreadingparty',
            data: {
                rel_name: applyarr[0],
                rel_tel: applyarr[1],
                rpid: applyarr[2]
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }


    //购买会员/续费 提交订单
    Buyreading(otype, readingId, rel_name, rel_tel,Coupon,callback) {
        var param = {
            url: 'login/pay',
            data: {
                otype: otype,
                readingId: readingId,
                rel_name: rel_name,
                rel_tel: rel_tel,
                Coupon: Coupon
            },
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
    Read
};