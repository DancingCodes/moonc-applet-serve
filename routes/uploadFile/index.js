const express = require('express');
const router = express.Router();
const uploadFileController = require('@/controllers/uploadFile');

router.post('/image', uploadFileController.image)

module.exports = router;