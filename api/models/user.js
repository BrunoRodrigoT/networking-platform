const Sequelize = require("sequelize");
const database = require("../database/database.config");

const User = database.define("users", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
