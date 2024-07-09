const express = require('express');
const router = express.Router();
const userController = require('@/controllers/user');

router.post('/login', userController.login);

router.get('/info', userController.info);

router.post('/updata', userController.updata);

module.exports = router;