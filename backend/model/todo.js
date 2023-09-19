module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        due_date: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        is_completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return Todo;
};
