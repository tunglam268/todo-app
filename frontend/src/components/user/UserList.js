import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Container, Typography, Toolbar, AppBar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddUser from './AddUser';
import UserFilter from './UserFilter';
import UserCard from './UserCard';
import moment from 'moment';


function UserList() {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState();
    const [isEdit, setIsEdit] = useState(false)
    const [switchChange, setSwitchChange] = useState(false)
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const token = sessionStorage.getItem('token');

    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const handleOpenSaveDialog = () => {
        setOpenDialog(true);
        setEditingUser(null);
        setIsEdit(false);
    };

    const handleOpenEditDialog = (user, isEditCard) => {
        setOpenDialog(true);
        setEditingUser(user);
        setIsEdit(isEditCard);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveDialog = (userData, isEdit, id) => {
        const { username, firstname, lastname, email, dateOfBirth, userStatus } = userData;
        // Tạo đối tượng người dùng mới
        const newUser = {
            username,
            firstname,
            lastname,
            email,
            date_of_birth: dateOfBirth,
        };

        let method = 'POST';
        let url = `http://localhost:8080/users`;

        if (isEdit === true) {
            method = 'PUT';
            url = `http://localhost:8080/users/${id}`;
            newUser.is_active = userStatus;
        }
        fetch(url, {

            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (isEdit === true) {
                    console.log('Người dùng đã được cập nhật :', data);
                } else {
                    console.log('Người dùng đã được tạo mới:', data);
                }
                handleCloseDialog();
            })
            .catch((error) => {
                if (isEdit === true) {
                    console.log('Error updating user :', error);
                } else {
                    console.log('Error creating user :', error);
                }
            });
    };


    const fetchUsers = () => {
        const token = sessionStorage.getItem('token');
        let apiUrl = 'http://localhost:8080/users';
        // Tạo một mảng queryParams để xây dựng các tham số truy vấn
        const queryParams = [];

        if (searchText) {
            queryParams.push(`search=${searchText}`);
        }
        if (sort) {
            queryParams.push(`sort=${sort}`);
        }
        if (dateRange.startDate) {
            queryParams.push(`timeRangeFrom=${moment.utc(dateRange.startDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')}`);
        }
        if (dateRange.endDate) {
            queryParams.push(`timeRangeTo=${moment.utc(dateRange.endDate).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')}`);
        }

        // Nếu có các tham số truy vấn, thêm chúng vào URL của API
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
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    };

    const handleClearFilter = () => {
        setSearchText(''); // Xóa giá trị trong trường tìm kiếm
        setSort(''); // Xóa giá trị sắp xếp
        setDateRange({ startDate: '', endDate: '' }); // Xóa giá trị ngày bắt đầu và kết thúc
        fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, [searchText]);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary" sx={{ marginBottom: '20px' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Danh sách người dùng</Typography>
                        <Button variant="contained" color="secondary" onClick={handleOpenSaveDialog}>
                            <AddIcon />Thêm Người Dùng
                        </Button>
                        <Box sx={{ marginLeft: '10px' }} /> {/* Tạo khoảng trống giữa hai nút */}
                        <Button
                            variant="contained"
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                            sx={{
                                bgcolor: 'green', // Màu mặc định
                                '&:hover': {
                                    bgcolor: 'green', // Màu khi hover vào nút
                                },
                            }}// Tuỳ chỉnh màu xanh lá cho nút "Bộ lọc"
                        >
                            Bộ lọc
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Grid container spacing={4}>
                    {/* Bộ lọc */}
                    <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                        {isFilterVisible && ( // Hiển thị phần bộ lọc nếu isFilterVisible là true
                            <UserFilter
                                searchText={searchText}
                                setSearchText={setSearchText}
                                sort={sort}
                                setSort={setSort}
                                dateRange={dateRange}
                                setDateRange={setDateRange}
                                onApplyFilter={() => {
                                    // Gọi hàm fetchUsers với các giá trị bộ lọc mới
                                    fetchUsers(searchText, sort, dateRange);
                                }}
                                onClearFilter={handleClearFilter}
                            />
                        )}

                    </Grid>
                    {/* Danh sách người dùng */}
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user.id}>
                            <UserCard user={user} onEdit={handleOpenEditDialog} onSwitchChange={setSwitchChange} />
                        </Grid>
                    ))}
                </Grid>
            </Container>


            <AddUser open={openDialog} onClose={handleCloseDialog} onSave={handleSaveDialog} user={editingUser} onEdit={isEdit} switchChange={switchChange} />

        </div>

    );
}

export default UserList;