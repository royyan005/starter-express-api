'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matkuls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_nilai: {
        type: Sequelize.FLOAT
      },
      average: {
        type: Sequelize.FLOAT
      },
      sks: {
        type: Sequelize.INTEGER
      },
      huruf_mutu: {
        type: Sequelize.ENUM("A","B","C","D","E")
      },
      angka_mutu: {
        type: Sequelize.FLOAT
      },
      nilai_mutu: {
        type: Sequelize.FLOAT
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      kode_matkul: {
        type: Sequelize.STRING
      },
      pembimbing_id: {
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
    await queryInterface.dropTable('matkuls');
  }
};