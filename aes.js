const crypto = require('crypto')

function encrypt(key, iv, data) {
    const dep = crypto.createCipheriv('aes-128-cbc', key, iv)
    return dep.update(data, 'binary', 'hex') + dep.final('hex')
}

function decrypt(key, iv, crypted) {
    const _crypted = Buffer.from(crypted, 'hex').toString('binary')
    const dep = crypto.createDecipheriv('aes-128-cbc', key, iv)
    return dep.update(_crypted, 'binary', 'utf8') + dep.final('utf8')
}

// 16 * 8 = 128
const key = 'abcdef0123456789'
const iv = '789fedcba0123456'

const crypted = encrypt(key, iv, 'node-study')
const decrypted = decrypt(key, iv, crypted)

console.log(crypted)
console.log(decrypted)