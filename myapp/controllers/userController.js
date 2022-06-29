const UserService = require('../services/UserSerivce')
const JWT = require('../util/JWT')

const UserController = {
    addUser: (req, res, next) => {
        let file
        if (req.file) {
            file = req.file.filename
        }
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.addUser(
            { username, password, file }
        ).then(data => {
            console.log(data)
            res.send({
                res: 1
            });
        }).catch(e => {
            console.log(e)
            res.send({
                res: 0
            });
        })
    },
    loginUser: (req, res, next) => {
        console.log(req.body)
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.loginUser(
            { username, password }
        ).then(data => {
            console.log(data)
            if (data.length) {
                // // 创建session
                // req.session.user = data[0]
                // 设置token
                const token = JWT.generate({
                    _id: data[0]._id,
                    username: data[0].username
                }, "1m")
                // token返回在header中
                res.header('authorization', token)
                res.send({
                    res: 1,
                    authorization: token
                });
            } else {
                res.send({
                    res: 0
                });
            }
        }).catch(e => {
            console.log(e)
            res.send({
                res: 0
            });
        })
    },
    logoutUser: (req, res, next) => {
        req.session.destroy(() => {
            res.send({
                res: 1
            })
        })
    },
    updateUser: (req, res, next) => {
        console.log(req.body)
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        const { username, password } = req.body
        UserService.updateUser({ a: { username }, b:{ password }}).then(data => {
            console.log(data, 22222)
            res.send({
                res: 1
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
                res: 1
            });
        }).catch(e => {
            console.log(e)
            res.send({
                res: 0
            });
        })
    },
    getUser: (req, res, next) => {
        // 插入数据库
        // 创建user模型--users数据库集合
        // user.create user.find user.delete user.update
        // console.log(req.query)
        const { username, password } = req.query
        console.log(username, password)
        UserService.getUser({ a: {username }, b: ['username', 'password', 'file'] }).then(data => {
            console.log(data)
            res.send(data);
        }).catch(e => {
            console.log(e)
            res.send({
                res: []
            });
        })
    }
}

module.exports = UserController