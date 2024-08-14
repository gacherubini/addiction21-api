const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost =  'db';
const dbPassword = process.env.DB_PASSWORD || 'postgres';


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "postgres",
    host: dbHost,
    port: process.env.DB_PORT || 5432,
});

module.exports = sequelize;
