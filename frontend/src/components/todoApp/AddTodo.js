import React, { useState } from 'react';
import { Box, TextField, Checkbox, Button, FormControlLabel, Grid, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddTodo({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [isCompleted, setCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setCompleted(!isCompleted);
    };

    const handleAddClick = () => {
        onAdd(title, description, dueDate, isCompleted);
        setTitle('');
        setDescription('');
        setDueDate(null);
        setCompleted(false);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Add New Todo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Task Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Task Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        placeholderText="Select due date"
                        dateFormat="dd/MM/yyyy"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCompleted}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label="Completed"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddClick}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddTodo;
