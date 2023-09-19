module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        city_name: {
            type: Sequelize.STRING(255), // Đặt độ dài tối đa cho chuỗi city_name
            allowNull: false,
        },
        city_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return City;
};
