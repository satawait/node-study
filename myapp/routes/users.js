var express = require('express');
const multer = require('multer')
var router = express.Router();
// const UserModel = require('../model/userModel')
const UserController = require('../controllers/userController')

const upload = multer({
  dest: 'uploads/'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api', UserController.addUser);

router.put('/api', UserController.updateUser);

router.delete('/api', UserController.deleteUser);

router.get('/api', UserController.getUser);

router.post('/api/upload', [upload.single('file'), UserController.addUser]);

module.exports = router;
