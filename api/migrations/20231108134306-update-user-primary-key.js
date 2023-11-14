"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      primaryKey: false,
      autoIncrement: false,
    });
  },
};
