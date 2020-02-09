const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const statics = require('koa-static-cache')
const app = new Koa();
const Router = require('koa-router');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');

const router = new Router();

router.get('/healthCheck', async (ctx) => {
  ctx.toJSON({ code: 200 });
  ctx.response.body = '<h1>200</h1>';
});

router.get('/*', async (ctx) => {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFileSync(path.resolve(__dirname, './build/index.html'), 'utf8')
});

app.use(cors({ credentials: true }))
app.use(statics(path.join(__dirname, './build/'), {
  maxAge: 0,
}))

app.use(bodyParser())
app.use(router.routes());

app.listen(8080, () => {
  console.log(`WebSite访问端口：8080`);
});

