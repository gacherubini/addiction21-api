const Sequelize = require('sequelize');
const database = require('../db');

const Addicast = database.define('addicast', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.STRING
    },
})

module.exports = Addicast;