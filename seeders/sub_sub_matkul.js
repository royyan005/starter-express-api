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
    await queryInterface.bulkInsert('sub_sub_matkuls', [
      {
        sub_matkul_id: 9,         //1
        deskripsi: "Praktik Keinsinyuran Setingkat Pengambil Kebijakan",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 9,         //2
        deskripsi: "Praktik Keinsinyuran Setingkat Manajer",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 9,         //3
        deskripsi: "Praktik Keinsinyuran Setingkat Pelaksana",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 9,         //4
        deskripsi: "Praktik Keinsinyuran Setingkat Operator",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 10,         //5
        deskripsi: "Dosen/peneliti/lembaga litbang",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 10,         //6
        deskripsi: "Direksi/GM",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 10,         //7
        deskripsi: "Leader manager",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 10,         //8
        deskripsi: "Engineer",
        kode_sub_sub_matkul: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('sub_sub_matkuls', null, {});
  }
};