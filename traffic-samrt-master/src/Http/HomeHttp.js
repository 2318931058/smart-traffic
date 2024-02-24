import {Http} from './Http.js'

export class HomeHttp extends Http{
    /* 登录，传用户类型，账号和密码 */
    static loginHttp(type,username,password){
        return super.Http({
            url:`/api/login`,
            data:{
                type,
                username,
                password
            }
        })
    }
    /* 退出登录，传用户类型，账号 */
    static logoutHttp(type,username){
        return super.Http({
            url:`/api/logout`,
            data:{
                type,
                username,
            }
        })
    }
    /* 注册  传用户类型、账号和密码    普通用户在首页注册， 交警在超管后台添加用户*/
    static registerHttp(type,username,password){
        return super.Http({
            url:`/api/register`,
            data:{
                type,
                username,
                password
            }
        })
    }
    /* 查询用户，用于后台列表渲染  传用户类型*/
    static getAllUserHttp(type){   
        return super.Http({
            url:`/api/user`,
            method:'get',
            params:{
                type
            }
        })
    }
    /* 超管修改账号和密码，  传用户的id，类型，账号和密码*/
    static patchHttp(id,type,username,password){   
        return super.Http({
            url:`/api/patch`,
            data:{
                id,
                type,
                username,
                password
            }
        })
    }
    /* 普通和交管 修改密码，  传用户的类型，账号和密码*/
    static modifyHttp(type,username,password){   
        return super.Http({
            url:`/api/modify`,
            data:{
                type,
                username,
                password
            }
        })
    }

    /* 删除，  传用户的类型，账号*/
    static deleteHttp(type,username){   
        return super.Http({
            url:`/api/delete`,
            data:{
                type,
                username,
            }
        })
    }
}