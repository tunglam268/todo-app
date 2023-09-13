// routes/todo.js
const express = require('express');
const router = express.Router();

// Kết nối đến cơ sở dữ liệu MySQL
const db = require('../database/connect');
const checkPermission = require('../routes/permission')

router.get('/', (req, res) => {
  const searchText = req.query.search;
  const sortField = req.query.sort;
  const timeRangeFrom = req.query.timeRangeFrom;
  const timeRangeTo = req.query.timeRangeTo;
  let sql = 'SELECT * FROM todos WHERE 1';
  sql += timeRangeFrom ? ` AND due_date >= '${timeRangeFrom}'` : '';
  sql += timeRangeTo ? ` AND due_date <= '${timeRangeTo}'` : '';
  sql += searchText ? ` AND (title LIKE '%${searchText}%' OR description LIKE '%${searchText}%')` : '';

  if (sortField) {
    sql += ` ORDER BY ${sortField}`;
  }
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id',checkPermission('GET'), (req, res) => {
  const todoId = req.params.id; // Thay đổi từ id thành todoId
  if (todoId === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  db.query('SELECT * FROM todos WHERE id = ?', [todoId], (err, results) => {
    if (err) {
      console.error('Error fetching todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        // Kiểm tra nếu không có công việc nào được tìm thấy với id cung cấp
        res.status(404).json({ error: 'Todo not found' });
      } else {
        const todo = results[0]; // Lấy công việc đầu tiên từ kết quả

        res.json(todo);
      }
    }
  });
});



// Thêm một công việc mới
router.post('/',checkPermission('POST'), (req, res) => {
  const { title, description, due_date, is_completed } = req.body;
  db.query(
    'INSERT INTO todos (title, description, due_date, is_completed) VALUES (?, ?, ?, ?)',
    [title, description, due_date, is_completed],
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

// Cập nhật thông tin công việc
router.put('/:id',checkPermission('PUT'), (req, res) => {
  const id = req.params.id;
  if (id === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  const { title, description, due_date, is_completed } = req.body;
  db.query(
    'UPDATE todos SET title = ?, description = ?, due_date = ?, is_completed = ? WHERE id = ?',
    [title, description, due_date, is_completed, id],
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

// Xóa một công việc
router.delete('/:id',checkPermission('DELETE'), (req, res) => {
  const todoId = req.params.id;
  if (todoId === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  db.query('DELETE FROM todos WHERE id = ?', [todoId], (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Todo deleted successfully' });
    }
  });
});

module.exports = router;
