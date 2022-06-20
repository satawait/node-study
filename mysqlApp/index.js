const express = require('express')
const app = express()

const mysql2 = require('mysql2')

app.get('/', async(req, res) => {
    // 创建连接池
    const config = getDBConfig()
    const promisePool = mysql2.createPool(config).promise()
    const name = req.query.name
    // const students = await promisePool.query(`select * from students where name=? limit 50 offest 2`, [name])
    // const students = await promisePool.query(`insert into students (name, score) values(?, ?)`, [name, 100])
    // const students = await promisePool.query(`update students set name=?, score=? where id=?`, [name, 100, 1])
    const students = await promisePool.query(`delete from students where name=?`, [name])
    console.log(students[0])
    res.send({
        ok: 1,
        data: students[0]
    })
})

app.listen(3000)

function getDBConfig() {
    return {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'mysqlApp',
        connectionLimit: 1
    }
}