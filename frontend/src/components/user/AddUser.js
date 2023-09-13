import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, Switch } from '@mui/material';
import moment from 'moment';

function AddUser({ open, onClose, onSave, user, onEdit }) {
    const [username, setUsername] = useState('');
    const [id, setID] = useState(null)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
        if (onEdit === true) {
            setIsEdit(true);
            setID(user.id)
            setUsername(user.username);
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            setDateOfBirth(moment.utc(user.date_of_birth).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'));
            setUserStatus(user.is_active);
        } else {
            setIsEdit(false);
            setUsername('');
            setFirstname('');
            setLastname('');
            setEmail('');
            setDateOfBirth('');
        }
    }, [user]);

    const handleSave = () => {
        onSave({
            username,
            firstname,
            lastname,
            email,
            dateOfBirth,
            userStatus,
        }, isEdit, id);

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm Người Dùng</DialogTitle>
            <DialogContent sx={{ height: '500px', width: '500px' }}>
                <form onSubmit={handleSave}>
                    <Box sx={{ marginBottom: '8px' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isEdit}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                        <TextField
                            label="Firstname"
                            variant="outlined"
                            fullWidth
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                        <TextField
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ marginBottom: '8px' }}>
                        <TextField
                            label="Date of Birth"
                            type="date"
                            variant="outlined"
                            fullWidth
                            required
                            defaultValue={moment(dateOfBirth).format('YYYY-MM-DD')}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </Box>
                    {isEdit && (
                        <Box sx={{ marginBottom: '8px' }}>
                            <Switch
                                checked={userStatus}
                                onChange={() => setUserStatus(!userStatus)}
                            />
                            <label>Trạng thái người dùng</label>
                        </Box>
                    )}
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Đóng
                        </Button>
                        <Button type="submit" color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddUser;
