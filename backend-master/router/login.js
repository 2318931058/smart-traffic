const router = require("koa-router")();
import { ReadFile, WriteFile } from '../utils/ReadWriteFile'
const jwt = require('jsonwebtoken');
const secret = "123456";
router.post("/api/login", async ctx => {
      /* 三种不同用户登录 */
      const { username, password, type } = ctx.request.body;
      let userToken = {
            name: username
      }
      try {
            const result = await ReadFile(type);
            let res = result.find(item => item.username == username && item.password == password);
            if (res) {
                  /* 登录成功修改登录状态 */
                  res.isOnline = true;
                  WriteFile({ type, result })
                  const token = jwt.sign(userToken, secret, {
                        expiresIn: '1d'
                  })
                  // await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);
                  ctx.body = {
                        code: 200,
                        msg: "登录成功",
                        token
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "用户名或密码错误,登录失败"
                  }
                  ctx.status = 400
                  ctx.statusText = 'Bad Request'
            }

      } catch (err) {
            ctx.body = {
                  msg: "请求参数不合法",
                  code: 400
            }
            ctx.status = 400
            ctx.statusText = 'Bad Request'
      }

})
module.exports = router;