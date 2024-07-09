const express = require('express');
const router = express.Router();
const memoController = require('@/controllers/memo');

router.post('/create', memoController.create)

module.exports = router;