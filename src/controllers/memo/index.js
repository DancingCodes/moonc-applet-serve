const memoService = require('@/services/memo')
const response = require('@/utils/response')

async function createMemo(req, res) {
    const { content, reminderTime } = req.body
    await memoService.createMemo(req.auth.openid, content, reminderTime)
    res.send(response.success());
}

async function getMemo(req, res) {
    const { id } = req.body
    const memo = await memoService.getMemo(id);
    res.send(response.success(memo));
}

async function getMemoList(req, res) {
    const { pageNo, pageSize } = req.body
    res.send(response.success(await memoService.getMemoList(req.auth.openid, pageNo, pageSize)));
}

module.exports = {
    createMemo,
    getMemo,
    getMemoList
};
