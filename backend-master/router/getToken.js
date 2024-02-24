const router = require("koa-router")();
const secret = "123456";
const jwt = require('jsonwebtoken');
router.get("/api/getToken", async ctx => {
      const token = ctx.header.authorization //获取jwt;
      console.log(token)
      if (token) {
            let payload = jwt.verify(token.split(' ')[1], secret) // // 解密，获取payload
            ctx.body = {
                  payload,     //载荷  比如注册用户得到的载荷就是{"name":"chen","password":"123456"}
                  token        
            }
      } else {
            ctx.body = {
                  message: 'token 错误',
                  code: -1
            }
      }
})
module.exports = router;