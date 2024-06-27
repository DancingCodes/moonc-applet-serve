const app = require('@/app')
const config = require('@/config')
const consoleLog = require('@/utils/consoleLog')
const fs = require('fs')
const path = require('path');

if (process.env.NODE_ENV === 'development') {
    require('http').createServer(app).listen(config.port, () => {
        consoleLog.success(`${config.host}:${config.port}`)
        consoleLog.success(`Http服务已启动`)
    });
} else {
    require('https').createServer({
        key: fs.readFileSync(path.join(process.cwd(), 'config', 'ssl', 'key.key')),
        cert: fs.readFileSync(path.join(process.cwd(), 'config', 'ssl', 'crt.crt'))
    }, app).listen(config.port, () => {
        consoleLog.success(`${config.host}:${config.port}`)
        consoleLog.success(`Https服务已启动`)
    });
}