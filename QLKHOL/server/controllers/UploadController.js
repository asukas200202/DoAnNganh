const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

class UploadController {
  async upload(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file.buffer;
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          // Xử lý lỗi
          console.error("Lỗi tải lên hình ảnh:", error);
          res
            .status(500)
            .json({ success: false, error: "Lỗi tải lên hình ảnh" });
        } else {
          // Trả về URL hình ảnh đã tải lên từ Cloudinary
          res.json({ success: true, url: result.secure_url });
        }
      })
      .end(file);
  }

  async uploadVideo(req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }




    const file = req.file.buffer;
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          // Xử lý lỗi
          console.error("Lỗi tải lên hình ảnh:", error);
          res
            .status(500)
            .json({ success: false, error: "Lỗi tải lên hình ảnh" });
        } else {
          // Trả về URL hình ảnh đã tải lên từ Cloudinary
          res.json({ success: true, url: result.secure_url });
        }
      })
      .end(file);
  }

  async delete(req, res) {
    const imageId = req.params.id;

    if (imageId) {
      cloudinary.uploader.destroy(imageId, (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        res
          .status(200)
          .json({ success: true, message: "Image deleted successfully" });
      });
    }
  }
}

module.exports = new UploadController();
