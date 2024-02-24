const router = require("koa-router")();
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
/* 登出 */
router.post("/api/logout", async ctx => {
      /* 三种不同用户登录 */
      const { username, type } = ctx.request.body;
      try {
            const result = await ReadFile(type);
            let res = result.find(item => item.username == username);
            if (res) {
                  /* 登录成功修改登录状态 */
                  res.isOnline = false;
                  WriteFile({ type, result })
                  // await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);
                  ctx.body = {
                        code: 200,
                        msg: "登出成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,登录失败"
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