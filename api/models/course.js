const Sequelize = require("sequelize");
const database = require("../database/database.config");
const Company = require("./company");

const Course = database.define("course", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  periods: Sequelize.INTEGER,
});

Course.belongsTo(Company, { foreignKey: "company_id" });

module.exports = Course;
