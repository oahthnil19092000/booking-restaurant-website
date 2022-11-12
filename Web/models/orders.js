"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Orders.init(
        {
            ticket_id: DataTypes.INTEGER,
            food_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Orders",
        }
    );
    return Orders;
};
