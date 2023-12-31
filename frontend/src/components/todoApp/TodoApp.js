import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { Button, TextField, Typography } from '@mui/material';
import { Search, Settings } from '@mui/icons-material';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState(''); // Trạng thái để lưu giá trị tìm kiếm
  const [rankSortOrder, setRankSortOrder] = useState('asc'); // Mặc định sắp xếp tăng dần
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();
  const handleDateRangeChange = ({ startDate, endDate }) => {
    // Gọi fetchTodos với giá trị dateRange mới
    fetchTodos(rankSortOrder, { startDate, endDate });
  };

  // Hàm lấy danh sách công việc từ API dựa trên giá trị tìm kiếm và trạng thái sắp xếp
  const fetchTodos = (sort, dateRange) => {
    let apiUrl = 'http://localhost:8080/todos';
    const queryParams = [];
    if (searchText) {
      queryParams.push(`search=${searchText}`);
    }
    if (sort) {
      queryParams.push(`sort=id ${sort}`);
      setRankSortOrder(sort)
    }
    if (dateRange) {
      if (dateRange.startDate && dateRange.endDate) {
        queryParams.push(`timeRangeFrom=${dateRange.startDate}&&timeRangeTo=${dateRange.endDate}`);
      } else if (dateRange.startDate) {
        queryParams.push(`timeRangeFrom=${dateRange.startDate}`);
      }
      else if (dateRange.endDate) {
        queryParams.push(`timeRangeTo=${dateRange.endDate}`);
      }
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join('&')}`;
    }
    fetch(apiUrl, {
      method: 'GET',
      headers: {

        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Access denied') {
          navigate('/404'); // Điều hướng tới trang 404 nếu danh sách todos là null
        } else {
          setTodos(data);
        }
      })
      .catch((error) => console.error('Error fetching todos:', error));
  };


  // Gọi hàm fetchTodos khi searchText hoặc rankSortOrder thay đổi
  useEffect(() => {
    fetchTodos();
  }, [searchText]);



  // Hàm thêm công việc mới và cập nhật danh sách công việc
  const handleAddTodo = (title, description, dueDate, isCompleted) => {
    if (title && description && dueDate) {
      if (dueDate !== null) {
        dueDate = moment.utc(dueDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
      }
      fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, due_date: dueDate, is_completed: isCompleted }),
      })
        .then((response) => {
          if (response.status === 403) {
            alert(`No Permission`);
          }
          if (response.status === 201) {
            fetchTodos(); // Cập nhật danh sách sau khi thêm công việc
          }
        })
        .catch((error) => console.error('Error adding todo:', error));
    } else {
      alert(' Fill all field');
    }
  };

  const handleDeleteTodo = (data) => {
    fetch(`http://localhost:8080/todos/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 403) {
          alert(`No Permission`);
        }
        if (response.status === 200) {
          fetchTodos(); // Cập nhật danh sách sau khi thêm công việc
        }
      })
      .catch((error) => console.error('Error adding todo:', error));
  };

  const handleEditTodo = (data) => {
    let { title, description, due_date, is_completed } = data
    if (due_date !== null) {
      due_date = moment.utc(due_date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')
    }
    fetch(`http://localhost:8080/todos/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, due_date, is_completed }),
    })
      .then((response) => {
        if (response.status === 403) {
          alert(`No Permission`);
        }
        if (response.status === 200) {
          fetchTodos(); // Cập nhật danh sách sau khi thêm công việc
        }
      })
      .catch((error) => console.error('Error adding todo:', error));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/Login');
  };

  const handleSettings = () => {
    navigate('/Admin');
  };

  return (
    <div>
      <Typography variant="h4">ToDo App</Typography>
      <TextField
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSettings}
        style={{ marginRight: '10px' }} // Thêm khoảng cách bằng CSS
      >

        <Settings /> {/* Sử dụng icon "cogs" */}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        style={{ marginRight: '10px' }} // Thêm khoảng cách bằng CSS
      >
        Log Out
      </Button>
      <AddTodo onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onSort={fetchTodos}
        rankSortOrder={rankSortOrder}
        onDateRangeChange={handleDateRangeChange}
      />
    </div>

  );
}

export default TodoApp;
