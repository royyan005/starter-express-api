const {
    nilai_matkuls,
    nilai_sub_matkuls,
    nilai_sub_sub_matkuls,
    users,
    mahasiswas,
    pembimbings,
    // total_nilai_matkuls,
    matkuls,
    sub_matkuls,
    sub_sub_matkuls
} = require("../models")

const {
    HurufMutu
} = require("../helpers/helper");
const mahasiswa = require("./mahasiswa");

module.exports = {
    getAllNilaiByMahasiswa: async (req, res, next) => {
        const {
            mahasiswa_id,
            user_id
        } = req.params
        try {
            let matkul = await matkuls.findAll();

            let user = await users.findOne({
                where: {
                    id: user_id
                }
            });
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                }
            });
            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user.id,
                    mahasiswa_id: mahasiswa.id
                }
            })
            let nilai_matkul;
            let nilai_sub_matkul;
            let nilai_sub_sub_matkul;
            let sub_matkul;
            let sub_sub_matkul;
            let i = 0;
            let nilai = [];
            let data = {
                nama_pembimbing: user.full_name,
                role: pembimbing.jenis_role,
                nama_mahasiswa: mahasiswa.full_name,
                nilai
            };
            while (matkul[i]) {
                nilai_matkul = await nilai_matkuls.findOne({
                    where: {
                        matkul_id: matkul[i].id,
                        mahasiswa_id: mahasiswa_id,
                        pembimbing_id: user_id
                    }
                })
                nilai[i] = {
                    kode: matkul[i].kode_matkul,
                    nama_matkul: matkul[i].deskripsi,
                    nilai_matkul: nilai_matkul.average,
                    sub: []
                };
                sub_matkul = await sub_matkuls.findAll({
                    where: {
                        matkul_id: matkul[i].id
                    }
                });
                let j = 0;
                while (sub_matkul[j]) {
                    nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                        where: {
                            sub_matkul_id: sub_matkul[j].id,
                            nilai_matkul_id: nilai_matkul.id,
                            mahasiswa_id: mahasiswa_id
                        }
                    })
                    nilai[i].sub[j] = {
                        kode: sub_matkul[j].kode_sub_matkul,
                        nama_sub_matkul: sub_matkul[j].deskripsi,
                        nilai_sub_matkul: nilai_sub_matkul.nilai
                    }
                    if (sub_matkul[j].is_sub_sub_matkul == true) {
                        nilai[i].sub[j] = {
                            kode: sub_matkul[j].kode_sub_matkul,
                            nama_sub_matkul: sub_matkul[j].deskripsi,
                            nilai_sub_matkul: nilai_sub_matkul.nilai,
                            sub: []
                        }
                        sub_sub_matkul = await sub_sub_matkuls.findAll({
                            where: {
                                sub_matkul_id: sub_matkul[j].id
                            }
                        });
                        let k = 0;
                        while (sub_sub_matkul[k]) {
                            nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findOne({
                                where: {
                                    sub_sub_matkul_id: sub_sub_matkul[k].id,
                                    nilai_sub_matkul_id: nilai_sub_matkul.id
                                }
                            })
                            nilai[i].sub[j].sub[k] = {
                                kode: sub_sub_matkul[k].kode_sub_sub_matkul,
                                nama_sub_sub_matkul: sub_sub_matkul[k].deskripsi,
                                nilai_sub_sub_matkul: nilai_sub_sub_matkul.nilai
                            }
                            k++;
                        }
                    }
                    j++;
                }
                i++;
            }

            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: data
            });
        } catch (err) {
            next(err)
        }
    },
    // getById: async (req, res, next) => {
    //     const {
    //         id
    //     } = req.params;
    //     try {
    //         let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
    //             where: {
    //                 id: id
    //             }
    //         });
    //         if (!klasifikasi_sub_matkul) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'data not found!',
    //             })
    //         }
    //         return res.status(200).json({
    //             status: true,
    //             message: 'get data success!',
    //             data: klasifikasi_sub_matkul
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },
    postNilai: async (req, res, next) => {
        const {
            mahasiswa_id,
            user_id,
            nilai1_1,
            nilai1_2,
            nilai1_3,
            nilai1_4,
            nilai2_1,
            nilai2_2,
            nilai2_3,
            nilai3_1,
            nilai3_2_1,
            nilai3_2_2,
            nilai3_2_3,
            nilai3_2_4,
            nilai4_1_1,
            nilai4_1_2,
            nilai4_1_3,
            nilai4_1_4,
            nilai5_1,
            nilai5_2,
            nilai5_3,
            nilai6_1
        } = req.body;
        try {
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                }
            })
            let user = await users.findOne({
                where: {
                    id: user_id,

                }
            })
            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user.id,
                    mahasiswa_id: mahasiswa.id
                }
            })

            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'User tidak berhak menginput nilai!',
                });
            }

            // MATKUL 1

            let matkul1 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul1"
                }
            });

            let nilai_matkul1 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul1.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul1_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul1_1"
                }
            })

            let nilai_sub_matkul1_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul1_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul1_2"
                }
            })

            let nilai_sub_matkul1_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_2,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul1_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul1_3"
                }
            })

            let nilai_sub_matkul1_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_3,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul1_4 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul1_4"
                }
            })

            let nilai_sub_matkul1_4 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_4,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_matkul1 = (nilai1_1 + nilai1_2 + nilai1_3 + nilai1_4) / 4;
            let huruf_mutu_matkul1 = HurufMutu(avg_nilai_matkul1);

            let updated_nilai_matkul1 = await nilai_matkul1.update({
                average: avg_nilai_matkul1,
                huruf_mutu: huruf_mutu_matkul1,
                createdBy: "",
                updatedBy: ""
            })

            // MATKUL 2

            let matkul2 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul2"
                }
            });

            let nilai_matkul2 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul2.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul2_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul2_1"
                }
            })

            let nilai_sub_matkul2_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul2_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul2_2"
                }
            })

            let nilai_sub_matkul2_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_2,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul2_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul2_3"
                }
            })

            let nilai_sub_matkul2_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_3,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_matkul2 = (nilai2_1 + nilai2_2 + nilai2_3) / 3;
            let huruf_mutu_matkul2 = HurufMutu(avg_nilai_matkul2);

            let updated_nilai_matkul2 = await nilai_matkul2.update({
                average: avg_nilai_matkul2,
                huruf_mutu: huruf_mutu_matkul2,
                createdBy: "",
                updatedBy: ""
            })

            // MATKUL 3

            let matkul3 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul3"
                }
            });

            let nilai_matkul3 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul3.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul3_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul3_1"
                }
            })

            let nilai_sub_matkul3_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul3_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul3.id,
                nilai: nilai3_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul3_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul3_2"
                }
            })

            let nilai_sub_matkul3_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul3_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul3.id,
                nilai: 0,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul3_2_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul3_2_1"
                }
            })

            let nilai_sub_sub_matkul3_2_1 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul3_2_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul3_2_2"
                }
            })

            let nilai_sub_sub_matkul3_2_2 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_2,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul3_2_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul3_2_3"
                }
            })

            let nilai_sub_sub_matkul3_2_3 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_3,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul3_2_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul3_2_4"
                }
            })

            let nilai_sub_sub_matkul3_2_4 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_4,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_sub_matkul3_2 = (nilai3_2_1 + nilai3_2_2 + nilai3_2_3 + nilai3_2_4) / 4;
            let updated_nilai_sub_matkul3_2 = await nilai_sub_matkul3_2.update({
                nilai: avg_nilai_sub_matkul3_2,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_matkul3 = (nilai3_1 + avg_nilai_sub_matkul3_2) / 2;
            let huruf_mutu_matkul3 = HurufMutu(avg_nilai_matkul3);

            let updated_nilai_matkul3 = await nilai_matkul3.update({
                average: avg_nilai_matkul3,
                huruf_mutu: huruf_mutu_matkul3,
                createdBy: "",
                updatedBy: ""
            })

            // MATKUL 4

            let matkul4 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul4"
                }
            });

            let nilai_matkul4 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul4.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul4_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul4_1"
                }
            })

            let nilai_sub_matkul4_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul4_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul4.id,
                nilai: 0,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul4_1_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul4_1_1"
                }
            })

            let nilai_sub_sub_matkul4_1_1 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul4_1_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul4_1_2"
                }
            })

            let nilai_sub_sub_matkul4_1_2 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_2,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul4_1_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul4_1_3"
                }
            })

            let nilai_sub_sub_matkul4_1_3 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_3,
                createdBy: "",
                updatedBy: ""
            })

            let sub_sub_matkul4_1_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "subsubmatkul4_1_4"
                }
            })

            let nilai_sub_sub_matkul4_1_4 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_4,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_sub_matkul4_1 = (nilai4_1_1 + nilai4_1_2 + nilai4_1_3 + nilai4_1_4) / 4;
            let updated_nilai_sub_matkul4_1 = await nilai_sub_matkul4_1.update({
                nilai: avg_nilai_sub_matkul4_1,
                createdBy: "",
                updatedBy: ""
            })

            let huruf_mutu_matkul4 = HurufMutu(avg_nilai_sub_matkul4_1);

            let updated_nilai_matkul4 = await nilai_matkul4.update({
                average: avg_nilai_sub_matkul4_1,
                huruf_mutu: huruf_mutu_matkul4,
                createdBy: "",
                updatedBy: ""
            })

            // MATKUL 5

            let matkul5 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul5"
                }
            });

            let nilai_matkul5 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul5.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul5_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul5_1"
                }
            })

            let nilai_sub_matkul5_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_1,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul5_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul5_2"
                }
            })

            let nilai_sub_matkul5_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_2,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul5_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul5_3"
                }
            })

            let nilai_sub_matkul5_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_3,
                createdBy: "",
                updatedBy: ""
            })

            let avg_nilai_matkul5 = (nilai5_1 + nilai5_2 + nilai5_3) / 3;
            let huruf_mutu_matkul5 = HurufMutu(avg_nilai_matkul5);

            let updated_nilai_matkul5 = await nilai_matkul5.update({
                average: avg_nilai_matkul5,
                huruf_mutu: huruf_mutu_matkul5,
                createdBy: "",
                updatedBy: ""
            })

            // MATKUL 6

            let matkul6 = await matkuls.findOne({
                where: {
                    kode_matkul: "matkul6"
                }
            });

            let nilai_matkul6 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: user_id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul6.id,
                createdBy: "",
                updatedBy: ""
            })

            let sub_matkul6_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "submatkul6_1"
                }
            })

            let nilai_sub_matkul6_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul6_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul6.id,
                nilai: nilai6_1,
                createdBy: "",
                updatedBy: ""
            })

            let huruf_mutu_matkul6 = HurufMutu(nilai6_1);

            let updated_nilai_matkul6 = await nilai_matkul6.update({
                average: nilai6_1,
                huruf_mutu: huruf_mutu_matkul6,
                createdBy: "",
                updatedBy: ""
            })

            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: {
                    nama_pembimbing: user.full_name,
                    role_pembimbing: pembimbing.jenis_role,
                    nama_mahasiswa: mahasiswa.full_name,
                    npm_mahasiswa: mahasiswa.npm,
                    nilai: [{
                            nama_matkul: matkul1.deskripsi,
                            nilai: updated_nilai_matkul1
                        },
                        {
                            nama_matkul: matkul2.deskripsi,
                            nilai: updated_nilai_matkul2
                        },
                        {
                            nama_matkul: matkul3.deskripsi,
                            nilai: updated_nilai_matkul3
                        },
                        {
                            nama_matkul: matkul4.deskripsi,
                            nilai: updated_nilai_matkul4
                        },
                        {
                            nama_matkul: matkul5.deskripsi,
                            nilai: updated_nilai_matkul5
                        },
                        {
                            nama_matkul: matkul6.deskripsi,
                            nilai: updated_nilai_matkul6
                        }
                    ]
                }
            });
        } catch (err) {
            next(err)
        }
    },
    // update: async (req, res, next) => {
    //     const {
    //         id
    //     } = req.params
    //     const {
    //         sub_matkul_id,
    //         deskripsi,
    //         nilai_min,
    //         nilai_max,
    //         kode_klasifikasi,
    //         createdBy,
    //         updatedBy
    //     } = req.body;
    //     try {
    //         let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
    //             where: {
    //                 id: id
    //             }
    //         });

    //         if (!klasifikasi_sub_matkul) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'klasifikasi_sub_matkul not found!',
    //             });
    //         }

    //         let updated = await klasifikasi_sub_matkul.update({
    //             sub_matkul_id: sub_matkul_id,
    //             deskripsi: deskripsi,
    //             nilai_min: nilai_min,
    //             nilai_max: nilai_max,
    //             kode_klasifikasi: kode_klasifikasi,
    //             createdBy: createdBy,
    //             updatedBy: updatedBy
    //         });
    //         return res.status(200).json({
    //             status: true,
    //             message: 'update data success!',
    //             data: updated
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },
    // delete: async (req, res, next) => {
    //     const {
    //         id
    //     } = req.params
    //     try {
    //         let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
    //             where: {
    //                 id: id
    //             }
    //         });

    //         if (!klasifikasi_sub_matkul) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'klasifikasi_sub_matkul not found!',
    //             });
    //         }

    //         await klasifikasi_sub_matkul.destroy();
    //         return res.status(200).json({
    //             status: true,
    //             message: 'delete data success!',
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}