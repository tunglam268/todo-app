const mysql = require('mysql2');

// Tạo kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
