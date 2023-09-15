import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from './components/todoApp/TodoApp';
import Login from './components/login/Login';
import NotFound from './components/notFound/NotFound';
import Admin from './components/admin/Admin';

function checkLoggedIn() {
  // Kiểm tra xem token có trong session không
  const token = sessionStorage.getItem('token'); // Lấy token từ session storage
  if (token) {
    return <Navigate to="/Todo" />;
  }

  return <Navigate to="/Login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={checkLoggedIn()} /> 
        <Route path="/Todo" element={<TodoApp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="/Admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;
