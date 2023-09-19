const { Sequelize } = require('sequelize');
const dbConfig = require("../config/db_config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Kiểm tra kết nối cơ sở dữ liệu
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

const db = {};

db.users = require("../model/user.js")(sequelize, Sequelize);
db.cities =  require("../model/city.js")(sequelize, Sequelize);
db.districts =  require("../model/district.js")(sequelize, Sequelize);
db.permissions =  require("../model/permission.js")(sequelize, Sequelize);
db.role =  require("../model/role.js")(sequelize, Sequelize);
db.role_permissions =  require("../model/role_permission.js")(sequelize, Sequelize);
db.todos =  require("../model/todo.js")(sequelize, Sequelize);
db.user_roles =  require("../model/user_role.js")(sequelize, Sequelize);
db.wards =  require("../model/ward.js")(sequelize, Sequelize);
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Table created successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table: ', error);
    });

module.exports = sequelize;
