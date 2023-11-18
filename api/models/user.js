const Sequelize = require("sequelize");
const database = require("../database/database.config");
const Company = require("./company");
const Course = require("./course");

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
  birth_date: Sequelize.DATE,
  gender: Sequelize.STRING,
  phone: Sequelize.STRING,
  period: Sequelize.INTEGER,
  specialties: Sequelize.STRING,
});

User.belongsTo(Company, { foreignKey: "company_id" });
User.belongsTo(Course, { foreignKey: "course_id" });

module.exports = User;
