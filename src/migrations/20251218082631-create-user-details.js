'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        // allowNull:false,
        references:{
          model:"Users",
          key:"id",
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        allowNull:false,
        unique:true,


      },
      name: {
        type: Sequelize.STRING(50),
        allowNull:false,

      },
      email: {
        type: Sequelize.STRING,
        validate:{
          isEmail:true,

        },
        unique:true,
        allowNull:false,

      },
      contact: {
        type: Sequelize.STRING,
        validate:{
          isIndianPhoneNumber(value){
            const indianPhoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
            if (!indianPhoneRegex.test(value)) {
          throw new Error('Invalid Indian phone number format.');
        }
          }
        },
        unique:true,
        allowNull:false
      },
      school_name: {
        type: Sequelize.STRING(100),
        allowNull:false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      school_logo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      school_url: {
        type: Sequelize.STRING,
        allowNull:true
      },
      assets: {
        type: Sequelize.JSON,
        defaultValue:{}

      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        allowNull:false
        
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
    await queryInterface.dropTable('User_details');
  }
};