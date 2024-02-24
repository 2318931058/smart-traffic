const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/load/delete", async ctx => {
      /* 三种不同用户登录 */
      const { load_id } = ctx.request.body;
      try {
            const result = await ReadFile("load/load");
            const res = result.findIndex(item=>item.load_id===load_id)
            if (result[res].status === '未处理') {
                  result.splice(res,1)
                  WriteFile({ type:"load/load", result })
                  ctx.body = {
                        code: 200,
                        msg: "撤销成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,撤销失败"
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