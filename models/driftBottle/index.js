const mongoose = require('mongoose');
const dayjs = require('dayjs');
const { v4 } = require('uuid')

const driftBottleSchema = new mongoose.Schema({
    messageList: {
        type: Array,
        default: []
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    id: {
        type: String,
        default: () => v4()
    },
})

const DriftBottle = mongoose.model('DriftBottle', driftBottleSchema);

module.exports = DriftBottle