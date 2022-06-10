const http = require('http')

class Application {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            const ctx = new Context(req, res)
            try {
                const fn = compose(this.middlewares)
                await fn(ctx)
            } catch(e) {
                console.error(e)
                ctx.res.statusCode = 500
                ctx.res.end('Internel Server Error')
            }
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(ctx.body),
                'Content-Type': 'text/html'
            })
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
}

class Context {
    constructor(req, res) {
        this.req = req
        this.res = res
    }
}

function compose(middlewares) {
    return ctx => {
        const dispatch = i => {
            const middleware = middlewares[i]
            if (i === middlewares.length) {
                return
            }
            return middleware(ctx, () => dispatch(i + 1))
        }
        return dispatch(0)
    }
}

module.exports = Application

// exports.Koa = Application