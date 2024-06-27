const express = require('express');
const path = require('path');
const app = require('@/app')

app.use(express.static(path.join(process.cwd(), 'public')));

// 接口文档文件
app.use('/apiDoc', express.static(path.join(process.cwd(), 'config', 'apiDoc', 'view')));

// 开放用户上传的文件
app.use('/uploadImage', express.static(path.join(process.cwd(), 'public', 'upload', 'images')));