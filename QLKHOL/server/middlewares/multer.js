const multer =  require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        // fileSize: 10 * 1024 * 1024, // 2 MB
        files: 1,
    },
});

module.exports = upload;