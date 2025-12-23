'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plan_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Plans',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull:false,

      },
      end_date: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      purchase_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false,
      },
      payment_info: {
        type: Sequelize.STRING,
        allowNull:true,
        comment:'Transaction details/screenshot from geteway'

      },
      status:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:'ACTIVE',
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
    await queryInterface.dropTable('Subscriptions');
  }
};