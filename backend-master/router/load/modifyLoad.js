const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/load/modify", async ctx => {
      /* 三种不同用户登录 */
      const { load_id,username,load_type,load_addr,load_mark,load_time,load_info,pic } = ctx.request.body;
      try {
            const result = await ReadFile("load/load");
            const res = result.find(item=>item.load_id===load_id)
            if (res.status === '未处理') {
                res.username = username
                res.load_type = load_type
                res.load_addr = load_addr
                res.load_mark = load_mark
                res.load_time = load_time
                res.load_info = load_info
                res.pic = pic
                  WriteFile({ type:"load/load", result })
                  ctx.body = {
                        code: 200,
                        msg: "修改成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,修改失败"
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