const Router = require('koa-router')
const JWT = require('../util/JWT')
const multer = require('@koa/multer')
const UserModel = require('../model/userModel')

const router = new Router()
const upload = multer({
    dest: 'uploads/'
  })

router.get('/', (ctx, next) => {
    ctx.body = [1, 2, 3]
})

.post('/', (ctx, next) => {
    console.log(ctx.query, ctx.querystring, ctx.params, ctx.request.body)
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

.post('/login', (ctx, next) => {
    console.log(ctx.request.body)
    const { username, password } = ctx.request.body
    if (username - 0 === 111 && password - 0 === 111) {
        // ctx.session.user = {
        //     username: 'test'
        // }
        // 设置token
        const token = JWT.generate({
            _id: 'test',
            username: 'test'
        }, "1h")
        // token返回在header中
        ctx.set('authorization', token)
        ctx.body = {
            res: 1
        }
    } else {
        ctx.body = {
            res: 0
        }
    }
})
.post('/upload', upload.single('file'), async (ctx, next) => {
    console.log(ctx.query, ctx.querystring, ctx.params, ctx.request.body, ctx.file)
    await UserModel.create(
        {
            ...ctx.request.body,
            avatar: ctx.file.filename
        }
    )
    ctx.body = {
        res: 1,
        info: 'add success'
    }
})

module.exports = router