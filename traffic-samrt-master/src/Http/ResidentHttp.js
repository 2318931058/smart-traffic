import {Http} from './Http.js'

export class ResidentHttp extends Http{
    /* 查看居民区   不需要传值*/
    static getAllResidentHttp(){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type:"resident/resident"
            }
        })
    }
}