module.exports = (app) => {
    // 开启Jwt
    require('@/middlewares/jwt')(app)
}