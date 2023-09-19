module.exports = (sequelize, Sequelize) => {
    const Ward = sequelize.define("wards", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ward_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ward_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        districtID: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
    });

    Ward.belongsTo(sequelize.models.districts, { foreignKey: 'districtID' });

    return Ward;
};
