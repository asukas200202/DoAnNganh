const Order = require("../models/order.js");
const shortid = require("shortid");

class OrderController {
  index(req, res) {
    Order.find()
      .populate({
        path: "products",
        populate: {
          path: "teacherId",
          model: "User",
          select: "-password",
        },
      })
      .populate("userId", "-password")
      .then((orders) => {
        res.status(200).json({ success: true, data: orders });
      })
      .catch((error) => {
        res.json({ success: false, data: {}, message: "can't get category" });
      });
  }

  async detail(req, res) {}

  async create(req, res) {
    try {
      const orderJson = req.body;
      const order = new Order(orderJson);
      order.code = "EDU" + shortid.generate().substring(0, 4);
      // save product to database
      const savedOrder = await order.save();
      res.json({ success: true, data: savedOrder });
    } catch (error) {
      console.error("Error creating order", error);
      res.status(500).json({ success: false, error: "An error occurred" });
    }
  }

  async delete(req, res) {
    try {
      const orderId = req.params.id;
      Order.findOneAndDelete({ _id: orderId })
        .then((orderDeleted) => {
          if (!orderDeleted) {
            return res.status(404).json({
              success: false,
              error: "Product not found",
              id: productId,
            });
          }
          res.json({ success: true, message: "Order deleted successfully" });
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

  async update(req, res) {
    const orderId = req.params.id;
    const orderData = req.body;

    if (Object.keys(orderData).length === 0) {
      res.status(404).json({ success: false, error: "Data update is empty" });
    } else {
      Order.findByIdAndUpdate(orderId, orderData, { new: true })
        .then((updatedOrder) => {
          if (!updatedOrder) {
            res.status(404).json({ success: true, error: "order not found" });
          }
          res.json({ success: true, message: "order updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating order", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    }
  }

  async search(req, res) {
    try {
      const option = req.params.option;
      const value = req.query.value; // Tham số truy vấn từ URL

      // Kiểm tra option có phải là "name" hoặc "teacher"
      if (option !== "code" && option !== "status") {
        return res.status(400).json({ error: "Invalid option" });
      }

      // Kiểm tra value có tồn tại
      if (!value) {
        return res.status(400).json({ error: "Missing value" });
      }

      let query = {};
      if (option === "code") {
        query = {
          code: { $regex: value, $options: "i" },
        };
      } else if (option === "status") {
        if (value === "all") query = {};
        else
          query = {
            status: { $regex: value, $options: "i" },
          };
      }

      // Tìm kiếm sản phẩm dựa trên query
      const orders = await Order.find(query)
        .populate({
          path: "products",
          populate: {
            path: "teacherId",
            model: "User",
            select: "-password",
          },
        })
        .populate("userId", "-password");

      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

module.exports = new OrderController();
