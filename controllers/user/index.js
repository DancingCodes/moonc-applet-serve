const userService = require('@/services/user')
const response = require('@/utils/response')

const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtKey = require('@/config/jwt')

async function login(req, res) {
    const appId = 'wx43d4a5ecfe40a76a'
    const appSecret = 'c3cfacc43c96c7058309463bddeae188'

    const { data } = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${req.body.code}&grant_type=authorization_code`);
    const { session_key, openid } = data;
    const token = jwt.sign({ session_key, openid }, jwtKey);

    const user = await userService.getUser(openid)

    if (!user) {
        await userService.createUser(openid)
    }

    res.send(response.success({
        token
    }));
}

async function info(req, res) {
    const user = await userService.getUser(req.auth.openid);
    res.send(response.success(user));
}

async function updata(req, res) {
    const { name, picture } = req.body
    await userService.updataUser(req.auth.openid, { name, picture });
    res.send(response.success());
}


module.exports = {
    login,
    info,
    updata
};
