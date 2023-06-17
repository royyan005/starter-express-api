'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('total_nilai_matkuls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      average: {
        type: Sequelize.FLOAT
      },
      huruf_mutu: {
        type: Sequelize.ENUM("A","B","B+","C","C+","D","E")
      },
      angka_mutu: {
        type: Sequelize.FLOAT
      },
      nilai_mutu: {
        type: Sequelize.FLOAT
      },
      nilai_matkul_id: {
        type: Sequelize.INTEGER
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('total_nilai_matkuls');
  }
};