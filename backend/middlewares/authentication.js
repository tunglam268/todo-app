const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401); // Unauthorized nếu không có token
  }

  jwt.verify(token.substring(7), 'your-secret-key', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden nếu token không hợp lệ
    }
    req.user = user; // Lưu thông tin người dùng vào request để sử dụng ở các API tiếp theo
    next();
  });
}

module.exports = authenticateToken;
