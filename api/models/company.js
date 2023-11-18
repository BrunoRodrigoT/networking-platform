const Sequelize = require("sequelize");
const database = require("../database/database.config");

const Company = database.define("company", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  UF: Sequelize.STRING,
});

module.exports = Company;
