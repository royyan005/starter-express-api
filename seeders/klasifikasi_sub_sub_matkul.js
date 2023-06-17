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
    await queryInterface.bulkInsert('klasifikasi_sub_sub_matkuls', [{
        sub_sub_matkul_id: 1,       //1
        nilai_min: 71,
        nilai_max: 80.9,
        deskripsi: "s/d Kadis/Project Manager (kab/kota)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 1,       //2
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "kabiro/asisten/kadis/project manager (provinsi)/sekda/kabalai/rektor/wakil rektor",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 2,       //3
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT (lokal)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 2,       //4
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/BUMN",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 2,       //5
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "PT/BUMN/JO/Multinasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 3,       //6
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT (lokal)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 3,       //7
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/BUMN",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 3,       //8
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "PT/BUMN/JO/Multinasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 4,       //9
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT (lokal)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 4,       //10
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/BUMN",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 4,       //11
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "PT/BUMN/JO/Multinasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 5,       //12
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "Belum ada pengem (buku atau paten/formula)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 5,       //13
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "Ada pengemb (2 buku dan/atau 1 paten/formula)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 5,       //14
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "ada pengem berkelanjutan",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 6,       //15
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT/Kasi/(kab/kota)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 6,       //16
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/Kacab BUMN/Kabid",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 6,       //17
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Direksi PT/BUMN/kadis/kabiro/asisten",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 7,       //18
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT/Kasi(kab/kota)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 7,       //19
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/BUMN/Kabid",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 7,       //20
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "PT/BUMN/JO/Sekda/kadis",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 8,       //21
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "CV/PT/staf/pengalaman < 7thn",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 8,       //22
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "PT/BUMN/pengalaman 7-15thn",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_sub_matkul_id: 8,       //23
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "PT/BUMN/staf/pengalaman > 15thn",
        kode_klasifikasi: "",
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
    await queryInterface.bulkDelete('klasifikasi_sub_sub_matkuls', null, {});
  }
};