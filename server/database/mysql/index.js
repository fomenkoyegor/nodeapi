const Sequelize = require("sequelize");
const config = require('../../config');
const { DB } = config;


const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
    dialect: DB.dialect,
    host: DB.host,
    port: DB.port,
    pool: DB.pool
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
global.sequelize = sequelize;    