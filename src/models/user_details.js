'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_details.init({
      user_id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING(50),
        allowNull:false,

      },
      email: {
        type: DataTypes.STRING,
        validate:{
          isEmail:true,

        },
        unique:true,
        allowNull:false,

      },
      contact: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING(100),
        allowNull:false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull:false,
      },
      school_logo: {
        type: DataTypes.STRING,
        allowNull:true
      },
      school_url: {
        type: DataTypes.STRING,
        allowNull:true
      },
      assets: {
        type: DataTypes.JSON,
        defaultValue:{}

      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull:false
        
      },
  }, {
    sequelize,
    modelName: 'User_details',
  });
  return User_details;
};