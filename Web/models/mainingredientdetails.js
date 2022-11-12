"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MainIngredientDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    MainIngredientDetails.init(
        {
            food_id: DataTypes.INTEGER,
            main_ingredient_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            unit: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "MainIngredientDetails",
        }
    );
    return MainIngredientDetails;
};
