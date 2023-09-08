const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../database/connect');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Thực hiện truy vấn SQL để kiểm tra tên người dùng và mật khẩu trong cơ sở dữ liệu
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 1) {
                // Nếu tìm thấy một bản ghi trùng khớp, đăng nhập thành công
                const user = { username };
                const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.sendStatus(401); // Unauthorized
            }
        }
    });
});

module.exports = router;