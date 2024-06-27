// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PluriHarinas', 'PluHa_User', 'wxpm123#!', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    }
  }
});

module.exports = sequelize;
