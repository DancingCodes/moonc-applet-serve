const express = require('express');
const router = express.Router();
const driftBottleController = require('@/controllers/driftBottle');

router.post('/createDriftBottle', driftBottleController.createDriftBottle)

router.get('/getRandomDriftBottle', driftBottleController.getRandomDriftBottle)

router.post('/updataDriftBottle', driftBottleController.updataDriftBottle)

module.exports = router;