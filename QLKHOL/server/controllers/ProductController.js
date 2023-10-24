const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

class ProductController {
  index(req, res) {
    const category = req.query.category;
    const teacherId = req.query.teacherId;
    const userId = req.query.userId;

  
    if (category) {
      Category.findOne({ alias: category }).then((cate) => {
        if (cate) {
          Product.find({ categoryId: cate._id })
            .populate("categoryId")
            .populate("teacherId")
            .select("-lessions")
            .populate({path: 'students', model: 'User'})
            .then((products) => {
              res.json({ success: true, data: products });
            })
            .catch((error) => {
              res.status(400).json({ success: false, data: [] });
            });
        } else {
          res.status(400).json({ success: false, data: [] });
        }
      });
    } 
    else if (teacherId) {
      Product.find({ teacherId: teacherId })
      .populate("categoryId")
      .populate("teacherId")
      .populate({path: 'students', model: 'User'})
      .populate({path: 'lessions', model: 'Lession'})
      .then((products) => {
        res.json({ success: true, data: products });
      })
      .catch((error) => {
        res.status(400).json({ success: false, data: [] });
      });
    }
    else if (userId) {
      Product.find({ students: { $in: [userId] } })
      .populate("categoryId")
      .populate("teacherId")
      .populate({path: 'students', model: 'User'})
      .populate({path: 'lessions', model: 'Lession'})
      .then((products) => {
        res.json({ success: true, data: products });
      })
      .catch((error) => {
        res.status(400).json({ success: false, data: [] });
      });
    }
    else {
      Product.find({})
        .populate("categoryId")
        .populate("teacherId")
        .populate({path: 'students', model: 'User'})
        // .populate({path: 'lessions', model: 'Lession'})
        .then((products) => {
          res.json({ success: true, data: products });
        })
        .catch((error) => {
          res.json({ success: false, data: [] });
        });
    }
  }

  async create(req, res) {
    try {
      const productJson = req.body;
      const product = new Product(productJson);
      // save product to database
      const savedProduct = await product.save();
      res.json({ success: true, data: savedProduct });
    } catch (error) {
      console.error("Error creating product", error);
      res.status(500).json({ success: false, error: "An error occurred" });
    }
  }

  async detail(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(404).json({
        success: false,
        error: `Cannot get data product with error: ${error.message}`,
      });
    }
  }

  async update(req, res) {
    const productId = req.params.id;
    const productData = req.body;

    if (Object.keys(productData).length === 0) {
      res.status(404).json({ success: false, error: "Data update is empty" });
    } else {
      Product.findByIdAndUpdate(productId, productData, { new: true })
        .then((updatedProduct) => {
          if (!updatedProduct) {
            res.status(404).json({ success: true, error: "Product not found" });
          }
          res.json({ success: true, message: "Product updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating product", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    }
  }

  async delete(req, res) {
    try {
      const productId = req.params.id;
      Product.findOneAndDelete({ _id: productId })
        .then((deletedProduct) => {
          if (!deletedProduct) {
            return res.status(404).json({
              success: false,
              error: "Product not found",
              id: productId,
            });
          }
          res.json({ success: true, message: "Product deleted successfully" });
        })
        .catch((error) => {
          console.error("Error deleting product", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    } catch (error) {
      console.error("Error creating product", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async search(req, res) {
    try {
      const option = req.params.option;
      const value = req.query.value; // Tham số truy vấn từ URL

      // Kiểm tra option có phải là "name" hoặc "teacher"
      if (option !== "name" && option !== "teacher") {
        return res.status(400).json({ error: "Invalid option" });
      }

      // Kiểm tra value có tồn tại
      if (!value) {
        return res.status(400).json({ error: "Missing value" });
      }

      let query = {};
      if (option === "name") {
        query = {
          name: { $regex: value, $options: "i" },
        };
      } else if (option === "teacher") {
        // Tìm kiếm giáo viên dựa trên tên
        const teachers = await User.find({
          fullName: { $regex: value, $options: "i" },
        });

        const teacherIds = teachers.map((teacher) => teacher._id);

        query = {
          teacherId: { $in: teacherIds },
        };
      }

      // Tìm kiếm sản phẩm dựa trên query
      const products = await Product.find(query)
        .populate("teacherId")
        .populate("categoryId");

      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }

  async buy(req, res) {
    try {
      const productId = req.params.id;
      const userId = req.body.id;
      if (userId) {
        Product.findOneAndUpdate(
          { _id: productId },
          { $push: { students: userId } },
          { new: true }
        )
          .then((updatedProduct) => {
            if (!updatedProduct) {
              return res.status(404).json({
                success: false,
                error: "Product not found",
                id: productId,
              });
            }

            res.json({
              success: true,
              data: updatedProduct,
              message: "Buy success",
            });
          })
          .catch((error) => {
            console.error("Error deleting product", error);
            res
              .status(500)
              .json({ success: false, error: "An error occurred" });
          });
      }
    } catch (error) {
      console.error("Error creating product", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = new ProductController();
