const uploadFileService = require('@/services/uploadFile')
const response = require('@/utils/response')
const { v4 } = require('uuid');
const multer = require("multer");
const { network } = require('@/config/serve')
const { uploadImagePath } = require('@/config/staticRoute')

async function image(req, res) {
    const uploadImage = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadImagePath);
            },
            filename: async (req, file, cb) => {
                const suffix = file.originalname.substring(file.originalname.lastIndexOf("."));
                const fileName = `${v4()}${suffix}`
                req.fileName = fileName;
                cb(null, fileName);
            }
        }),
        fileFilter: (req, file, cb) => {
            console.log(file.mimetype);
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(true, false);
            }
        }
    }).single('file');

    uploadImage(req, res, async (err) => {
        if (err) {
            res.send(response.error('仅支持图片格式'));
            return
        }
        await uploadFileService.createFile(req.fileName)
        res.send(response.success({
            imageUrl: `${network}/uploadImage/${req.fileName}`
        }));
    });
}

module.exports = {
    image,
};
