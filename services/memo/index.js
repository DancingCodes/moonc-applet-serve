const Memo = require('@/models/memo')

const createMemoItem = async (userId, content) => await new Memo({ userId, content }).save()

module.exports = {
    createMemoItem
};