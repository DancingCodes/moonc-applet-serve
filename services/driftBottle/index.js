const DriftBottle = require('@/models/driftBottle')
const userService = require('@/services/user')


const createDriftBottle = async (msg, userId) => await new DriftBottle({
    messageList: [{
        msg: msg,
        msgAuthorId: userId,
        msgAuthorName: ''
    }],
    authorId: userId,
}).save()

const getDriftBottle = async (id) => DriftBottle.findOne({ id }).select('-_id -__v')

const getRandomDriftBottle = async () => {
    const count = await DriftBottle.countDocuments();

    if (count === 0) {
        return null
    }

    const random = Math.floor(Math.random() * count);
    const driftBottle = await DriftBottle.findOne().skip(random).select('-_id -__v')

    // 设置作者信息
    const { name } = await userService.getUser(driftBottle.authorId);
    driftBottle.authorName = name

    for (let item of driftBottle.messageList) {
        const { name } = await userService.getUser(item.msgAuthorId);
        item.msgAuthorName = name
    }
    return driftBottle
}

const updataDriftBottle = async (msg, driftBottleId, userId) => {
    const driftBottle = await getDriftBottle(driftBottleId)

    const messageList = [...driftBottle.messageList, {
        msg: msg,
        msgAuthorId: userId,
        msgAuthorName: ''
    }]

    return await DriftBottle.findOneAndUpdate({ id: driftBottleId }, { $set: { messageList } })
}

module.exports = {
    createDriftBottle,
    getDriftBottle,
    getRandomDriftBottle,
    updataDriftBottle
};
