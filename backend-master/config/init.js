const Router = require("koa-router");
/* 模块自动导入 */
const AutoDir = require("require-directory");
const cors = require("koa2-cors");
const { koaBody } = require("koa-body");
const onerror = require('koa-onerror');
const logger = require("koa-logger");
const jwtKoa = require('koa-jwt');
const secret = "123456";
function initManage(app) {
      onerror(app);
      app.use(logger());

      app.use(cors());
      // 错误处理
      app.use(function (ctx, next) {
            return next().catch((err) => {
                  if (401 == err.status) {
                        ctx.status = 404;
                        ctx.body = 'Protected resource, use Authorization header to get access\n';
                  } else {
                        throw err;
                  }
            });
      });
      // 这里调用引入的jwt方法，最终会得到一个中间件
      app.use(
            jwtKoa({
                  secret,
                  debug: true // 开启debug可以看到准确的错误信息
            })
                  .unless({
                        path: [/^\/api\/login/, /^\/api\/register/]
                  }) //数组中的路径不需要通过jwt验证
      );
      /* koaBody模块配置 可以实现跨域和图片上传 */
      /* 跨域中间件配置 */
      app.use(koaBody());
      const useRoutes = (obj) => {
            if (obj instanceof Router) {
                  app.use(obj.routes())
            }
      }
      AutoDir(module, process.cwd() + "/router", { visit: useRoutes })
}
module.exports = initManage;