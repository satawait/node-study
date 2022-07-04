const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body = [1, 2, 3]
})

.post('/', (ctx, next) => {
    ctx.body = {
        res: 1,
        info: 'add success'
    }
})

.put('/:id', (ctx, next) => {
    console.log(ctx.params.id)
    ctx.body = {
        res: 1,
        info: 'update success'
    }
})

.del('/:id', (ctx, next) => {
    console.log(ctx.params.id)
    ctx.body = {
        res: 1,
        info: 'delete success'
    }
})

module.exports = router