const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/load/handle", async ctx => {
      /* 三种不同用户登录 */
      const { load_id } = ctx.request.body;
      try {
            const result = await ReadFile("load/load");
            const res = result.find(item=>item.load_id===load_id)
            if (res) {
                  res.status = '已处理'
                  WriteFile({ type:"load/load", result })
                  // await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);
                  ctx.body = {
                        code: 200,
                        msg: "处理成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,处理失败"
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