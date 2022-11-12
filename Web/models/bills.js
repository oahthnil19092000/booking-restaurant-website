'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bills.init({
    bill_number: DataTypes.STRING,
    ticket_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER,
    sum_total: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bills',
  });
  return Bills;
};