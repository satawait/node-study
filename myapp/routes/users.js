var express = require('express');
var router = express.Router();
const UserModel = require('../model/userModel.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api', function(req, res, next) {
  console.log(req.body)
  // 插入数据库
  // 创建user模型--users数据库集合
  // user.create user.find user.delete user.update
  const { username, password } = req.body
  UserModel.create(
    {
      username,
      password
    }
  ).then(data => {
    console.log(data)
    res.send({
      res: 'ok'
    });
  }).catch(e => {
    console.log(e)
    res.send({
      res: 'error'
    });
  })
});

router.put('/api', function(req, res, next) {
  console.log(req.body)
  // 插入数据库
  // 创建user模型--users数据库集合
  // user.create user.find user.delete user.update
  const { username, password } = req.body
  UserModel.updateOne(
    {
      username
    },
    {
      password
    }
  ).then(data => {
    console.log(data)
    res.send({
      res: 'ok'
    });
  }).catch(e => {
    console.log(e)
    res.send({
      res: 'error'
    });
  })
});

router.delete('/api', function(req, res, next) {
  console.log(req.body)
  // 插入数据库
  // 创建user模型--users数据库集合
  // user.create user.find user.delete user.update
  const { username, password } = req.body
  UserModel.deleteOne(
    {
      username
    }
  ).then(data => {
    console.log(data)
    res.send({
      res: 'ok'
    });
  }).catch(e => {
    console.log(e)
    res.send({
      res: 'error'
    });
  })
});

router.get('/api', function(req, res, next) {
  // 插入数据库
  // 创建user模型--users数据库集合
  // user.create user.find user.delete user.update
  UserModel.find({}, ['username', 'password']).skip(1).limit(2).sort({username: -1}).then(data => {
    console.log(data)
    res.send(data);
  }).catch(e => {
    console.log(e)
    res.send({
      res: 'error'
    });
  })
});

module.exports = router;
