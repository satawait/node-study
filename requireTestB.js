const add = require('./requireTestA.js')
require('./requireTestA.js')
add(1, 3)

// 模块中执行时会被 module wrapper 包裹，并注入全局变量 require 及 module 等
// module.exports 与 exports 的关系实际上是 exports = module.exports
// require 实际上是 module.require
// require.cache 会保证模块不会被执行多次
// 不要使用 delete require.cache 这种黑魔法