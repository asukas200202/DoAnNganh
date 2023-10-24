const jwt = require("jsonwebtoken");

class PermissionMiddleware {
  accessPermissionRole(roleAccessList) {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1]; // Lấy phần token sau từ "Bearer"
      // Kiểm tra token
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Không có token xác thực" });
      }
      // Xác thực quyền truy cập tài nguyên
      try {
        jwt.verify(token, "QLKH", (err, userDecoded) => {
          if (err) {
            // JWT không hợp lệ
            return res
              .status(401)
              .json({ status: false, message: "Invalid token" });
          }

          // Kiểm tra vai trò của người dùng từ thông tin trong JWT
          if (roleAccessList.indexOf(userDecoded.role) !== -1) {
            req.role = userDecoded.role;
            next();
          } else {
            res.status(403).json({
              status: false,
              message: "Bạn không có quyền truy cập vào tài nguyên này !!",
            });
          }
        });
      } catch (error) {
        console.log(error);
        res.clearCookie("jwt_token");
        return res.redirect("/");
      }
    };
  }
}

module.exports = new PermissionMiddleware();
