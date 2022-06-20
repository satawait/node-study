var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const { Mongoose } = require('mongoose');
const mongoStore = require('connect-mongo')
const JWT = require('./util/JWT')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/upload');
var chatRouter = require('./routes/chat');

var app = express();


app.use(express.static('uploads'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'myapp',
  secret: 'password',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  resave: true, // 重新设置session后重新计算时间
  saveUninitialized: true,
  rolling: true,
  store: mongoStore.create({
    mongoUrl: 'mongodb://root:example@127.0.0.1:27017/myapp_session',
    ttl: 1000 * 60 * 60
  })
}))
// session校验
// app.use((req, res, next) => {
//   if (req.session.user || req.url.includes('login')) {
//     req.session.date = Date.now()
//     next()
//   } else {
//     req.url.includes('api') ? res.status(401).send({res: 0}) : res.redirect('/login')
//   }
// })

// Token校验
app.use((req, res, next) => {
  if (req.url.includes('login')) {
    next()
  } else {
    const authorization = req.headers.authorization?.split(' ')[1]
    console.log(authorization)
    if (!authorization) {
      next()
      // req.url.includes('api') ? res.status(401).send({res: 0}) : res.redirect('/login')
    } else {
      token = JWT.verify(authorization)
      if (token) {
        // 重新计算token过期时间
        const newToken = JWT.generate({
          _id: token._id,
          username: token.username
        }, '1h')
        res.header('authorization', newToken)
        next()
      } else {
        req.url.includes('api') ? res.status(401).send({res: 0}) : res.redirect('/login')
      }
    }
    
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
