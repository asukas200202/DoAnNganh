const User = require("../models/User");

class UserController {
  async index(req, res) {
    const { role } = req.query
    users = await User.find({}).select("-password");
    if(!role) {
      try {
        var users = [];
        if(req.role === "user") {
          users = await User.find({}).select("-password");
        }
        else {
          users = await User.find({});
        }

        res.json({ success: true, data: users });
      } catch (error) {
        res.status(500).json({ success: false, data: [], error: error.message });
      }
    }
    else {
      var users = [];
      try {
        if(req.role === "user") {
          users = await User.find({}).select("-password");
        }
        else {
          if(role === "teacher") {
            users = await User.find({role: "teacher"});
          }
          else {
            users = await User.find({});
          }
        }

        res.json({ success: true, data: users });

      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  async create(req, res) {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async detail(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res
        .status(404)
        .json({ success: false, error: `Cannot get data user with ${error}` });
    }
  }

  update(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    if (Object.keys(userData).length === 0) {
      res.status(404).json({ success: false, error: "Data update is empty" });
    } else {
      User.findByIdAndUpdate(userId, userData, { new: true })
        .then((updatedUser) => {
          if (!updatedUser) {
            res.status(404).json({ success: true, error: "User not found" });
          }
          res.json({ success: true, message: "User updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating User", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });
    }
  }

  async delete(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId)
      User.findOneAndDelete({ _id: userId })
        .then((deletedUser) => {
          if (!deletedUser) {
            return res.status(404).json({
              success: false,
              error: "user not found",
              id: userId,
            });
          }
          res.json({ success: true, message: "User deleted successfully" });
        })
        .catch((error) => {
          console.error("Error deleting user", error);
          res.status(500).json({ success: false, error: "An error occurred" });
        });

    } catch (error) {
      console.error("Error creating user", error);
      res.status(500).json({ error: "An error occurred" });
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
        fullName: { $regex: value, $options: "i" },
      };
      // Tìm kiếm nguoi dung dựa trên query
      const users = await User.find(query)
      res.status(200).json({success: true, data: users});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
}

module.exports = new UserController();
