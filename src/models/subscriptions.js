'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscriptions.init({
    plan_id: {
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      purchase_price: {
        type: DataTypes.INTEGER
      },
      payment_info: {
        type: DataTypes.STRING
      },
  }, {
    sequelize,
    modelName: 'Subscriptions',
  });
  return Subscriptions;
};