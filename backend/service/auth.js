const db = require("../database/connect");
const jwt = require("jsonwebtoken");

function Login(username,password,res) {
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results[0].is_active === 0) {
                res.status(403); // Unauthorized
            }
            if (results.length === 1) {
                // Nếu tìm thấy một bản ghi trùng khớp, đăng nhập thành công
                const user = { id: results[0].id, username: results[0].username };
                const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401); // Unauthorized
            }
        }
    });
}

module.exports = {
    Login
}