const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 更新事件 */
router.post("/api/event/modify", async ctx => {
      const { fid, event_status } = ctx.request.body;
      try {
            const result = await ReadFile("event/event");
            let res = result.find(item=>item.fid===fid)
            if (res) {
                res.event_status = event_status
                  WriteFile({ type:"event/event", result })
                  ctx.body = {
                        code: 200,
                        msg: "修改事件成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,修改事件失败"
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