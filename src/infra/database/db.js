require('dotenv').config();

const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME || "postgres";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbHost = process.env.DB_HOST || "db";
const dbPort = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "postgres",
    host: dbHost,
    port: dbPort,
});

module.exports = sequelize;
