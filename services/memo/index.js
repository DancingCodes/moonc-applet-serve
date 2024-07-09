const Memo = require('@/models/memo')

const createMemoItem = async (userId, content) => await new Memo({ userId, content }).save()

const getMemoList = async (userId, page, limit) => {
    const list = await Memo.find({ userId }).select('-_id -__v').skip((page - 1) * limit).limit(limit);
    const total = await Memo.find({ userId }).countDocuments();
    return {
        list,
        total
    }
}

module.exports = {
    createMemoItem,
    getMemoList
};