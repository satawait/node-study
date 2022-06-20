const { WebSocket, WebSocketServer } = require('ws')
const JWT = require('../util/JWT')

const wss = new WebSocketServer({
    port: 8080
})
// websocket响应
wss.on('connection', (ws, req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1:8080')
    let token = url.searchParams.get('token')
    token = JWT.verify(token)
    if (token) {
      // 重新计算token过期时间
      const newToken = JWT.generate({
        _id: token._id,
        username: token.username
      }, '1h')
      ws.user = token
      ws.send(createMessage(WebSocketType.GROUPCHAT, null, 'welcome'))
      sendAll(createMessage(WebSocketType.GROUPLIST, null, JSON.stringify(Array.from(wss.clients).map(client => client.user.username))))
    } else {
      ws.send(createMessage(WebSocketType.ERROR, null, '未登录'))  
    }
    ws.on('message', data => {
        const msg = JSON.parse(data)
        switch (msg.type) {
            case WebSocketType.GROUPLIST:
                ws.send(createMessage(WebSocketType.GROUPLIST, null, JSON.stringify(Array.from(wss.clients).map(client => client.user.username))))
                break;
            case WebSocketType.GROUPCHAT:
                const message = JSON.parse(data)
                console.log('receive: %s', data, ws.user.username, message.data)
                wss.clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(createMessage(WebSocketType.GROUPCHAT, ws.user.username, message.data), {
                            binary: false
                        })
                    }
                })
                break;
            case WebSocketType.SINGLECHAT:
                const msg = JSON.parse(data)
                const client = Array.from(wss.clients).find(client => client.user.username === msg.user)
                if (client) {
                    client.send(createMessage(WebSocketType.SINGLECHAT, ws.user.username, msg.data), {
                        binary: false
                    })
                }
                break;
            case WebSocketType.SUCCESS:
            
                break;
            case WebSocketType.ERROR:
            
            break;
            default:
                break;
        }
    })
    ws.on('close', () => {
        sendAll(createMessage(WebSocketType.GROUPLIST, null, JSON.stringify(Array.from(wss.clients).map(client => client.user.username))))
    })
  })
  
  const WebSocketType = {
    ERROR: 0,
    SUCCESS: 1,
    GROUPLIST: 2,
    GROUPCHAT: 3,
    SINGLECHAT: 4
  }
  
  function createMessage(type, user, data) {
    return JSON.stringify({
      type,
      user,
      data
    })
  }

  function sendAll(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data, {
                binary: false
            })
        }
    })
  }