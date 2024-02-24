const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/notice/add", async ctx => {
      /* 三种不同用户登录 */
      const { type,info,time } = ctx.request.body;
      try {
            const result = await ReadFile("notice/notice");
            const com_result = await ReadFile("common");
            let obj = {}
            let arr = []
            if (type==='some') {
                  obj = {
                    notice_id:result[result.length-1].id+1,
                    info,
                    time,
                    type:'some',
                    user:[]
                  }
                  result.push(obj)
                  WriteFile({ type:"notice/notice", result })
                  ctx.body = {
                        code: 200,
                        msg: "添加公告成功"
                  }
            } else if(type==='all'){    
                com_result.forEach(item=>{
                    arr.push({
                        id:item.id,
                        username:item.username,
                        status:'未读'
                    })
                })

                obj = {
                    notice_id:result[result.length-1].id+1,
                    info,
                    time,
                    type:'all',
                    user:arr
                  }
                result.push(obj)
                WriteFile({ type:"notice/notice", result })
                ctx.body = {
                    code: 200,
                    msg: "添加公告成功"
                }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,添加公告失败"
                  }
            }

      } catch (err) {
            ctx.body = {
                  msg: "请求参数不合法",
                  code: 400
            }
      }

})
module.exports = router;