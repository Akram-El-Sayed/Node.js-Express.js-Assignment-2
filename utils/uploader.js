const multer = require('multer');

const storage = multer.diskStorage({
    destination:(request, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(request, file , cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const filterd = (request, file, cb)=>{
    if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
}

const uploader = multer({storage});

module.exports = {uploader}