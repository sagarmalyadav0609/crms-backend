'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan.init({
     name: {
        type: DataTypes.STRING(100),
        allowNull:false,
        unique:true
      },
      features: {
        type: DataTypes.TEXT, 
        allowNull:false
      },
      validity: {
        type: DataTypes.STRING,
        allowNull:false
      },
      base_price: {
        type: DataTypes.STRING,
        allowNull:false
      },
      offer_price: {
        type: DataTypes.STRING,
        allowNull:true
      },
      student_limit: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:0
      },
      team_limit: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:1
      },
      status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
      },
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};