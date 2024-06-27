const driftBottleService = require('@/services/driftBottle')
const response = require('@/utils/response')


async function createDriftBottle(req, res) {
    await driftBottleService.createDriftBottle(req.body.msg, req.auth.openid);
    res.send(response.success(true));
}

async function getRandomDriftBottle(req, res) {
    const driftBottle = await driftBottleService.getRandomDriftBottle();
    res.send(response.success(driftBottle));
}

async function updataDriftBottle(req, res) {
    await driftBottleService.updataDriftBottle(req.body.msg, req.body.id, req.auth.openid);
    res.send(response.success(true));
}

module.exports = {
    createDriftBottle,
    getRandomDriftBottle,
    updataDriftBottle
};
