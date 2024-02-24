const Koa = require("koa");
const app = new Koa();
const initManage = require("./config/init");
initManage(app);
app.listen(3000, () => {
      console.log("App on port 3000")
})