const db = require("../database/connect");

function ListTodo(searchText,sortField,timeRangeFrom,timeRangeTo ,res) {
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
}

function GetTodoByFilter(id , res ) {
    db.query('SELECT * FROM todos WHERE id = ?', [id], (err, results) => {
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
}

function AddTodo(title, description, due_date, is_completed ) {
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
}

function UpdateTodo(title, description, due_date, is_completed, id ,res) {
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
}

function DeleteTodo(id,res) {
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Todo deleted successfully' });
        }
    });
}

module.exports = {
    ListTodo,
    GetTodoByFilter,
    AddTodo ,
    UpdateTodo,
    DeleteTodo
}