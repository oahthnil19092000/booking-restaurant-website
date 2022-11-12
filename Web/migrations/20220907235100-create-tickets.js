"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Tickets", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            customer_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            type_party_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            table_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            received_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            payment_date: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            customer_phone: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            customer_address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Tickets");
    },
};
