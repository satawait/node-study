const express = require('express')

const app = express()

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

app.get('/adccc', [func1, func2])

function func1(req, res, next) {
    const valid = true
    if (valid) {
        next()
    } else {
        res.send('error')
    }
}

function func2(req, res, next) {
    res.send('hello!')
}
app.listen(3000)