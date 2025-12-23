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
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:'Plans',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'RESTRICT',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Users",
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull:false,

      },
      end_date: {
        type: DataTypes.DATE,
        allowNull:false,
      },
      purchase_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
      },
      payment_info: {
        type: DataTypes.STRING,
        allowNull:true,
        comment:'Transaction details/screenshot from geteway'

      },
      status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:'ACTIVE',
      },
  }, {
    sequelize,
    modelName: 'Subscriptions',
  });
  return Subscriptions;
};