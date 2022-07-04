var express = require('express');
var router = express.Router();
// const UserModel = require('../model/userModel')
// const UserController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload');
});

// router.post('/api', UserController.loginUser);
module.exports = router;
