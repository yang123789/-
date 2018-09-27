
import { Base } from '../../utils/base.js';

class User extends Base {
    constructor() {
        super();
    }

    //  会员状态
    userVipState(callback) {
        var param = {
            url: 'user/userVipState',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //个人中心
    user(callback) {
        var param = {
            url: 'user/personal',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //我的活动
    myfungread(callback) {
        var param = {
            url: 'fungusread/myfungread',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    //我的已购
    mybuying(callback) {
        var param = {
            url: 'user/mybuyforum',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    //  通知中心
    notice(callback) {
        var param = {
            url: 'message/getmessage',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //通知中心详情
    noticeDetail(id,callback) {
        var param = {
            url: 'message/messagedetail',
            data: {
                messageId: id,
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //意见反馈
    feedback(value, callback) {
        var param = {
            url: 'message/feedback',
            data: {
                feedback: value,
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //我的赠送
    myrecords(buyuid,listid,callback) {
        var param = {
            url: 'user/mygiftlist',
            data:{
                buyuid: buyuid,
                listid: listid
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //领取会员
    Receivevip(listid, callback) {
        var param = {
            url: 'login/Receivevip',
            data: {
                giftId: listid
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //我的反馈
    myfeedback(callback) {
        var param = {
            url: 'user/myfeedback',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
 
}
export {
    User
};