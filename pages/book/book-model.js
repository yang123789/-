import { Base } from '../../utils/base.js';

class Book extends Base {
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
    // 木耳讲坛列表
    book(id,daytime,callback) {
        var param = {
            url: 'fungusread/FungreadIndex',
            data: {
                dtype: id,
                daytime: daytime
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
        
    }
    //木耳讲坛往期详情
    oldDetail(id, daytime, callback) {
        var param = {
            url: 'fungusread/FungreadIndex',
            data: {
                dtype: id,
                daytime: daytime
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    //我参加的活动
    myfungread(callback) {
        var param = {
            url: 'fungusread/myfungread',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    // 获取录音
    fungusread(Fungreadid, callback) {
        var param = {
            url: 'fungusread/getRecord',
            data: {
                fungreadId: Fungreadid,
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    // 上传
    dbRecord(Fungreadid, dburl, callback) {
        var param = {
            url: 'fungusread/dbRecord',
            data: {
                fungread_id: Fungreadid,
                record:dburl
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    // 作文
    getzw(Fungreadid, callback) {
        var param = {
            url: 'fungusread/getComposition',
            data: {
                fungreadId: Fungreadid,
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    // 作文详情
    getzwDetail(id, callback) {
        var param = {
            url: 'fungusread/CompositionDetail',
            data: {
                compositionId: id,
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    // 发布作文
    postComposition(fungreadId,title,content, callback) {
        var param = {
            url: 'fungusread/postComposition',
            data: {
                fungreadId: fungreadId,
                title:title,
                composition:content
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);

    }
    //投票
    vote(id, callback) {
        var param = {
            url: 'fungusread/vote',
            data: {
                recordId: id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //上传留言
    mess(id,word, callback) {
        var param = {
            url: 'fungusread/postLeaveword',
            data: {
                fungreadId: id,
                leaveword: word
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //获取留言
    getmess(id,callback) {
        var param = {
            url: 'fungusread/getLeaveword',
            data: {
                fungreadId: id
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //最近活动
    newact(callback) {
        var param = {
            url: 'fungusread/newfungread',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //木耳书记保存图片
    saveimg(photo, callback) {
        var param = {
            url: 'fungusread/dbPhoto',
            data: {
                photo: photo
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //木耳读书轮播图
    lunbo( callback) {
        var param = {
            url: 'fungusread/banner',
           
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //木耳读书收听数量
    num(callback) {
        var param = {
            url: 'fungusread/listennum',

            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //撤回录音
    removerecord(recordId,callback) {
        var param = {
            url: 'fungusread/removeRecord',
            data:{
                recordId: recordId
            },
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
}
export {
    Book
};