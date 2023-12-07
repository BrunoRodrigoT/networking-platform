const Sequelize = require("sequelize");
const database = require("../database/database.config");
const Publication = require("./publication");
const User = require("./user");

const Favorite = database.define("favorite", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

Favorite.belongsTo(User, { foreignKey: "user_id" });
Favorite.belongsTo(Publication, { foreignKey: "publication_id" });

module.exports = Favorite;
