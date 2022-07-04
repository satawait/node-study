# node-study

## nodemon 重启

## res.write('string | file', 'utf-8') res.wrhteHead({ 'Content-Type': 'text/html' }) res.end()

## https.get get请求

## https.request(options, res => {}) post请求

## cheerio 爬虫 cheerio.load('<ul id = "fruits">...</ul>')  on 'data' on 'end'

## events 事件总线

## path.basename(path) 获取文件名 path.extname(path) 获取扩展名

## fs writeFile appendFile  readFile unlink 删文件 mkdir rmdir readdir stat fs.promises existsSync 是否存在 on 'data' on 'end'

## createReadStream createWriteStream readStream.pipe(writeStream) res是可写流 gzip = zlib.createGzip() content-encoding: gzip

## hash = crypto.createHash('md5' | 'sha1') hash.update('123') hash.digest('hex')

## hash = crypto.createHmac('md5', 'key') hash.update('123') hash.digest('hex')

## 加密

## url = new URL(req.url, '127.0.0.1')

## __dirname 当前绝对路径  path.join(__dirname, '/static', url.pathname)

## mime.getType('css') // 获取文件类型 text/css

## express req.query req.body app.use(express.urlencoded({extended: false})) app.use(express.json())

## res.send res.json res.render

## express 线性模式 koa 洋葱模式

## mysql 外键约束 cascade set null no action restrict

## http-proxy-middleware

## assert.strictEqual(sum(1, 2), 6)  异步断言回调done() 也可用async await  supertest(server).get('/').expect('Content-type', /text\/html/)  钩子函数 after(() => server.close()) before(() => server.listen(3000)) beforeEach afterEach
