const mongoose = require('mongoose');

const dayjs = require('dayjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '体验用户'
    },
    picture: {
        type: String,
        default: 'https://obs-sdjn.cucloud.cn/village/vil/2023/04/27/1498185a-3784-4e01-93c7-3acbe1fd2198.jpg'
    },
    createTime: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    id: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User