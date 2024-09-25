const express = require('express');
const router = express.Router();
const memoController = require('@/controllers/memo');

router.post('/createMemo', memoController.createMemo)

router.post('/getMemo', memoController.getMemo)

router.post('/getMemoList', memoController.getMemoList)

module.exports = router;