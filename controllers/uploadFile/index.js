const uploadFileService = require('@/services/uploadFile')
const response = require('@/utils/response')
const path = require('path');
const { v4 } = require('uuid');
const multer = require("multer");
const network = require('@/config/serve')
const uploadImageFilePath = require('@/config/staticFileRouter')

/**
 * @Api(image)
 * @ApiDesc(上传文件)
 * @Request(*File: File)
 * @Responses(token: String)
 */
async function image(req, res) {
    const uploadImage = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadImageFilePath);
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
            imageUrl: `${network.host}:${network.port}/uploadImage/${req.fileName}`
        }));
    });
}

module.exports = {
    image,
};
