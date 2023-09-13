import React from 'react';
import moment from 'moment-timezone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function UserCard({ user, onEdit }) {
    return (
        <Card sx={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc', position: 'relative' }}>
            <IconButton size="small" aria-label="Chỉnh sửa" onClick={() => onEdit(user,true)} style={{ position: 'ab', top: 0, right: 0 }}>
                <EditIcon />
            </IconButton>

            <CardContent>
                <Typography variant="h6" sx={{ color: 'blue' }}>
                    Name : {user.firstname} {user.lastname}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'normal' }}>
                    Email: {user.email}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'normal' }}>
                    Date Of Birth: {user.date_of_birth ? moment.utc(user.date_of_birth).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD') : null}
                </Typography>
                {/* <Switch
                    checked={user.is_active}

                /> */}
            </CardContent>
        </Card>
    );
}

export default UserCard;
