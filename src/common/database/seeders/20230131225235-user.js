const Faker = require("../fakers");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User", Faker("users"), {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User", null, {});
  },
};
