const router = require("koa-router")();
/* 查询所有的普通用户*/
import { ReadFile, WriteFile } from '../../utils/ReadWriteFile'
/* 登出 */
router.post("/api/load/report", async ctx => {
      /* 三种不同用户登录 */
      const { username,load_type,load_addr,load_mark,load_time,load_info,pic } = ctx.request.body;
      try {
            const result = await ReadFile("load/load");
            const com_result = await ReadFile("common");
            const res = com_result.find(item=>item.username===username)
            if (res) {
                let obj = {
                    load_id:result[result.length-1].load_id+1,
                    id:res.id,
                    username,
                    load_type,
                    load_addr,
                    load_mark,
                    load_time,
                    load_info,
                    load_info,
                    pic,
                    status:"未处理",
                }
                result.push(obj)
                  WriteFile({ type:"load/load", result })
                  // await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);
                  ctx.body = {
                        code: 200,
                        msg: "上报成功"
                  }
            } else {
                  ctx.body = {
                        code: 400,
                        msg: "参数错误,上报失败"
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