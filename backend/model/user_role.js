module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("user_roles", {
        UserID: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        RoleID: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });

    return UserRole;
};
