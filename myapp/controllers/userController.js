const UserService = require('../services/UserSerivce')
const UserController = {
    addUser: (req, res, next) => {
        console.log(req.body)
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.addUser(
            { username, password }
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
    },
    updateUser: (req, res, next) => {
        console.log(req.body)
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.updateUser({ a: { username }, b:{ password }}).then(data => {
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
    },
    deleteUser: (req, res, next) => {
        console.log(req.body)
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.deleteUser({ username }).then(data => {
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
    },
    getUser: (req, res, next) => {
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        UserService.getUser({ a: {}, b: ['username', 'password'] }).then(data => {
            console.log(data)
            res.send(data);
        }).catch(e => {
            console.log(e)
            res.send({
                res: 'error'
            });
        })
    }
}

module.exports = UserController