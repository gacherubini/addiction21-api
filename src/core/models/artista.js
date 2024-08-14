const Sequelize = require('sequelize');
const database = require('../../infra/database/db');

const Artista = database.define('artista', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    insta: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    soundcloud: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    youtube: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Artista;
