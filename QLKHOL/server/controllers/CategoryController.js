const Category = require("../models/Category.js");

class CategoryController {
  index(req, res) {
    Category.find()
      .then((categories) => {
        res.status(200).json({ success: true, data: categories });
      })
      .catch((error) => {
        res.json({ success: false, data: {}, message: "can't get category" });
      });
  }

  async detail(req, res) {
    try {
      const category = await Category.findById({ _id: req.params.id });
      if (!category) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(category);
    } catch (error) {
      res
        .status(404)
        .json({
          success: false,
          error: `Cannot get data product with error: ${error.message}`,
        });
    }
  }

  async create(req, res) {
    try {
      const categoryJson = req.body;
      const category = new Category(categoryJson);
      // save Category to database
      const savedCategory = await category.save();
      res.json(savedCategory);
    } catch (error) {
      console.error("Error creating category", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async delete(req, res) {
    try {
      const categoryId = req.params.id;
      Category.findOneAndDelete({ _id: categoryId })
        .then((deletedCategory) => {
          if (!deletedCategory) {
            return res.status(404).json({
              success: false,
              error: "Category not found",
              id: categoryId,
            });
          }
          res.json({ success: true, message: "Category deleted successfully" });
        })
        .catch((error) => {
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }

  async update(req, res) {
    const categoryId = req.params.id;
    const categoryData = req.body;

    if (Object.keys(categoryData).length === 0) {
      res.status(404).json({ success: false, error: "Data update is empty" });
    } else {
      Category.findByIdAndUpdate(categoryId, categoryData, { new: true })
        .then((updatedCategory) => {
          if (!updatedCategory) {
            res.status(404).json({ success: true, error: "Category not found" });
          }
          res.json({ success: true, message: "Category updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating Category", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    }
  }

  async search(req, res) {
    try {
      const option = req.params.option;
      const value = req.query.value; // Tham số truy vấn từ URL

      // Kiểm tra option có phải là "name" hoặc "teacher"
      if (option !== "name") {
        return res.status(400).json({ error: "Invalid option" });
      }

      // Kiểm tra value có tồn tại
      if (!value) {
        return res.status(400).json({ error: "Missing value" });
      }

      let query = {
        name: { $regex: value, $options: "i" },
      };
      

      // Tìm kiếm sản phẩm dựa trên query
      const categories = await Category.find(query)

      res.status(200).json({success: true, data: categories});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

module.exports = new CategoryController();
