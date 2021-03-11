const Sequelize = require('sequelize');

const sql = new Sequelize('dostorDB', 'root', 'MySQL1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sql;