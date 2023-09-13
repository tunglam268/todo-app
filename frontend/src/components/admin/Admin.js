import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserList from '../user/UserList';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Toolbar, Box, Grid } from '@mui/material';

function Admin() {
    const navigate = useNavigate(); // Sử dụng useHistory để điều hướng

    const handleGoToTodoPage = () => {
        // Sử dụng history.push để điều hướng đến trang Todo
        navigate('/Todo');
    };
    return (
        <div>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Box flexGrow={1}> {/* Sử dụng Box với flexGrow để căn giữa chữ */}
                        <Typography variant="h6" style={{ textAlign: 'center' }}>
                            Trang quản trị
                        </Typography>
                    </Box>
                    <IconButton edge="start" color="inherit" onClick={handleGoToTodoPage}>
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: '30px' }}>
                <UserList />
            </Container>
        </div>
    );
}

export default Admin;
