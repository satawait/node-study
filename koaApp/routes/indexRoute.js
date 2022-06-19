const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
    console.log(ctx.cookies.get('location'))
    ctx.cookies.set('location', 'chengdu')
    await ctx.render('index')
})

module.exports = router