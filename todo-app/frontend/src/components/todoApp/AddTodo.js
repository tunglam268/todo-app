import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function AddTodo({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [isCompleted, setCompleted] = useState(false);


    const handleCheckboxChange = () => {
        setCompleted(!isCompleted); // Khi người dùng tích hoặc bỏ tích ô checkbox, đảo ngược giá trị
    };

    const handleAddClick = () => {
        onAdd(title, description, dueDate, isCompleted);
        setTitle('');
        setDescription('')
        setDueDate(null)
        setCompleted(false)
    };

    return (
        <div className="add-todo-container">
            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="datepicker">
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select due date"
                />

            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="completed-checkbox">Completed ?</label>
            </div>
            <div className="button-container">
                <button onClick={handleAddClick}>Add</button>
            </div>
        </div>
    );
}

export default AddTodo;
