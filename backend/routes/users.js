const express = require('express');
const router = express.Router();
const generateRandomPassword = require('../helper/password')
const db = require('../database/connect');

router.get('/', (req, res) => {
    const searchText = req.query.search;
    const sortField = req.query.sort;
    const timeRangeFrom = req.query.timeRangeFrom;
    const timeRangeTo = req.query.timeRangeTo;
    let sql = 'SELECT * FROM users WHERE 1';
    sql += timeRangeFrom ? ` AND date_of_birth >= '${timeRangeFrom}'` : '';
    sql += timeRangeTo ? ` AND date_of_birth <= '${timeRangeTo}'` : '';
    sql += searchText ? ` AND CONCAT(firstname, ' ', lastname) LIKE '%${searchText}%'` : '';
    if (sortField) {
        sql += ` ORDER BY ${sortField}`;
    }
    console.log(sql)
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


router.get('/:id', (req, res) => {
    const userID = req.params.id; // Thay đổi từ id thành todoId
    if (userID === null) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    db.query('SELECT * FROM users WHERE id = ?', [userID], (err, results) => {
        if (err) {
            console.error('Error fetching todo:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                // Kiểm tra nếu không có công việc nào được tìm thấy với id cung cấp
                res.status(404).json({ error: 'Todo not found' });
            } else {
                const user = results[0]; // Lấy công việc đầu tiên từ kết quả

                res.json(user);
            }
        }
    });
});

router.post('/', (req, res) => {
    const { username, firstname,lastname, email, date_of_birth } = req.body;
    const password = generateRandomPassword(8);
    db.query(
        'INSERT INTO users (username, firstname, lastname, email, password, date_of_birth, is_active) VALUES (? , ? , ? , ? , ? , ? , ?)',
        [username, firstname,lastname, email, password,date_of_birth,1],
        (err, result) => {
            if (err) {
                console.error('Error creating todo:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Todo created successfully' });
            }
        }
    );
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    if (id === null) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    const { firstname, lastname, email, date_of_birth,is_active } = req.body;
    db.query(
      'UPDATE users SET firstname = ?, lastname = ?, email = ?, date_of_birth = ?,is_active = ? WHERE id = ?',
      [firstname, lastname, email, date_of_birth, is_active,id],
      (err, result) => {
        if (err) {
          console.error('Error updating todo:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'Todo updated successfully' });
        }
      }
    );
  });

module.exports = router;