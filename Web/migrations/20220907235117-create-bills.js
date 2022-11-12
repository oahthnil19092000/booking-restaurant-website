"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bills", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bill_number: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            ticket_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            admin_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            discount_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            sum_total: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            status: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("Bills");
    },
};
