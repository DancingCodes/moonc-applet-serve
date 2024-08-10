const Memo = require('@/models/memo')

const createMemoItem = async (userId, content) => await new Memo({ userId, content }).save()

const getMemoList = async (userId, pageNo, pageSize) => {
    const list = await Memo.find({ userId }).select('-_id -__v').skip((pageNo - 1) * pageSize).limit(pageSize);
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