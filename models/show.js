const Sequelize = require('sequelize');
const database = require('../db');

const Show = database.define('show', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artistas: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: Sequelize.STRING
})

module.exports = Show;