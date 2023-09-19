module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define("permissions", {
        PermissionID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        PermissionName: {
            type: Sequelize.STRING(50), // Đặt độ dài tối đa cho chuỗi PermissionName
            allowNull: false,
        },
    });

    return Permission;
};