import {Http} from './Http.js'

export class NoticeHttp extends Http{

    /* 添加公告，传公告类型（some和all）、公告内容和发送公告的时间 */
    static addHttp(type,info,time){
        return super.Http({
            url:`/api/notice/add`,
            data:{
                type,
                info,
                time
            }
        })
    }

    /* 普通用户已读公告，用户提示框那里对应该条公告显示为已读
    传公告的id(注意不是用户的id)  还有账号名 */
    static readHttp(notice_id,username){
        return super.Http({
            url:`/api/notice/read`,
            data:{
                notice_id,
                username
            }
        })
    }

    /* 查询得到所有的公告数据，不需要传参 */
    static getAllNoticeHttp(){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type:"notice/notice"
            }
        })
    }

}