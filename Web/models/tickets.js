'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init({
    customer_id: DataTypes.INTEGER,
    type_party_id: DataTypes.INTEGER,
    table_id: DataTypes.INTEGER,
    received_date: DataTypes.DATE,
    payment_date: DataTypes.DATE,
    customer_phone: DataTypes.STRING,
    customer_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tickets',
  });
  return Tickets;
};