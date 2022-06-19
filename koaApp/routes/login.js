const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
    await ctx.render('login', {title: '欢迎'})
})

module.exports = router