import { Base } from '../../utils/base.js';

class Giving extends Base {
    constructor() {
        super();
    }
    //购买课程
    Buy(otype, num, callback) {
        var param = {
            url: 'login/pay',
            data: {
                otype: otype,
                num: num
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    getPrice(callback) {
        var param = {
            url: 'login/getGroupPrice',
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
    Giving
};