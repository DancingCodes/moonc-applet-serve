const mongoose = require('mongoose');

const { v4 } = require('uuid')
const dayjs = require('dayjs');

const uploadFileSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => v4()
    },
    fileName: {
        type: String,
        required: true
    },
    createTime: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
})

const UploadFile = mongoose.model('UploadFile', uploadFileSchema);

module.exports = UploadFile