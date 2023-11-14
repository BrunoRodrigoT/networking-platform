const { Sequelize } = require("sequelize");
const bases = require("../config/config.json");

const sequelize = new Sequelize(
  bases.development.database,
  bases.development.username,
  bases.development.password,
  {
    host: bases.development.host,
    dialect: bases.development.dialect,
  }
);

module.exports = sequelize;
