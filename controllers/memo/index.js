const memoService = require('@/services/memo')
const response = require('@/utils/response')

async function create(req, res) {
    await memoService.createMemoItem(req.auth.openid, req.body.content)
    res.send(response.success());
}

module.exports = {
    create,
};
