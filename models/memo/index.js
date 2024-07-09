const mongoose = require('mongoose');

const dayjs = require('dayjs');
const { v4 } = require('uuid')

const memoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
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

const Memo = mongoose.model('Memo', memoSchema);

module.exports = Memo