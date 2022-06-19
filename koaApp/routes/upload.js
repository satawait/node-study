const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
    await ctx.render('upload')
    console.log(1111)
})

module.exports = router