const express = require('express');
const router = express.Router();
const memoController = require('@/controllers/memo');

router.post('/create', memoController.create)

router.post('/getList', memoController.getList)

module.exports = router;