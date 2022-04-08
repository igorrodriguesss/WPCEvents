
    module.exports.storage1 = function(req, res, next) {

        const multer = require('multer');

        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './public/img/ImgEventos/')
            },
            filename: function(req, file, cb) {
                let data = new Date().toISOString().replace(/:/g, '-') + '-';
                cb(null, data + file.originalname );
            }
        })
            const upload = multer({ storage: storage })
            next()
        }