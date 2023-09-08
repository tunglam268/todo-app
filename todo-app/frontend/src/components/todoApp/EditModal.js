import React, { useState, useEffect } from 'react';
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
        <div className="modal">
            <h2>Edit Todo</h2>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={editedTodo.title}
                onChange={handleInputChange}
            />
            <label>Description:</label>
            <input
                type="text"
                name="description"
                value={editedTodo.description}
                onChange={handleInputChange}
            />
            <label>Due Date:</label>
            <DatePicker
                selected={editedTodo.due_date ? new Date(editedTodo.due_date) : null}
                onChange={(date) => setEditedTodo({ ...editedTodo, due_date: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select due date"
            />


            <label>Completed:</label>
            <input
                type="checkbox"
                name="is_completed"
                checked={isCompleted}
                onChange={handleIsCompleteChange}
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default EditTodoModal;
