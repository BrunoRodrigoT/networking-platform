const Sequelize = require("sequelize");
const database = require("../database/database.config");
const Company = require("./company");
const Course = require("./course");
const User = require("./user");

const Publication = database.define("publication", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  tags: Sequelize.ARRAY(Sequelize.STRING),
});

Publication.belongsTo(Company, { foreignKey: "company_id" });
Publication.belongsTo(Course, { foreignKey: "course_id" });
Publication.belongsTo(User, { foreignKey: "user_id" });

module.exports = Publication;
