const fs = require('fs');
const path = require('path');
const network = require('@/config/serve')

const apiDoc = {
    title: '小程序接口文档',
    description: 'Moonc Applet Service Docs',
    serve: `${network.host}:${network.port}`,
    version: '1.0.0',
    routeList: [],
}

// 根据Routes生成apiDoc结构
function setDocForRoutes(filePath, { fileName, desc }) {
    const data = fs.readFileSync(filePath, 'utf8');
    // 查询express.Router()的对象名称
    const exressRouterName = data.match(/(\w+)\s*=\s*express\.Router\(\)\s*;/)[1]
    data.split('\n').forEach(item => {
        if (item.includes(`${exressRouterName}.`)) {
            // 找router.后边的 type 和 url
            /router\.(\w+)\('([^']+)'\s*,/
            const [, type, url] = item.match(new RegExp(`${exressRouterName}\\.(\\w+)\\('([^']+)'\\s*,`))

            const currentApi = apiDoc.routeList.find(item => item.route === fileName)
            if (!currentApi) {
                apiDoc.routeList.push({
                    route: fileName,
                    desc: desc,
                    apiList: [{
                        type,
                        url: `/${fileName}${url}`
                    }]
                })
            } else {
                currentApi.apiList = [...currentApi.apiList, { type, url: `/${fileName}${url}` }]
            }
        }
    })
    setDocForControllers(fileName)
}

// 根据Controllers生成apiDoc细节
function setDocForControllers(fileName) {
    const filePath = path.join(process.cwd(), 'controllers', fileName, 'index.js')
    const data = fs.readFileSync(filePath, 'utf8');

    // 拿到所有注释
    const matches = data.match(/\/\*\*([\s\S]*?)\*\//g) ?? [];
    // 过滤出包含@Api的注释
    const apiList = matches.filter(item => item.includes('@Api'))

    if (!apiList.length) {
        return
    }
    apiList.forEach(item => {
        const apiName = item.match(/@Api\(([^)]+)\)/)[1]
        const apiDesc = item.match(/@ApiDesc\(([^)]+)\)/)[1]
        const request = item.match(/@Request\(([^)]+)\)/) ? item.match(/@Request\(([^)]+)\)/)[1] : null
        const responses = item.match(/@Responses\(([^)]+)\)/) ? item.match(/@Responses\(([^)]+)\)/)[1] : null

        const currentApi = apiDoc.routeList.find(item => item.route === fileName).apiList.find(item => item.url === `/${fileName}/${apiName}`)

        currentApi.desc = apiDesc

        // 请求参数
        currentApi.request = []
        request?.split(',').forEach(itemC => {
            let [key, type] = itemC.replace(/\s/g, '').split(':')
            let required = key.includes('*')
            key = key.replace(/\*/g, '')
            currentApi.request = [...currentApi.request, { key, type, required }]
        })

        // 响应参数
        currentApi.responses = []
        responses?.split(',').forEach(itemC => {
            let [key, type] = itemC.replace(/\s/g, '').split(':')
            key = key.replace(/\*/g, '')
            currentApi.responses = [...currentApi.responses, { key, type }]
        })

    })

}


function setApiRoute(app) {
    // 文档数据
    app.get('/apiDoc/getData', (req, res) => {
        res.send(apiDoc)
    })
}


module.exports = {
    setDocForRoutes,
    setApiRoute
};
