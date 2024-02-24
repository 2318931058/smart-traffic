const router = require("koa-router")();
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
/* 修改密码 */
router.post("/api/modify", async ctx => {
      /* 三种不同用户修改 */
      const { username,password, type } = ctx.request.body;
      try {
            const result = await ReadFile(type);
            let res = result.findIndex(item=>item.username===username)
            if (result[res]) {     //普通用户或交管修改密码
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