const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 添加事件 */
router.post("/api/event/add", async ctx => {
      const { event_id, event_type, event_level, event_time, event_place, driver_car, driver_name, event_status,event_axis } = ctx.request.body;
      try {
            const result = await ReadFile("event/event");
            if (result) {
                  let obj = {
                    fid:result[result.length-1].fid+1,
                    event_id,
                    event_type,
                    event_level,
                    event_time,
                    event_place,
                    driver_car,
                    driver_name,
                    event_status,
                    event_axis
                  }
                  result.push(obj)
                  WriteFile({ type:"event/event", result })
                  ctx.body = {
                        code: 200,
                        msg: "添加事件成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,添加事件失败"
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