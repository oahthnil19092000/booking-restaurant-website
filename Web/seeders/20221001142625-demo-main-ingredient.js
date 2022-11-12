"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        let mainIngredientResult = [
            "Almond Milk",
            "Red Wine Vinegar",
            "Red Wine",
            "Margarine",
            "Soy Milk",
            "White Wine",
            "Yeast",
            "White Pepper",
            "Rice Vinegar",
            "Sea Salt",
            "Hoisin Sauce",
            "Malt Vinegar",
            "Chocolate Chips",
            "Quinoa",
            "Rice Flour",
            "Polenta",
            "Oyster Sauce",
            "Guchchi",
            "Flat Noodles",
            "Balsamic Vinegar",
            "Coconut Oil",
            "Barfi",
            "Rice Noodles",
            "Coffee",
            "Beer",
            "Cranberry Sauce",
            "Cornflour",
            "Cocoa",
            "Tea",
            "Brown Sauce",
            "Baking Soda",
            "Tofu",
            "Baking Powder",
            "Arrowroot",
            "Egg",
            "Alum",
        ];
        let mainIngredientList = [];
        for (let i = 0; i < mainIngredientResult.length; i++) {
            var mainIngredient = {
                name: mainIngredientResult[i],
                status: true,
            };
            mainIngredientList.push(mainIngredient);
        }
        await queryInterface.bulkInsert("MainIngredients", mainIngredientList, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("MainIngredients", null, {});
    },
};
