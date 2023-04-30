const path = require("path");
const multer  = require('multer');

const tempDir = path.join(__dirname, "..", "temp")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir)
    },
    filename: function (req, file, cb) {
     cb(null, file.originalname)
    }
  })

const upload = multer({
    storage
})

module.exports = upload;



