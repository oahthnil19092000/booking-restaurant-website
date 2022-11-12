"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        let data = [];
        for (let i = 1; i <= 100; i++) {
            for (let j = 1; j <= Math.floor(Math.random() * (6 - 3) + 3); j++) {
                let detail = {
                    food_id: i,
                    main_ingredient_id: Math.floor(Math.random() * (36 - 1) + 1),
                    quantity: Math.floor(Math.random() * (10 - 2) + 2),
                    unit: Math.floor(Math.random()) == 1 ? "grams" : "spoons",
                };
                data.push(detail);
            }
        }
        await queryInterface.bulkInsert("MainIngredientDetails", data, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("MainIngredientDetails", null, {});
    },
};
