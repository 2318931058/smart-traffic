const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/notice/read", async ctx => {
      /* id为公告的id，username为用户名 */
      const { username,notice_id } = ctx.request.body;
      try {
            const result = await ReadFile("notice/notice");
            let res = result.find(item=>item.notice_id===notice_id)
            if (res) {
                let index = res.user.findIndex(item=>item.username===username)
                res.user[index].status = '已读'
                WriteFile({ type:"notice/notice", result })
                ctx.body = {
                    code: 200,
                    msg: "已读公告成功"
                }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,已读公告失败"
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