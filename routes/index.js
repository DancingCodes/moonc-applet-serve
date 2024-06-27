const app = require('@/app');

// 开启Jwt
require('@/config/jwt')

// 格式化body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// 初始化ApiDoc
const { setApiRoute, setDocForRoutes } = require('@/config/apiDoc')

// 动态引入路由文件
const path = require('path');

const routes = [{
    fileName: 'user',
    desc: '用户'
}, {
    fileName: 'driftBottle',
    desc: '漂流瓶'
}, {
    fileName: 'uploadFile',
    desc: '文件'
}]

routes.forEach(route => {
    const filePath = path.join(__dirname, route.fileName, 'index.js')
    app.use(`/${route.fileName}`, require(filePath));
    setDocForRoutes(filePath, route)
});

// apiDoc
setApiRoute(app)