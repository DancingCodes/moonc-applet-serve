const memoService = require('@/services/memo')
const response = require('@/utils/response')

async function create(req, res) {
    await memoService.createMemoItem(req.auth.openid, req.body.content)
    res.send(response.success());
}

async function getList(req, res) {
    const { pageNo, pageSize } = req.body
    res.send(response.success(await memoService.getMemoList(req.auth.openid, pageNo, pageSize)));
}

module.exports = {
    create,
    getList
};
