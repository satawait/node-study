const UserModel = require('../model/userModel')
const UserService = {
    addUser: params => {
        return UserModel.create(
            params
        )
    },
    loginUser: params => {
        return UserModel.find(
            params
        )
    },
    updateUser: params => {
        return UserModel.updateOne(
            params.a,
            params.b
          )
    },
    deleteUser: params => {
        return UserModel.deleteOne(
            params
          )
    },
    getUser: params => {
       return UserModel.find(params.a, params.b).skip(1).limit(2).sort({username: -1})
    }
}

module.exports = UserService