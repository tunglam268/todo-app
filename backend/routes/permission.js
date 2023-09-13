const db = require('../database/connect');

function checkPermission(permission) {
    return function (req, res, next) {
        // Truy cập thông tin người dùng từ req.user
        const user = req.user;
        // Kiểm tra quyền truy cập của người dùng tại đây
        // Sử dụng thông tin người dùng từ req.user hoặc từ token để kiểm tra
        db.query('SELECT DISTINCT PermissionName from permission JOIN rolepermission rp ON permission.PermissionID = rp.PermissionID JOIN userrole ur on rp.RoleID = ur.RoleID WHERE ur.UserID = ?', [user.id], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const hasPermission = results.find((row) => row.PermissionName === permission);
                if (hasPermission) {
                    next();
                } else {
                    // Nếu người dùng không có quyền truy cập, gửi phản hồi lỗi 403 (Access denied)
                     res.status(403).json({ message: 'Access denied' });
                }
            }
        });

    };
}

module.exports = checkPermission;
