const app = require('@/app')
const network = require('@/config/serve')

app.get('/apiDoc/getData', (req, res) => {
    res.send(apiDoc)
})

const apiDoc = {
    title: '小程序接口文档',
    description: 'Moonc Applet Service Docs',
    serve: `${network.host}:${network.port}`,
    version: '1.0.0',
    routeList: [],
}
