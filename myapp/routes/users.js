var express = require('express');
var router = express.Router();
// const UserModel = require('../model/userModel')
const UserController = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api', UserController.addUser);

router.put('/api', UserController.updateUser);

router.delete('/api', UserController.deleteUser);

router.get('/api', UserController.getUser);

module.exports = router;
