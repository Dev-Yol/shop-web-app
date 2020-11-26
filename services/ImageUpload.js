const multer = require('multer');
const mkdirp = require('mkdirp')
mkdirp.sync('public/uploads')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        var filename = `uploads_${Math.round(+new Date() / 1000)}_${file.originalname}`
        cb(null, filename)
    }
})

module.exports = multer({
    storage: storage,
    limits: { fileSize: 1000000000 }
})
