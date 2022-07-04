const Koa = require('./simpleKoa')
const url = require('url')
const app = new Koa()
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  hello, world. 
</body>
</html>`
app.use(async (ctx, next) => {
    console.log('Middleware 1 start')
    await next()
    console.log('Middleware 1 end')
})

app.use(async (ctx, next) => {
    console.log('Middleware 2 start')
    await next()
    console.log('Middleware 2 end')
    ctx.body = html
})

app.listen(3000)