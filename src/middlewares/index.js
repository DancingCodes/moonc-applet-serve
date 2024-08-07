module.exports = (app) => {
    require('@/middlewares/jwt').init(app)

    require('@/middlewares/static').init(app)
}