const { token } = require('morgan')
const io = require('socket.io')
const JWT = require('../util/JWT')
function start(server) {
    const ioServer = io(server)
    ioServer.on('connection', (socket, req) => {
        console.log('welcome', socket.handshake.query.token)
        const token = JWT.verify(socket.handshake.query.token)
        if (token) {
            // // 重新计算token过期时间
            // const newToken = JWT.generate({
            //     _id: token._id,
            //     username: token.username
            // }, '1h')
            socket.user = token
            socket.emit(WebSocketType.GROUPCHAT, createMessage(socket.user.username, 'welcome'))
            sendAll(ioServer, createMessage(null, Array.from(ioServer.sockets.sockets).map(item => item[1].user.username)))
        } else {
            socket.emit(WebSocketType.ERROR, createMessage(socket?.user?.username, 'error'))
        }
    })
    ioServer.on(WebSocketType.GROUPLIST, data => {
       ioServer.emit(WebSocketType.GROUPLIST, createMessage(null, Array.from(ioServer.sockets.sockets).map(item => tiem[1].user)))
    })
    ioServer.on(WebSocketType.GROUPCHAT, data => {
        
    })
    ioServer.on(WebSocketType.SINGLECHAT, data => {
        
    })
}

const WebSocketType = {
    ERROR: 0,
    SUCCESS: 1,
    GROUPLIST: 2,
    GROUPCHAT: 3,
    SINGLECHAT: 4
  }
  
  function createMessage(user, data) {
    return JSON.stringify({
      user,
      data
    })
  }

  function sendAll(ioServer, data) {
    ioServer.sockets.emit(WebSocketType.GROUPLIST, data)
  }
module.exports = start