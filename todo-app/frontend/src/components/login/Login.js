import React, { useState } from 'react';
import { Navigate } from 'react-router';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Thực hiện xác thực ở đây bằng API
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        setToken(data.token)
        alert('Login successful');
      } else {
        alert('Login failed. Please check your username and password.');
      }
  };
  // Nếu có token, hiển thị nội dung đã xác thực
  if (token) {
 
    return (
      <Navigate to="/Todo" />
    );
  }

  // Nếu chưa có token, hiển thị form đăng nhập
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
