const jwt = require('jsonwebtoken');

// Middleware authentication
const authenticateMiddleware = (req, res, next) => {
    // Lấy token từ header hoặc query parameter hoặc cookie
    const token = req.headers.authorization || req.query.token || req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Không có token xác thực' });
    }
    try {
      // Xác thực và giải mã token
      const decoded = jwt.verify(token, 'QLKH');
      // Lưu thông tin người dùng đã xác thực vào req
      req.user = decoded;
      // Tiếp tục thực hiện hành động tới server
      next();
    } catch (error) {
      res.clearCookie("jwt_token")
      return res.redirect("/");
    }
};

module.exports = authenticateMiddleware;