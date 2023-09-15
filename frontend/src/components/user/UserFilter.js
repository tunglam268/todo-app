import React from 'react';
import { Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

function UserFilter({ searchText, setSearchText, sort, setSort, dateRange, setDateRange, onApplyFilter, onClearFilter }) {
    return (
        <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>Bộ lọc</Typography>
            <TextField
                label="Tìm kiếm"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ marginBottom: '10px' }}
            />
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }}>
                <InputLabel>Sort</InputLabel>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    label="Sort"
                >
                    <MenuItem value="">Không sắp xếp</MenuItem>
                    <MenuItem value="id">Sắp xếp theo ID</MenuItem>
                    <MenuItem value="lastname">Sắp xếp theo tên</MenuItem>
                    {/* Thêm các tùy chọn sắp xếp khác nếu cần */}
                </Select>
            </FormControl>
            <TextField
                label="Ngày bắt đầu"
                type="date"
                variant="outlined"
                fullWidth
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                sx={{ marginBottom: '10px' }}
            />
            <TextField
                label="Ngày kết thúc"
                type="date"
                variant="outlined"
                fullWidth
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                sx={{ marginBottom: '10px' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onApplyFilter}
                    sx={{ marginRight: '10px' }} // Thêm margin bên phải của nút Áp dụng bộ lọc
                >
                    Áp dụng bộ lọc
                </Button>
                <Button
                    variant="contained"
                    onClick={onClearFilter}
                    sx={{ marginLeft: '10px' }} // Thêm margin bên trái của nút Xóa bộ lọc
                >
                    Xóa bộ lọc
                </Button>
            </Box>
        </Paper>
    );
}

export default UserFilter;
