const express = require("express");
const router = express.Router();
const UploadController = require("../controllers/UploadController.js");
const cloudinary = require('cloudinary').v2;
const uploadMiddleWare = require("../middlewares/multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "video", // Thư mục lưu trữ trên Cloudinary (tùy chọn)
    resource_type: "video", // Loại tài nguyên (video)
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  uploadMiddleWare.single("file"),
  UploadController.upload
);

router.post(
  "/upload/video",
  uploadMiddleWare.single("file"),
  UploadController.uploadVideo
);

router.use("/delete/:id", UploadController.delete);

module.exports = router;
