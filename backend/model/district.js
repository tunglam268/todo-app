module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define("districts", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        district_name: {
            type: Sequelize.STRING(255), // Đặt độ dài tối đa cho chuỗi district_name
            allowNull: false,
        },
        district_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cityID: {
            type: Sequelize.INTEGER,
            defaultValue: null,
        },
    });
    District.belongsTo(sequelize.models.cities, { foreignKey: 'cityID' });
    return District;
};
