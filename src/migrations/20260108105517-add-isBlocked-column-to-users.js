'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',        // table name
      'isBlocked',          // new column name
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        after:'email'
      }
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('Users', 'isBlocked');
  }
};
