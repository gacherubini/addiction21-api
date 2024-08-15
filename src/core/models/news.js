const Sequelize = require('sequelize');
const database = require('../../infra/database/db');

const News = database.define('news', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publicationDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
    },
    externalLink: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = News;
