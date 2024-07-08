const express = require('express');
const path = require('path');
const fs = require('fs');
const app = require('@/app')

// 接口文档文件
app.use('/apiDoc', express.static(path.join(process.cwd(), 'config', 'apiDoc', 'view')));


// 开放用户上传的文件
const uploadImageFilePath = path.join(process.cwd(), 'public', 'upload', 'images');
fs.mkdirSync(uploadImageFilePath, { recursive: true });
app.use('/uploadImage', express.static(uploadImageFilePath));