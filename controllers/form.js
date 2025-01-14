const {
    nilai_matkuls,
    nilai_sub_matkuls,
    nilai_sub_sub_matkuls,
    users,
    mahasiswas,
    pembimbings,
    matkuls,
    sub_matkuls,
    sub_sub_matkuls
} = require("../models")

const {
    HurufMutu
} = require("../helpers/helper");
const mahasiswa = require("./mahasiswa");

module.exports = {
    // BACA SEMUA NILAI DARI 1 MAHASISWA
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
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing/penguji not found!'
                });
            }
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                }
            });
            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!'
                });
            }
            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user.id,
                    mahasiswa_id: mahasiswa.id
                }
            })
            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing/penguji not found!'
                });
            }
            let nilai_matkul;
            let nilai_sub_matkul;
            let nilai_sub_sub_matkul;
            let sub_matkul;
            let sub_sub_matkul;
            let i = 0;
            let data = {
                nama_pembimbing: user.full_name,
                role: pembimbing.jenis_role,
                nama_mahasiswa: mahasiswa.full_name,
                nilai: []
            };
            let message = {
                matkul:[],
                sub:[],
                sub_sub:[]
            }
            let eligible = true
            while (matkul[i]) {
                nilai_matkul = await nilai_matkuls.findOne({
                    where: {
                        matkul_id: matkul[i].id,
                        mahasiswa_id: mahasiswa_id,
                        pembimbing_id: pembimbing.id
                    }
                })
                if (!nilai_matkul) {
                    message.matkul[i] = {
                        msg: `nilai-nilai pada sub/sub-sub matkul pada matkul "${matkul[i].deskripsi}" belum diinputkan!`
                    }
                    eligible = false
                    data.nilai[i] = {
                        message: message.matkul[i].msg
                    };
                    i++
                    return res.status(400).json({
                        status: false,
                        message: "Ada nilai yang belum diinputkan"
                    })
                }
                // console.log(eligible);
                data.nilai[i] = {
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
                console.log(matkul[i].id);
                let j = 0;
                while (sub_matkul[j]) {
                    console.log(eligible);
                    nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                        where: {
                            sub_matkul_id: sub_matkul[j].id,
                            nilai_matkul_id: nilai_matkul.id
                        }
                    })
                    if (!nilai_sub_matkul) {
                        message.sub[j] = {
                            msg: `nilai pada sub matkul/sub-sub matkul pada sub matkul "${sub_matkul[j].deskripsi}" belum diinputkan!`
                        }
                        eligible = false
                        data.nilai[i].sub[j] = {
                            message: message.sub[j].msg
                        }
                        j++
                        return res.status(400).json({
                            status: false,
                            message: "Ada nilai yang belum diinputkan"
                        })
                    }
                    
                    data.nilai[i].sub[j] = {
                        kode: sub_matkul[j].kode_sub_matkul,
                        nama_sub_matkul: sub_matkul[j].deskripsi,
                        nilai_sub_matkul: nilai_sub_matkul.nilai,
                    }
                    if (sub_matkul[j].is_sub_sub_matkul == true) {
                        data.nilai[i].sub[j] = {
                            kode: sub_matkul[j].kode_sub_matkul,
                            nama_sub_matkul: sub_matkul[j].deskripsi,
                            nilai_sub_matkul: nilai_sub_matkul.nilai,
                            sub_sub: []
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
                            if (!nilai_sub_sub_matkul) {
                                message.sub[k] = {
                                    msg: `nilai pada sub sub matkul "${sub_sub_matkul[k].deskripsi}" belum diinputkan!`
                                }
                                eligible = false
                                data.nilai[i].sub[j].sub[k] = {
                                    message: message.sub[k].msg
                                }
                                k++
                                return res.status(400).json({
                                    status: false,
                                    message: "Ada nilai yang belum diinputkan"
                                })
                            }
                            data.nilai[i].sub[j].sub_sub[k] = {
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
            if (!eligible) {
                return res.status(400).json({
                    status: false,
                    data: data
                })
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

    // FORM INPUT NILAI
    postNilai: async (req, res, next) => {
        const user_id = req.idUser
        const {
            mahasiswa_id
        } = req.params
        const {
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
            if(!nilai1_1 || !nilai1_2 || !nilai1_3 || !nilai1_4 || !nilai2_1 || !nilai2_2 || !nilai2_3 || !nilai3_1 || !nilai3_2_1 || !nilai3_2_2 || !nilai3_2_3 || !nilai3_2_4 || !nilai4_1_1 || !nilai4_1_2 || !nilai4_1_3 || !nilai4_1_4 || !nilai5_1 || !nilai5_2 || !nilai5_3 || !nilai6_1){
                return res.status(400).json({
                    status: false,
                    message: 'nilai tidak boleh kosong!'
                })
            }
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                }
            })

            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'Mahasiswa not found',
                });
            }
            let user = await users.findOne({
                where: {
                    id: user_id,
                }
            })

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user not found',
                });
            }

            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user.id,
                    mahasiswa_id: mahasiswa.id
                }
            })

            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'User tidak ada/tidak berhak menginput nilai!',
                });
            }

            let formExist = await nilai_matkuls.findAll({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa.id
                }
            })

            if (formExist[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'form already exist!',
                });
            }

            // MATKUL 1


            let matkul1 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai1"
                }
            });

            let nilai_matkul1 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul1.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul1_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_1"
                }
            })

            let nilai_sub_matkul1_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul1_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_2"
                }
            })

            let nilai_sub_matkul1_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_2,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul1_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_3"
                }
            })

            let nilai_sub_matkul1_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_3,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul1_4 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_4"
                }
            })

            let nilai_sub_matkul1_4 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul1_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul1.id,
                nilai: nilai1_4,
                createdBy: req.username,
                updatedBy: req.username
            })

            let avg_nilai_matkul1 = (nilai1_1 + nilai1_2 + nilai1_3 + nilai1_4) / 4;
            let huruf_mutu_matkul1 = HurufMutu(avg_nilai_matkul1);

            let updated_nilai_matkul1 = await nilai_matkul1.update({
                average: avg_nilai_matkul1,
                huruf_mutu: huruf_mutu_matkul1,
                updatedBy: req.username
            })

            // MATKUL 2

            let matkul2 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai2"
                }
            });

            let nilai_matkul2 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul2.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul2_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_1"
                }
            })

            let nilai_sub_matkul2_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul2_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_2"
                }
            })

            let nilai_sub_matkul2_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_2,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul2_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_3"
                }
            })

            let nilai_sub_matkul2_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul2_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul2.id,
                nilai: nilai2_3,
                createdBy: req.username,
                updatedBy: req.username
            })

            let avg_nilai_matkul2 = (nilai2_1 + nilai2_2 + nilai2_3) / 3;
            let huruf_mutu_matkul2 = HurufMutu(avg_nilai_matkul2);

            let updated_nilai_matkul2 = await nilai_matkul2.update({
                average: avg_nilai_matkul2,
                huruf_mutu: huruf_mutu_matkul2,
                updatedBy: req.username
            })

            // MATKUL 3

            let matkul3 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai3"
                }
            });

            let nilai_matkul3 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul3.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul3_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai3_1"
                }
            })

            let nilai_sub_matkul3_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul3_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul3.id,
                nilai: nilai3_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul3_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai3_2"
                }
            })

            let nilai_sub_matkul3_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul3_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul3.id,
                nilai: 0,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_1"
                }
            })

            let nilai_sub_sub_matkul3_2_1 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_2"
                }
            })

            let nilai_sub_sub_matkul3_2_2 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_2,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_3"
                }
            })

            let nilai_sub_sub_matkul3_2_3 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_3,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_4"
                }
            })

            let nilai_sub_sub_matkul3_2_4 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul3_2_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul3_2.id,
                nilai: nilai3_2_4,
                createdBy: req.username,
                updatedBy: req.username
            })

            let avg_nilai_sub_matkul3_2 = (nilai3_2_1 + nilai3_2_2 + nilai3_2_3 + nilai3_2_4) / 4;
            let updated_nilai_sub_matkul3_2 = await nilai_sub_matkul3_2.update({
                nilai: avg_nilai_sub_matkul3_2,
                updatedBy: req.username
            })

            let avg_nilai_matkul3 = (nilai3_1 + avg_nilai_sub_matkul3_2) / 2;
            let huruf_mutu_matkul3 = HurufMutu(avg_nilai_matkul3);

            let updated_nilai_matkul3 = await nilai_matkul3.update({
                average: avg_nilai_matkul3,
                huruf_mutu: huruf_mutu_matkul3,
                updatedBy: req.username
            })

            // MATKUL 4

            let matkul4 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai4"
                }
            });

            let nilai_matkul4 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul4.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul4_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai4_1"
                }
            })

            let nilai_sub_matkul4_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul4_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul4.id,
                nilai: 0,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_1"
                }
            })

            let nilai_sub_sub_matkul4_1_1 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_2"
                }
            })

            let nilai_sub_sub_matkul4_1_2 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_2,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_3"
                }
            })

            let nilai_sub_sub_matkul4_1_3 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_3,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_4"
                }
            })

            let nilai_sub_sub_matkul4_1_4 = await nilai_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul4_1_4.id,
                mahasiswa_id: mahasiswa_id,
                nilai_sub_matkul_id: nilai_sub_matkul4_1.id,
                nilai: nilai4_1_4,
                createdBy: req.username,
                updatedBy: req.username
            })

            let avg_nilai_sub_matkul4_1 = (nilai4_1_1 + nilai4_1_2 + nilai4_1_3 + nilai4_1_4) / 4;
            let updated_nilai_sub_matkul4_1 = await nilai_sub_matkul4_1.update({
                nilai: avg_nilai_sub_matkul4_1,
                updatedBy: req.username
            })

            let huruf_mutu_matkul4 = HurufMutu(avg_nilai_sub_matkul4_1);

            let updated_nilai_matkul4 = await nilai_matkul4.update({
                average: avg_nilai_sub_matkul4_1,
                huruf_mutu: huruf_mutu_matkul4,
                updatedBy: req.username
            })

            // MATKUL 5

            let matkul5 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai5"
                }
            });

            let nilai_matkul5 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul5.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul5_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_1"
                }
            })

            let nilai_sub_matkul5_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul5_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_2"
                }
            })

            let nilai_sub_matkul5_2 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_2.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_2,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul5_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_3"
                }
            })

            let nilai_sub_matkul5_3 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul5_3.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul5.id,
                nilai: nilai5_3,
                createdBy: req.username,
                updatedBy: req.username
            })

            let avg_nilai_matkul5 = (nilai5_1 + nilai5_2 + nilai5_3) / 3;
            let huruf_mutu_matkul5 = HurufMutu(avg_nilai_matkul5);

            let updated_nilai_matkul5 = await nilai_matkul5.update({
                average: avg_nilai_matkul5,
                huruf_mutu: huruf_mutu_matkul5,
                updatedBy: req.username
            })

            // MATKUL 6

            let matkul6 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai6"
                }
            });

            let nilai_matkul6 = await nilai_matkuls.create({
                average: 0,
                huruf_mutu: "E",
                pembimbing_id: pembimbing.id,
                mahasiswa_id: mahasiswa_id,
                matkul_id: matkul6.id,
                createdBy: req.username,
                updatedBy: req.username
            })

            let sub_matkul6_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai6_1"
                }
            })

            let nilai_sub_matkul6_1 = await nilai_sub_matkuls.create({
                sub_matkul_id: sub_matkul6_1.id,
                mahasiswa_id: mahasiswa_id,
                nilai_matkul_id: nilai_matkul6.id,
                nilai: nilai6_1,
                createdBy: req.username,
                updatedBy: req.username
            })

            let huruf_mutu_matkul6 = HurufMutu(nilai6_1);

            let updated_nilai_matkul6 = await nilai_matkul6.update({
                average: nilai6_1,
                huruf_mutu: huruf_mutu_matkul6,
                updatedBy: req.username
            })

            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: {
                    nama_pembimbing: user.full_name, //CAREFULL BISA JADI ADMIN YANG LOGIN
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

    // FORM UPDATE NILAI
    updateNilai: async (req, res, next) => {
        const {
            mahasiswa_id
        } = req.params
        const user_id = req.idUser
        const {
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
                    message: 'User tidak berhak mengubah nilai!',
                });
            }

            // MATKUL 1

            let matkul1 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai1"
                }
            });

            let nilai_matkul1 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul1.id
                }

            })

            let sub_matkul1_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_1"
                }
            })

            let nilai_sub_matkul1_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul1_1.id,
                    nilai_matkul_id: nilai_matkul1.id,
                }
            })

            await nilai_sub_matkul1_1.update({
                nilai: nilai1_1,
                updatedBy: req.username
            })

            let sub_matkul1_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_2"
                }
            })

            let nilai_sub_matkul1_2 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul1_2.id,
                    nilai_matkul_id: nilai_matkul1.id,
                }
            })

            await nilai_sub_matkul1_2.update({
                nilai: nilai1_2,
                updatedBy: req.username
            })

            let sub_matkul1_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_3"
                }
            })

            let nilai_sub_matkul1_3 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul1_3.id,
                    nilai_matkul_id: nilai_matkul1.id,
                }
            })

            await nilai_sub_matkul1_3.update({
                nilai: nilai1_3,
                updatedBy: req.username
            })

            let sub_matkul1_4 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai1_4"
                }
            })

            let nilai_sub_matkul1_4 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul1_4.id,
                    nilai_matkul_id: nilai_matkul1.id,
                }
            })

            await nilai_sub_matkul1_4.update({
                nilai: nilai1_4,
                updatedBy: req.username
            })

            let avg_nilai_matkul1 = (nilai1_1 + nilai1_2 + nilai1_3 + nilai1_4) / 4;
            let huruf_mutu_matkul1 = HurufMutu(avg_nilai_matkul1);

            let updated_nilai_matkul1 = await nilai_matkul1.update({
                average: avg_nilai_matkul1,
                huruf_mutu: huruf_mutu_matkul1,
                updatedBy: req.username
            })

            // MATKUL 2

            let matkul2 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai2"
                }
            });

            let nilai_matkul2 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul2.id
                }
            })

            let sub_matkul2_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_1"
                }
            })

            let nilai_sub_matkul2_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul2_1.id,
                    nilai_matkul_id: nilai_matkul2.id
                }
            })

            await nilai_sub_matkul2_1.update({
                nilai: nilai2_1,
                updatedBy: req.username
            })

            let sub_matkul2_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_2"
                }
            })

            let nilai_sub_matkul2_2 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul2_2.id,
                    nilai_matkul_id: nilai_matkul2.id
                }
            })

            await nilai_sub_matkul2_2.update({
                nilai: nilai2_2,
                updatedBy: req.username
            })

            let sub_matkul2_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai2_3"
                }
            })

            let nilai_sub_matkul2_3 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul2_3.id,
                    nilai_matkul_id: nilai_matkul2.id
                }
            })

            await nilai_sub_matkul2_3.update({
                nilai: nilai2_3,
                updatedBy: req.username
            })

            let avg_nilai_matkul2 = (nilai2_1 + nilai2_2 + nilai2_3) / 3;
            let huruf_mutu_matkul2 = HurufMutu(avg_nilai_matkul2);

            let updated_nilai_matkul2 = await nilai_matkul2.update({
                average: avg_nilai_matkul2,
                huruf_mutu: huruf_mutu_matkul2,
                updatedBy: req.username
            })

            // MATKUL 3

            let matkul3 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai3"
                }
            });

            let nilai_matkul3 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul3.id
                }

            })

            let sub_matkul3_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai3_1"
                }
            })

            let nilai_sub_matkul3_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul3_1.id,
                    nilai_matkul_id: nilai_matkul3.id
                }
            })

            await nilai_sub_matkul3_1.update({
                nilai: nilai3_1,
                updatedBy: req.username
            })

            let sub_matkul3_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai3_2"
                }
            })

            let nilai_sub_matkul3_2 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul3_2.id,
                    nilai_matkul_id: nilai_matkul3.id
                }
            })

            let sub_sub_matkul3_2_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_1"
                }
            })

            let nilai_sub_sub_matkul3_2_1 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul3_2_1.id,
                    nilai_sub_matkul_id: nilai_sub_matkul3_2.id
                }
            })

            await nilai_sub_sub_matkul3_2_1.update({
                nilai: nilai3_2_1,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_2"
                }
            })

            let nilai_sub_sub_matkul3_2_2 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul3_2_2.id,
                    nilai_sub_matkul_id: nilai_sub_matkul3_2.id
                }
            })

            await nilai_sub_sub_matkul3_2_2.update({
                nilai: nilai3_2_2,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_3"
                }
            })

            let nilai_sub_sub_matkul3_2_3 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul3_2_3.id,
                    nilai_sub_matkul_id: nilai_sub_matkul3_2.id
                }
            })

            await nilai_sub_sub_matkul3_2_3.update({
                nilai: nilai3_2_3,
                updatedBy: req.username
            })

            let sub_sub_matkul3_2_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai3_2_4"
                }
            })

            let nilai_sub_sub_matkul3_2_4 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul3_2_4.id,
                    nilai_sub_matkul_id: nilai_sub_matkul3_2.id
                }
            })

            await nilai_sub_sub_matkul3_2_3.update({
                nilai: nilai3_2_4,
                updatedBy: req.username
            })

            let avg_nilai_sub_matkul3_2 = (nilai3_2_1 + nilai3_2_2 + nilai3_2_3 + nilai3_2_4) / 4;
            let updated_nilai_sub_matkul3_2 = await nilai_sub_matkul3_2.update({
                nilai: avg_nilai_sub_matkul3_2,
                updatedBy: req.username
            })

            let avg_nilai_matkul3 = (nilai3_1 + avg_nilai_sub_matkul3_2) / 2;
            let huruf_mutu_matkul3 = HurufMutu(avg_nilai_matkul3);

            let updated_nilai_matkul3 = await nilai_matkul3.update({
                average: avg_nilai_matkul3,
                huruf_mutu: huruf_mutu_matkul3,
                updatedBy: req.username
            })

            // MATKUL 4

            let matkul4 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai4"
                }
            });

            let nilai_matkul4 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul4.id
                }
            })

            let sub_matkul4_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai4_1"
                }
            })

            let nilai_sub_matkul4_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul4_1.id,
                    nilai_matkul_id: nilai_matkul4.id
                }
            })

            let sub_sub_matkul4_1_1 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_1"
                }
            })

            let nilai_sub_sub_matkul4_1_1 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul4_1_1.id,
                    nilai_sub_matkul_id: nilai_sub_matkul4_1.id
                }
            })

            await nilai_sub_sub_matkul4_1_1.update({
                nilai: nilai4_1_1,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_2 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_2"
                }
            })

            let nilai_sub_sub_matkul4_1_2 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul4_1_2.id,
                    nilai_sub_matkul_id: nilai_sub_matkul4_1.id
                }
            })

            await nilai_sub_sub_matkul4_1_2.update({
                nilai: nilai4_1_2,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_3 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_3"
                }
            })

            let nilai_sub_sub_matkul4_1_3 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul4_1_3.id,
                    nilai_sub_matkul_id: nilai_sub_matkul4_1.id
                }
            })

            await nilai_sub_sub_matkul4_1_3.update({
                nilai: nilai4_1_3,
                updatedBy: req.username
            })

            let sub_sub_matkul4_1_4 = await sub_sub_matkuls.findOne({
                where: {
                    kode_sub_sub_matkul: "nilai4_1_4"
                }
            })

            let nilai_sub_sub_matkul4_1_4 = await nilai_sub_sub_matkuls.findOne({
                where: {
                    sub_sub_matkul_id: sub_sub_matkul4_1_4.id,
                    nilai_sub_matkul_id: nilai_sub_matkul4_1.id
                }
            })

            await nilai_sub_sub_matkul4_1_4.update({
                nilai: nilai4_1_4,
                updatedBy: req.username
            })

            let avg_nilai_sub_matkul4_1 = (nilai4_1_1 + nilai4_1_2 + nilai4_1_3 + nilai4_1_4) / 4;
            let updated_nilai_sub_matkul4_1 = await nilai_sub_matkul4_1.update({
                nilai: avg_nilai_sub_matkul4_1,
                updatedBy: req.username
            })

            let huruf_mutu_matkul4 = HurufMutu(avg_nilai_sub_matkul4_1);

            let updated_nilai_matkul4 = await nilai_matkul4.update({
                average: avg_nilai_sub_matkul4_1,
                huruf_mutu: huruf_mutu_matkul4,
                updatedBy: req.username
            })

            // MATKUL 5

            let matkul5 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai5"
                }
            });

            let nilai_matkul5 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul5.id
                }
            })

            let sub_matkul5_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_1"
                }
            })

            let nilai_sub_matkul5_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul5_1.id,
                    nilai_matkul_id: nilai_matkul5.id
                }
            })

            await nilai_sub_matkul5_1.update({
                nilai: nilai5_1,
                updatedBy: req.username
            })

            let sub_matkul5_2 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_2"
                }
            })

            let nilai_sub_matkul5_2 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul5_2.id,
                    nilai_matkul_id: nilai_matkul5.id
                }
            })

            await nilai_sub_matkul5_2.update({
                nilai: nilai5_2,
                updatedBy: req.username
            })

            let sub_matkul5_3 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai5_3"
                }
            })

            let nilai_sub_matkul5_3 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul5_3.id,
                    nilai_matkul_id: nilai_matkul5.id
                }
            })

            await nilai_sub_matkul5_3.update({
                nilai: nilai5_3,
                updatedBy: req.username
            })

            let avg_nilai_matkul5 = (nilai5_1 + nilai5_2 + nilai5_3) / 3;
            let huruf_mutu_matkul5 = HurufMutu(avg_nilai_matkul5);

            let updated_nilai_matkul5 = await nilai_matkul5.update({
                average: avg_nilai_matkul5,
                huruf_mutu: huruf_mutu_matkul5,
                updatedBy: req.username
            })

            // MATKUL 6

            let matkul6 = await matkuls.findOne({
                where: {
                    kode_matkul: "nilai6"
                }
            });

            let nilai_matkul6 = await nilai_matkuls.findOne({
                where: {
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul6.id
                }
            })

            let sub_matkul6_1 = await sub_matkuls.findOne({
                where: {
                    kode_sub_matkul: "nilai6_1"
                }
            })

            let nilai_sub_matkul6_1 = await nilai_sub_matkuls.findOne({
                where: {
                    sub_matkul_id: sub_matkul6_1.id,
                    nilai_matkul_id: nilai_matkul6.id
                }
            })

            await nilai_sub_matkul6_1.update({
                nilai: nilai6_1,
                updatedBy: req.username
            })

            let huruf_mutu_matkul6 = HurufMutu(nilai6_1);

            let updated_nilai_matkul6 = await nilai_matkul6.update({
                average: nilai6_1,
                huruf_mutu: huruf_mutu_matkul6,
                updatedBy: req.username
            })

            return res.status(200).json({
                status: true,
                message: 'update data success!',
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
    // postNilaiMatkul1: async (req, res, next) => {
    //     const {
    //         mahasiswa_id
    //     } = req.params
    //     const {
    //         user_id
    //     } = req.body
    //     try {
    //         let matkul1 = await matkuls.findOne({
    //             where: {
    //                 kode_matkul: "nilai1"
    //             }
    //         });

    //         if (!matkul1) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'matkul not found',

    //             });
    //         }

    //         let user = await users.findOne({
    //             where: {
    //                 id: user_id
    //             }
    //         });

    //         if (!user) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'user not found',

    //             });
    //         }

    //         let mahasiswa = await mahasiswas.findOne({
    //             where: {
    //                 id: mahasiswa_id
    //             }
    //         });

    //         if (!mahasiswa) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'mahasiswa not found',

    //             });
    //         }

    //         let pembimbing = await pembimbings.findOne({
    //             where: {
    //                 user_id: user.id,
    //                 mahasiswa_id: mahasiswa.id
    //             }
    //         })

    //         if (!pembimbing) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'pembimbing not found',

    //             });
    //         }

    //         let nilaiExist = nilai_matkuls.findOne({
    //             where: {
    //                 pembimbing_id: pembimbing.id,
    //                 mahasiswa_id: mahasiswa.id,
    //                 matkul_id: matkul1.id
    //             }
    //         })

    //         let nilai_matkul1 = nilai_matkuls.create({
    //             average: 0,
    //             huruf_mutu: "E",
    //             pembimbing_id: pembimbing.id,
    //             mahasiswa_id: mahasiswa.id,
    //             matkul_id: matkul1.id,
    //             createdBy: "",
    //             updatedBy: req.username
    //         })



    //         let nilai_sub_matkul1 = nilai_sub_matkuls.bulkCreate([{

    //         }])

    //         return res.status(200).json({
    //             status: true,
    //             message: 'get all data success!',
    //             data: data
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },

}