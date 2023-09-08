import React, { useState } from 'react';
import EditTodoModal from './EditModal'; // Import EditTodoModal
import moment from 'moment-timezone';
import 'moment-timezone';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const rangePresets = [
    {
        label: 'Last 7 Days',
        value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
        label: 'Last 14 Days',
        value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
        label: 'Last 30 Days',
        value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
        label: 'Last 90 Days',
        value: [dayjs().add(-90, 'd'), dayjs()],
    },
];

function TodoList({ todos, onEdit, onDelete, onSort, onDateRangeChange }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false); // State để kiểm soát việc hiển thị modal
    const [selectedTodo, setSelectedTodo] = useState(null); // State để lưu thông tin công việc cần chỉnh sửa
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái để lưu trang hiện tại
    const [todosPerPage] = useState(10); // Số lượng công việc hiển thị trên mỗi trang  
    const [rankSortOrder, setRankSortOrder] = useState('asc'); // Mặc định sắp xếp tăng dần

    const handleRankSortClick = () => {
        // Toggle trạng thái sắp xếp giữa tăng dần (asc) và giảm dần (desc)
        const newSortOrder = rankSortOrder === 'asc' ? 'desc' : 'asc';
        setRankSortOrder(newSortOrder); // Cập nhật rankSortOrder với giá trị mới
        onSort(newSortOrder); // Truyền giá trị mới vào hàm onSort
    };

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            const startDate = dateStrings[0];
            const endDate = dateStrings[1];

            // Gọi hàm onDateRangeChange với startDate và endDate
            let dateRange = { startDate, endDate }
            onDateRangeChange(dateRange);
        }
    };
    // Hàm để xác định danh sách công việc hiển thị trên trang hiện tại
    const getCurrentPageTodos = () => {
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        return todos.slice(indexOfFirstTodo, indexOfLastTodo);
    };

    const currentTodos = getCurrentPageTodos();

    // Hàm để thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hàm để tính tổng số trang
    const totalPages = Math.ceil(todos.length / todosPerPage);


    const handleEditClick = (todo) => {
        setSelectedTodo(todo); // Lưu thông tin công việc cần chỉnh sửa vào state
        setEditModalOpen(true); // Mở modal
    };

    const hadleDeleteClick = (todo) => {
        onDelete(todo); // Lưu thông tin công việc cần chỉnh sửa vào state
        if (isEditModalOpen === true) {
            setEditModalOpen(false)
        }; // Mở modal
    };

    const handleDetailClick = (todo) => {
        // Tạo một thông báo alert với thông tin của công việc
        alert(`Detail:\nTitle: ${todo.title}\nDescription: ${todo.description}\nDue Date: ${todo.due_date ? moment.utc(todo.due_date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss') : 'N/A'}\nCompleted: ${todo.is_completed ? 'Yes' : 'No'}`);
    };


    const handleEditSave = (editedTodo) => {
        onEdit(editedTodo); // Gửi thông tin cập nhật lên server hoặc xử lý tùy theo cách bạn xây dựng API
        setEditModalOpen(false); // Đóng modal sau khi lưu
    };

    const handleEditClose = () => {
        setEditModalOpen(false); // Đóng modal nếu người dùng nhấn "Cancel" hoặc xử lý xong
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Rank{' '}
                            <button
                                className="sort-button"
                                onClick={handleRankSortClick}
                            >
                                {rankSortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                        </th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>
                            Due Date{' '}
                            <RangePicker presets={rangePresets} onChange={onRangeChange} />
                        </th>

                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTodos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.due_date ? moment.utc(todo.due_date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss') : null}</td>
                            <td>{todo.is_completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEditClick(todo)}>Edit</button>{' '}
                                <button onClick={() => hadleDeleteClick(todo)}>Delete</button>{' '}
                                <button onClick={() => handleDetailClick(todo)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditModalOpen && ( // Hiển thị modal nếu isEditModalOpen là true
                <EditTodoModal
                    todo={selectedTodo}
                    onSave={handleEditSave}
                    onClose={handleEditClose}
                />
            )}
            <div className="pagination">
                <ul>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index + 1}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? "current-page" : ""}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default TodoList;
