const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
/* 登出 */
router.post("/api/delete", async ctx => {
      /* 三种不同用户登录 */
      const { username, type } = ctx.request.body;
      try {
            const result = await ReadFile(type);
            const notice_result = await ReadFile("notice/notice");
            let res = result.filter(item => item.username != username);
            if (res) {
                  if(type === 'common'){        //也会删除用户上报的数据
                        const load_result = await ReadFile("load/load");
                        const load_res = load_result.filter(item=>item.username!==username)
                        WriteFile({ type:"load/load", result: load_res })

                        /* 公告信息，会将对应的用户删除 */
                        notice_result.forEach(item=>{
                              if(item.user.length){
                                    let index = item.user.findIndex(_item=>_item.username===username)
                                    item.user.splice(index,1)
                              }
                        })
                        WriteFile({ type:"notice/notice", result: notice_result })
                  }
                  WriteFile({ type, result: res })
                  // await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);
                  ctx.body = {
                        code: 200,
                        msg: "删除成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,删除失败"
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