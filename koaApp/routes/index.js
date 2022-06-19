
const Router = require('koa-router')

const userRouter = require('./user')
const listRouter = require('./list')
const homeRouter = require('./home')
const loginRouter = require('./login')
const uploadRouter = require('./upload')
const indexRouter = require('./indexRoute')

const router = new Router()

// router.prefix('/api')
// 注册路由组件
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/list', listRouter.routes(), listRouter.allowedMethods())
router.use('/home', homeRouter.routes(), homeRouter.allowedMethods())
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/upload', uploadRouter.routes(), uploadRouter.allowedMethods())
router.use('/index', indexRouter.routes(), indexRouter.allowedMethods())

router.redirect('/', '/home')

module.exports = router