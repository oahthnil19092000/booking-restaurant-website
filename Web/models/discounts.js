'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discounts.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    percent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Discounts',
  });
  return Discounts;
};