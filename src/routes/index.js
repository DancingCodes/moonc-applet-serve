module.exports = (app) => {
    // 格式化body
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send('<h1 style="position: absolute;left: 50%;top: 40%;transform: translate(-50%, -50%);">Moonc Applet Serve For Node.js</h1>')
    })

    app.use('/user', require('@/routes/user'));
    app.use('/uploadFile', require('@/routes/uploadFile'));
    app.use('/memo', require('@/routes/memo'));
}