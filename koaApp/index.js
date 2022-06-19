const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    console.log(ctx.request.url)
    ctx.body = 'hello world'
})

app.listen(3000)