const mysql = require('mysql2');

// Tạo kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123456',
    database: 'test',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

module.exports = db;