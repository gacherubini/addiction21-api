const Sequelize = require('sequelize');
const database = require('../../infra/database/db');

const Musica = database.define('musica', {
    nome: {
        type: Sequelize.STRING,
    },
    artistas: {
        type: Sequelize.STRING,
    },
    data: {
        type: Sequelize.STRING,
    },
    imagem: {
        type: Sequelize.STRING
    },
    link: {
        type: Sequelize.STRING
    }
});

module.exports = Musica;
