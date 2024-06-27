// 引入mongoose模块
const mongoose = require('mongoose');
const consoleLog = require('@/utils/consoleLog')

// 本地
const path = 'mongodb://MooncApplet:123456@127.0.0.1:27017/MooncApplet?authSource=MooncApplet'

mongoose.connect(path).then(() => {
    consoleLog.success('数据库已连接')
}).catch(err => {
    consoleLog.error('数据库连接失败')
})