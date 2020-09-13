import multer from 'multer';



export const upload = multer({
    limits: { fieldSize: 1000000 },
    fileFilter(_req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(null, true)
    }
})
