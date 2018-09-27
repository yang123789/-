import { Base } from '../../utils/base.js';

class Sign extends Base {
    constructor() {
        super();
    }

    // 日推小任务
    task(callback) {
        var param = {
            url: 'Growgrass/dayTask',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //确认答案
    subanswer(answer,id,callback) {
        var param = {
            url: 'Growgrass/comfirmAnswer',
            data: {
                answer: answer,
                id:id
            },
            sCallback: function (data) {
                console.log(data);
                callback && callback(data);
            }
        };
        this.request(param);
    }
    //往期情况
    past(callback) {
      var param = {
        url: 'Growgrass/getBefore',
        sCallback: function (data) {
          callback && callback(data);
          // console.log(data)
        }
      };
      this.request(param);
    }
    //保存图片
    save(id,callback) {
      var param = {
        url: 'Growgrass/savePicture',
          data: {
              id: id
          },
        sCallback: function (data) {
          callback && callback(data);
          // console.log(data)
        }
      };
      this.request(param);
    }

   
}
export {
    Sign
};