'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn(
      'Users',        // table name
      'jwt_token',          // new column name
      {
        type: Sequelize.STRING,
        allowNull: true,
        after:'password'
      }
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('Users', 'jwt_token');
  }
};
