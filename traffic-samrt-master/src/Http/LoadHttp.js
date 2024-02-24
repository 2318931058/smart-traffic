import {Http} from './Http.js'

export class LoadHttp extends Http{
    /* 普通用户上报 传用户账号，事件类型、事件发生地点、建筑标识，发生时间、描述信息和图片  */
    static reportHttp(username, load_type, load_addr, load_mark, load_time, load_info, pic){
        return super.Http({
            url:`/api/load/report`,
            data:{
                username,
                load_type,
                load_addr,
                load_mark,
                load_time,
                load_info,
                pic, 
            }
        })
    }

    /* 交管部门处理上报路况信息 传用户id*/
    static handleHttp(load_id){
        return super.Http({
            url:`/api/load/handle`,
            data:{
                load_id
            }
        })
    }

    /* 普通用户修改上报路况信息，只有在交管未处理时，才能修改
    传路况id、用户账号，事件类型、事件发生地点、建筑标识，发生时间、描述信息和图片 */
    static modfyHttp(load_id, username, load_type, load_addr, load_mark, load_time, load_info, pic){
        return super.Http({
            url:`/api/load/modify`,
            data:{
                load_id,    
                username,
                load_type,
                load_addr,
                load_mark,
                load_time,
                load_info,
                pic,
            }
        })
    }

    /* 普通用户撤销上报路况信息，只有在交管未处理时，才能撤销  */
    static deleteHttp(load_id){
        return super.Http({
            url:`/api/load/delete`,
            data:{
                load_id
            }
        })
    }

    /* 查询普通用户上报路况信息，用于普通用户查看上报进度（未处理还是已处理）、交警用户查看上报的具体信息 
       不需要传值*/
    static getAllLoadHttp(){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type:"load/load"
            }
        })
    }
}