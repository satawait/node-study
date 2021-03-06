const express = require('express')

const app = express()
const ejsRouter = express.Router()
const cookieParser = require('cookie-parser')

app.set('views' , './views')
app.set('view engine', 'ejs')
// app.set('view engine', 'html') // 支持直接渲染html文件
// app.engine('html', require('ejs').renderFile)

app.use(express.static('static'))

app.use('/static', express.static('static'))

const homeRouter = express.Router()
const apiRouter = express.Router()

// 配置解析post参数中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/abc?d', (req, res) => {
    res.send({
        test: 1
    })
})

app.get('/abc/:d', (req, res) => {
    res.send({
        test: 2
    })
})

app.get('/abc*d', (req, res) => {
    res.send({
        test: 3
    })
})

app.get('/a(bc)?d', (req, res) => {
    res.send({
        test: 4
    })
})

// 应用级别
app.use([func1])

app.use('/adccc', [func1])

app.get('/adccc', [func1, func2])

function func1(req, res, next) {
    const valid = true
    if (valid) {
        console.log('验证')
        next()
    } else {
        res.send('error')
    }
}

function func2(req, res, next) {
    res.send('hello!')
}

//路由级别
homeRouter.get('/aaa', (req, res) => {
    res.send('home')
})
app.use('/home', homeRouter)

apiRouter.get('/aaa', (req, res) => {
    res.send('api')
})
apiRouter.post('/aaa', (req, res) => {
    console.log(req.body)
    res.send({test: 2})
})
app.use('/api', apiRouter)

ejsRouter.get('/home', (req, res) => {
    res.render('home', { list: [1, '<p>2</p>', 3] })
})
// ejsRouter.get('/apilogin', (req, res) => {
//     res.send('通过啦！')
// })

ejsRouter.get('/login', (req, res) => {
    console.log(req.cookies)
    res.cookie('gender', 'male')
    res.render('login', {title: 123})
})
ejsRouter.post('/login', (req, res) => {
    console.log(req.cookies)
    if (req.body.username === '123' && req.body.password === '123') {
        res.redirect('home')
    } else {
        res.render('login', {title: '登录失败了'})
    }
})
app.use('/ejsTest', ejsRouter)

// 错误中间件
app.use((req, res) => {
    res.status(404).send('not found')
})

app.listen(3000)