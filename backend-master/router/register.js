/* 用户注册 */
const router = require("koa-router")();
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
import { createId } from '../utils/createId'
/* 查询所有的普通用户*/
router.post("/api/register", async ctx => {
      const { type,username, password  } = ctx.request.body;
      /* 只有不包含用户才添加 */
      let result = await ReadFile(type);
      const res = result.find(item => item.username == username);
      if (res) {
            // ctx.response.status = 400;
            ctx.body = {
                  code: 400,
                  msg: "用户名重复,请重新注册"
            }
      } else {
            if (password && username) {
                  let id = createId()
                  var obj = {
                        id,
                        username,
                        password,
                        type,
                        "isOnline": false,
                  }
                  result.push(obj);
                  WriteFile({
                        type,
                        result
                  })

                  ctx.body = {
                        code: 200,
                        msg: "注册成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数不合法"
                  }
            }
      }

})
module.exports = router;