import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Checkbox, FormControlLabel, Typography, Box, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditTodoModal({ todo, onSave, onClose }) {
    const [editedTodo, setEditedTodo] = useState({ ...todo });
    const [isCompleted, setCompleted] = useState(todo.is_completed);

    // Sử dụng useEffect để cập nhật giá trị của isCompleted khi todo thay đổi
    useEffect(() => {
        setCompleted(todo.is_completed);
    }, [todo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({ ...editedTodo, [name]: value });
    };

    const handleIsCompleteChange = () => {
        setEditedTodo({
            ...editedTodo,
            is_completed: !isCompleted, // Cập nhật giá trị is_completed
        });
        setCompleted(!isCompleted);
    }

    const handleSaveClick = () => {
        onSave(editedTodo);
        onClose();
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Container maxWidth="sm" sx={{ backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
                <form onSubmit={handleSaveClick}>
                    <div className="modal">
                        <Typography variant="h5" gutterBottom>
                            Sửa
                        </Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={editedTodo.title}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={editedTodo.description}
                            onChange={handleInputChange}
                        />
                        <DatePicker
                            selected={editedTodo.due_date ? new Date(editedTodo.due_date) : null}
                            onChange={(date) => setEditedTodo({ ...editedTodo, due_date: date })}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select due date"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="is_completed"
                                    checked={isCompleted}
                                    onChange={handleIsCompleteChange}
                                />
                            }
                            label="Completed"
                        />
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </div>
                </form>
            </Container>
        </Modal>
    );
}

export default EditTodoModal;
