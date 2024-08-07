const express = require('express');
const path = require('path');
const fs = require('fs');

const uploadImagePath = path.join(process.cwd(), 'src', 'public', 'upload', 'images');

const init = (app) => {
    fs.mkdirSync(uploadImagePath, { recursive: true });
    app.use('/uploadImage', express.static(uploadImagePath));
}

module.exports = {
    uploadImagePath,
    init
}