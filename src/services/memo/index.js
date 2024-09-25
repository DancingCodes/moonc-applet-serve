const Memo = require('@/models/memo')

const createMemo = async (userId, content, reminderTime) => await new Memo({ userId, content, reminderTime }).save()

const getMemo = async (id) => await Memo.findOne({ id }).select('-_id -__v')

const getMemoList = async (userId, pageNo, pageSize) => {
    const list = await Memo.find({ userId }).select('-_id -__v').skip((pageNo - 1) * pageSize).limit(pageSize);
    const total = await Memo.find({ userId }).countDocuments();
    return {
        list,
        total
    }
}

module.exports = {
    createMemo,
    getMemo,
    getMemoList
};