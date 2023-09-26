// routes/todo.js
const express = require('express');
const router = express.Router();

// Kết nối đến cơ sở dữ liệu MySQL
const db = require('../database/connect');
const checkPermission = require('../routes/permission')
const {ListTodo, GetTodoByFilter, AddTodo, UpdateTodo, DeleteTodo} = require("../service/todo");

router.get('/', (req, res) => {
  const searchText = req.query.search;
  const sortField = req.query.sort;
  const timeRangeFrom = req.query.timeRangeFrom;
  const timeRangeTo = req.query.timeRangeTo;
  ListTodo(searchText,sortField,timeRangeFrom,timeRangeTo,res)
});

router.get('/:id',checkPermission('GET'), (req, res) => {
  const todoId = req.params.id; // Thay đổi từ id thành todoId
  if (todoId === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  GetTodoByFilter(todoId, res)
});



// Thêm một công việc mới
router.post('/',checkPermission('POST'), (req, res) => {
  const { title, description, due_date, is_completed } = req.body;
  AddTodo(title, description, due_date, is_completed )
});

// Cập nhật thông tin công việc
router.put('/:id',checkPermission('PUT'), (req, res) => {
  const id = req.params.id;
  if (id === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  const { title, description, due_date, is_completed } = req.body;
  UpdateTodo(title,description,due_date,is_completed,id)
});

// Xóa một công việc
router.delete('/:id',checkPermission('DELETE'), (req, res) => {
  const todoId = req.params.id;
  if (todoId === null) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  DeleteTodo(todoId,res)
});

module.exports = router;
