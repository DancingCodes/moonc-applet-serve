module.exports = (app) => {
    // 格式化body
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.use('/user', require('@/routes/user'));
    app.use('/uploadFile', require('@/routes/uploadFile'));
    app.use('/memo', require('@/routes/memo'));
}