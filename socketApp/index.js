const express = require('express')
const { WebSocket, WebSocketServer } = require('ws')

const app = express()
const wss = new WebSocketServer({
    port: 8080
})

app.use(express.static('public'))
// http响应
app.get('/', (req, res) => {
    res.end({
        res: 1
    })
})
// websocket响应
wss.on('connection', ws => {
    ws.on('message', data => {
        console.log('receive: %s', data)
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, {
                    binary: false
                })
            }
        })
    })
    ws.send('welcome')
})
app.listen(3000)