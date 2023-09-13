import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Căn giữa theo chiều dọc
  marginTop: theme.spacing(4),
  width: '500px', // Đặt chiều rộng thành 500px
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
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
      setToken(data.token);
      alert('Login successful');
    } else {
      if (response.status === 403) {
        alert('Login failed. Your account is ban.');
      } else {
        alert('Login failed. Please check your username and password.');
      }
    }
  };

  // Nếu có token, hiển thị nội dung đã xác thực
  if (token) {
    return <Navigate to="/Todo" />;
  }

  // Nếu chưa có token, hiển thị form đăng nhập
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="div" align="center">
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <StyledButton variant="contained" color="primary" type="submit">
            Login
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Login;
