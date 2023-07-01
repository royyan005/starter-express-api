'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('users', [{
            username: "admin",
            password: "$2b$10$Aoj88DP.OHZESPYkGmTkBelxuNo/k3fZc0vCAi2wGXmP69OvxnC5e",
            role: "ADMIN",
            full_name: "Admin",
            createdBy: "Admin",
            updatedBy: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('users', null, {});
    }
};