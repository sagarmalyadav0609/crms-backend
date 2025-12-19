'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plans.init({
      name: {
        type: DataTypes.STRING
      },
      featurs: {
        type: DataTypes.STRING
      },
      validation: {
        type: DataTypes.STRING
      },
      base_price: {
        type: DataTypes.STRING
      },
      offer_price: {
        type: DataTypes.STRING
      },
      student_limit: {
        type: DataTypes.STRING
      },
      team_limit: {
        type: DataTypes.STRING
      },

  }, {
    sequelize,
    modelName: 'plans',
  });
  return plans;
};