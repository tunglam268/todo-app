module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        RoleID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        RoleName: {
            type: Sequelize.STRING(50), // Đặt độ dài tối đa cho chuỗi RoleName
            allowNull: false,
        },
    });

    return Role;
};