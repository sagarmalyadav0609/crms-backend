'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull:false,
        unique:true
      },
      features: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      validity: {
        type: Sequelize.STRING,
        allowNull:false
      },
      base_price: {
        type: Sequelize.STRING,
        allowNull:false
      },
      offer_price: {
        type: Sequelize.STRING,
        allowNull:true
      },
      student_limit: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:0
      },
      team_limit: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:1
      },
      status:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plans');
  }
};