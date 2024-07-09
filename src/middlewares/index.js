module.exports = (app) => {
    require('@/middlewares/jwt')(app)

    require('@/middlewares/static')(app)
}