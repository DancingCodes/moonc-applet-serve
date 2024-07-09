module.exports = (app) => {
    // 数据库
    require('@/config/database');

    // 服务
    require('@/config/serve')(app)

    // 静态资源
    require('@/config/staticRoute')(app)
}