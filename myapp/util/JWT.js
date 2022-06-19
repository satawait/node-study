const jwt = require('jsonwebtoken')

const secrect = 'myapp'
const JWT = {
    generate(data, expires) {
        return jwt.sign(
            data,
            secrect,
            {
                expiresIn: expires
            }
        )
    },
    verify(token) {
        try {
            return jwt.verify(token, secrect)
        } catch (error) {
            return false
        }
    }
}

module.exports = JWT