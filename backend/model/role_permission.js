module.exports = (sequelize, Sequelize) => {
    const RolePermission = sequelize.define("role_permissions", {
        RoleID: {
            type: Sequelize.INTEGER,
        },
        PermissionID: {
            type: Sequelize.INTEGER,
        },
    });

    return RolePermission;
};
