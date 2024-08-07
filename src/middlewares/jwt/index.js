const { expressjwt } = require('express-jwt');
const response = require('@/utils/response')

const jwtKey = 'moonc';

const init = (app) => {
    app.use(expressjwt({ secret: jwtKey, algorithms: ['HS256'] }))

    app.use((err, req, res, next) => {
        const requestUrl = req.originalUrl;

        // 静态资源直接放行
        const staticFileList = ['/apiDoc', '/uploadImage']
        if (staticFileList.some(item => requestUrl.startsWith(item))) {
            return next();
        }

        // jwt白名单接口
        const jwtWhiteApiList = ['/', '/user/login']
        const isNext = jwtWhiteApiList.includes(requestUrl)

        if (isNext) {
            return next()
        }
        // token错误
        if (err.name === 'UnauthorizedError') {
            return res.send(response.error(401, '身份验证未通过'))
        }
        res.send({
            statusCode: 500,
            message: '未知错误'
        })
    })

}
module.exports = {
    jwtKey,
    init
}
