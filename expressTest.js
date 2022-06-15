const express = require('express')

const app = express()

const homeRouter = express.Router()
const apiRouter = express.Router()

// 配置解析post参数中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

// 错误中间件

app.use((req, res) => {
    res.status(404).send('error')
})

app.listen(3000)