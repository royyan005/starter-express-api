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
    await queryInterface.bulkInsert('klasifikasi_sub_matkuls', [{
        sub_matkul_id: 1, //1
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "Setingkat Kab/Kota dan Provinsi",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 1, //2
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "Setingkat kab/kota, Provinsi dan Nasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 1, //3
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Setingkat kab/kota, Provinsi, Nasional dan Internasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 2, //4
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "Penghargaan lokal/internal",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 2, //5
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "Penghargaan lokal, provinsi dan nasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 2, //6
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Penghargaan lokal, provinsi, nasional dan Internasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 3, //5
        nilai_min: 71,
        nilai_max: 80.9,
        deskripsi: "Referensi Sejawat/Atasan",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 3, //6
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Referensi Sejawat/Atasan, External dan IP",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 4, //7
        nilai_min: 71,
        nilai_max: 80.9,
        deskripsi: "Pengalaman Umum/biasa",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 4, //8
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Pengalaman komprehensif (merujuk waktu dan lokasi)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 5, //9
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "S1 dan S2 non-Teknik Keinsinyuran",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 5, //10
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "S2 Teknik Keinsinyuran dan S3 non-Teknik",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 5, //11
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "S3 Teknik",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 6, //12
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "5 Lokal/nasional (1-2 bidang keahlian)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 6, //13
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "> 5 Nasional/Regional (beragam)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 6, //14
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "> 10 Nasional/Regional, dan Internasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 7, //15
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "Pengalaman < 7 tahun ",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 7, //16
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "Pengalaman 7 - 15 tahun & beragam",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 7, //17
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Pengalaman > 15 tahun, beragam dan tingkat kesulitan kompleks",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 8, //18
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "5 Lokal/nasional (1-2 bidang keahlian)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 8, //19
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "> 5 Nasional/Regional (beragam)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 8, //20
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "> 10 Nasional/Regional, dan Internasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 11, //21
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "pengalaman sampai dgn 7 thn (lokal/APBD)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 11, //22
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "pengal 7-15 thn (APBD/APBN)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 11, //23
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "pengalaman > 15 thn (APBN/ADB/WB/JO)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 12, //24
        nilai_min: 70,
        nilai_max: 74.9,
        deskripsi: "masyarakat lokal/setempat",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 12, //25
        nilai_min: 75,
        nilai_max: 80.9,
        deskripsi: "masyarakat lbh luas (kecamatan)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 12, //26
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "CSR dgn cakupan besar/multistakeholder",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //27
        nilai_min: 71,
        nilai_max: 80.9,
        deskripsi: "s/d kadis/PPK/Project Manager (kab/kota)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //28
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "kabiro/asisten/kadis(provinsi)/PPK/project manager/sekda/Nasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //29
        nilai_min: 71,
        nilai_max: 75.9,
        deskripsi: "Dosen/peneliti/lembaga litbang: pernah menjadi instruktur/bimbing praktek setingkat SMA dan instruktur/bimbing KP Mhs",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //30
        nilai_min: 76,
        nilai_max: 80.9,
        deskripsi: "Dosen/peneliti/lembaga litbang: invited speaker/reviewer jurnal tingkat nasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //31
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Dosen/peneliti/lembaga litbang: invited speaker pada konferensi internasional (DN/LN), dosen tamu di PT/PT LN/reviewer jurnal internasional",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //32
        nilai_min: 71,
        nilai_max: 80.9,
        deskripsi: "Dosen/peneliti/lembaga litbang: Sebagai saksi ahli krang dari 3 kali",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 13, //33
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Dosen/peneliti/lembaga litbang: Sebagai saksi ahli (min 3 kali)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 14, //34
        nilai_min: 71,
        nilai_max: 75.9,
        deskripsi: "Lokal/kalangan sendiri/internal(>= 5 kegiatan)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 14, //35
        nilai_min: 76,
        nilai_max: 80.9,
        deskripsi: "Nasional(>= 5 kegiatan)",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 14, //35
        nilai_min: 76,
        nilai_max: 80.9,
        deskripsi: "Nasional dan Internasional (DN) =5 kali",
        kode_klasifikasi: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sub_matkul_id: 14, //36
        nilai_min: 81,
        nilai_max: 100,
        deskripsi: "Nasional dan Internasional (DN) >5 kali",
        kode_klasifikasi: "",
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
    await queryInterface.bulkDelete('klasifikasi_sub_matkuls', null, {});
  }
};