import {Http} from './Http.js'

export class PoliceHttp extends Http{
    /* 查看警务室   不需要传值*/
    static getAllPoliceHttp(){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type:"police/police"
            }
        })
    }
}