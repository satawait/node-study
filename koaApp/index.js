const Koa = require('koa')
const router = require('./routes')
const koaStatic = require('koa-static')
const path = require('path')
const bodyParser = require('koa-bodyparser')
// const ejs = require('ejs')
const koaViews = require('koa-views')
const session = require('koa-session-minimal')
const JWT = require('./util/JWT')

const app = new Koa()

// app.use((ctx, next) => {
//     console.log(ctx.request.url)
//     ctx.body = 'hello world'
// })
require('./config/db.config.js')
app.use(koaStatic(path.join(__dirname, 'static')))
app.use(bodyParser()) // post参数

app.use(koaViews(path.join(__dirname, 'views'), { extension: 'ejs' }))

app.use(session({
    key: 'koaapp',
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
// 异步
app.use(async (ctx, next) => {
    console.log(ctx.url)
    if (ctx.url.includes('login')) {
        await next()
        return
    }
    // if (ctx.session.user) {
    //     ctx.session.date = Date.now()
    //     await next()
    // } else {
    //     ctx.redirect('/login')
    // }
    const authorization = ctx.headers.authorization?.split(' ')[1]
    console.log(ctx.headers.authorization)
    if (!authorization) {
        await next()
      } else {
        token = JWT.verify(authorization)
        if (token) {
        // 重新计算token过期时间
            const newToken = JWT.generate({
                _id: token._id,
                username: token.username
            }, '1h')
                ctx.set('authorization', newToken)
                await next()
            } else {
                if (ctx.url.includes('user')) {
                    ctx.status = 401
                    ctx.body = {
                        res: 0
                    }
                } else {
                    ctx.redirect('/login')
                }
        }
    }
})
app.use(router.routes())
app.use(router.allowedMethods()) // 只响应指定的请求类型
app.listen(3000)