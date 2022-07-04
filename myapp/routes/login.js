var express = require('express');
var router = express.Router();
// const UserModel = require('../model/userModel')
const UserController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/api', UserController.loginUser);
router.post('/api/logout', UserController.logoutUser);
module.exports = router;
