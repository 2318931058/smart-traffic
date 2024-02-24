const router = require("koa-router")();
import { ReadFile } from '../utils/ReadWriteFile'
/* 查询不同类型的用户*/
router.get("/api/user", async ctx => {
      try {
            const result = await ReadFile(ctx.query.type)
            ctx.body = {
                  code: 200,
                  msg: "请求成功",
                  result
            }
      } catch (err) {
            console.log(err)
            ctx.body = {
                  code: 400,
                  msg: "请求的参数不合法"
            }
      }

})
module.exports = router;