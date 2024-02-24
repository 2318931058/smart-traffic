const router = require("koa-router")();
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
/* 超管修改普通和交警账号和密码 */
router.post("/api/patch", async ctx => {
      const { id,username,password, type } = ctx.request.body;
      try {
            const result = await ReadFile(type);
            console.log(result)
            let res = result.findIndex(item=>item.id===id)
            if (result[res]) {     //超管修改账号或密码
                  if(type==='common'){
                        const load_result = await ReadFile("load/load");  //修改load里面的值
                        load_result.forEach(item => {
                              if(item.id===id){
                                    item.username = username
                              }
                        });
                        WriteFile({ type:"load/load", result: load_result })

                         /* notice的数据也会被修改，涉及里面的username */
                         const notice_result = await ReadFile("notice/notice");
                         notice_result.forEach(item=>{
                              if(item.user.length){    
                                    let index = item.user.findIndex(_item=>_item.id===id)
                                    if(item.user[index]){
                                          item.user[index].username = username
                                    }
                              
                              }
                        })
                        WriteFile({ type:"notice/notice", result: notice_result })
                  }
                  result[res].username = username
                  result[res].password = password
                  WriteFile({ type, result })
                  ctx.body = {
                        code: 200,
                        msg: "修改成功"
                  }
            }else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,修改失败"
                  }
                  // ctx.status = 400
                  // ctx.statusText = 'Bad Request'
            }

      } catch (err) {
            ctx.body = {
                  msg: "请求参数不合法",
                  code: 400
            }
            // ctx.status = 400
            // ctx.statusText = 'Bad Request'
      }

})
module.exports = router;