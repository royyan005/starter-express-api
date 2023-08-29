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
    await queryInterface.bulkInsert('sub_matkuls', [
      {
        matkul_id: 1,               //1
        deskripsi: "Organisasi Profesi & Organisasi Lainnya (>= 3)",
        kode_sub_matkul: "nilai1_1",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 1,               //2
        deskripsi: "Tanda Penghargaan (>=3)",
        kode_sub_matkul: "nilai1_2",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 1,               //3
        deskripsi: "Referensi Kode Etik dan Etika Profesi (2-4 referensi)",
        kode_sub_matkul: "nilai1_3",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 1,               //4
        deskripsi: "Pengertian Pendapat dan Pengalaman Sendiri",
        kode_sub_matkul: "nilai1_4",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 2,               //5
        deskripsi: "Pendidikan Formal",
        kode_sub_matkul: "nilai2_1",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 2,               //6
        deskripsi: "Pendidikan dan Pelatihan Teknik (>=5)",
        kode_sub_matkul: "nilai2_2",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 2,               //7
        deskripsi: "Pengalaman Praktik Keinsinyuran",
        kode_sub_matkul: "nilai2_3",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 3,               //8
        deskripsi: "Pendidikan/Pelatihan Manajemen dan bidang Lainnya (>5)",
        kode_sub_matkul: "nilai3_1",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 3,               //9
        deskripsi: "Pengalaman Praktik Keinsinyuran",
        kode_sub_matkul: "nilai3_2",
        is_sub_sub_matkul: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 4,               //10
        deskripsi: "Pengalaman Praktik Keinsinyuran (lembaga formal dan non-formal)",
        kode_sub_matkul: "nilai4_1",
        is_sub_sub_matkul: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 5,               //11
        deskripsi: "Sudi Kasus Keinsinyuran",
        kode_sub_matkul: "nilai5_1",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 5,               //12
        deskripsi: "Memberi pelayanan kepada masyarakat bidang keinsinyuran (>3 kegiatan)",
        kode_sub_matkul: "nilai5_2",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 5,               //13
        deskripsi: "Menunjang pelaksanaan tugas umum pemerintah dan pembangunan",
        kode_sub_matkul: "nilai5_3",
        is_sub_sub_matkul: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        matkul_id: 6,               //14
        deskripsi: "Pengalaman Seminar, Workshop, Diskusi Sebagai pembicara maupun peserta",
        kode_sub_matkul: "nilai6_1",
        is_sub_sub_matkul: false,
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
    await queryInterface.bulkDelete('sub_matkuls', null, {});
  }
};