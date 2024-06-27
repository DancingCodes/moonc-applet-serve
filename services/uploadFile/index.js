const uploadFile = require('@/models/uploadFile')

const createFile = async (fileName) => await new uploadFile({ fileName }).save()

module.exports = {
    createFile
};