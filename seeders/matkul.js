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
    await queryInterface.bulkInsert('matkuls', [
      {
      sks: 2,                                             //id 1
      deskripsi: "Kode Etik dan Etika Profesi Insinyur",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      sks: 2,                                             //id 2
      deskripsi: "Profesionalisme Keinsinyuran",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      sks: 2,                                             //id 3
      deskripsi: "Keselamatan Kesehatan Kerja dan Lingkungan",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      sks: 12,                                             //id 4
      deskripsi: "Praktik Keinsinyuran",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      sks: 4,                                             //id 5
      deskripsi: "Studi Kasus",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      sks: 2,                                             //id 6
      deskripsi: "Seminar, Workshop, Diskusi",
      kode_matkul: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('matkuls', null, {});
  }
};