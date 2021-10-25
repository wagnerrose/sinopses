
module.exports = function (app) {
    const Sequelize = require('sequelize');
    
    return modelNoticia = app.config.dbConnection().define('noticia', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        noticia: Sequelize.STRING
    })
}