'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.User_details,{
        foreignKey: "user_id",
        as: "User_details",
        onDelete:"CASCADE",
        onUpdate:"CASCDE",
      });
    
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [3,50],
          msg: "name must be between 3 and 50 characters." // Custom message
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          // type:true,
          msg: 'email is not valid', 
 
        },
        notNull: {
          msg: 'Email is required'
        },

      },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jwt_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:null
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false

    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};