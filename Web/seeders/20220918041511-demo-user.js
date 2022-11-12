"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = new require("bcrypt");
module.exports = {
    async up(queryInterface, Sequelize) {
        let count = 100;
        let users = [];
        for (let i = 0; i < count; i++) {
            var user = {
                name: faker.name.fullName(),
                username: faker.internet.userName(),
                password: bcrypt.hashSync(faker.internet.password(), 10),
                email: faker.internet.email(),
                birthday: faker.date
                    .birthdate({ min: 1950, max: 2010, mode: "year" })
                    .toISOString()
                    .split("T")[0],
                is_admin: Math.random() < 0.2,
            };
            users.push(user);
        }
        await queryInterface.bulkInsert("Users", users, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
