import {Http} from './Http.js'

export class EventHttp extends Http{
    /* 交警添加事件 
    传事件id，事件类型、事件等级、发生时间、事件发生地点、车牌号，车主名字、处理状态（一般为待处理）  */
    static addHttp(event_id, event_type, event_level, event_time, event_place, driver_car, driver_name, event_status,event_axis){
        return super.Http({
            url:`/api/event/add`,
            data:{
                event_id,
                event_type,
                event_level,
                event_time,
                event_place,
                driver_car,
                driver_name,
                event_status,
                event_axis
            }
        })
    }

    /* 交管部门更新事件 
    传序号fid、事件id，事件类型、事件等级、发生时间、事件发生地点、车牌号，车主名字、处理状态（一般为待处理）*/
    static modifyHttp(fid,event_status){
        return super.Http({
            url:`/api/event/modify`,
            data:{
                fid,
                event_status
            }
        })
    }

    /* 查看事件   不需要传值*/
    static getAllEventHttp(){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type:"event/event"
            }
        })
    }
}