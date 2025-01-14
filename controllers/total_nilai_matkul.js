const {
    nilai_matkuls,
    pembimbings,
    mahasiswas,
    matkuls
} = require("../models")
const {
    HurufMutu,
    AngkaMutu,
    AngkaMutuAverage
} = require("../helpers/helper");
const {
    Op
} = require('sequelize');

module.exports = {
    // BUAT TOTAL NILAI UNTUK SEMUA MATKUL UNTUK 1 MAHASISWA
    // autoCreate: async (req, res, next) => {
    //     const {
    //         mahasiswa_id
    //     } = req.params
    //     try {
    //         let mahasiswa = await mahasiswas.findOne({
    //             where: {
    //                 id: mahasiswa_id
    //             }
    //         })
    //         let total_nilai_matkul = await total_nilai_matkuls.findOne({
    //             where: {
    //                 mahasiswa_id: mahasiswa_id
    //             }
    //         });

    //         if (total_nilai_matkul) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'data already exist!',
    //             });
    //         }

    //         let matkul = await matkuls.findAll();

    //         let output = {
    //             nama_mahasiswa: mahasiswa.full_name,
    //             npm: mahasiswa.npm,
    //             nilai: []
    //         }
    //         let i = 0;
    //         let total_sks = 0;
    //         let total_nilai_mutu = 0;
    //         let keterangan;
    //         let huruf_mutu, angka_mutu, nilai_mutu
    //         while (matkul[i]) {
    //             let nilai_matkul = await nilai_matkuls.findAll({
    //                 where: {
    //                     matkul_id: matkul[i].id,
    //                     mahasiswa_id: mahasiswa_id
    //                 }
    //             })
    //             let j = 0;
    //             let nilai_semua_dosen = 0;
    //             while (nilai_matkul[j]) {
    //                 let pembimbing = await pembimbings.findOne({
    //                     where:{
    //                         id: nilai_matkul[j].pembimbing_id
    //                     }
    //                 })

    //                 if(pembimbing.jenis_role=="pembimbing1"){
    //                     nilai_semua_dosen += (0.4*nilai_matkul[j].average);
    //                 } else {
    //                     nilai_semua_dosen += (0.3*nilai_matkul[j].average)
    //                 }
    //                 j++;
    //             }
    //             huruf_mutu = HurufMutu(nilai_semua_dosen)
    //             angka_mutu = AngkaMutu(huruf_mutu)
    //             nilai_mutu = angka_mutu * matkul[i].sks

    //             await total_nilai_matkuls.create({
    //                 average: nilai_semua_dosen,
    //                 huruf_mutu: huruf_mutu,
    //                 angka_mutu: angka_mutu,
    //                 nilai_mutu: nilai_mutu,
    //                 matkul_id: matkul[i].id,
    //                 mahasiswa_id: mahasiswa_id
    //             })


    //             total_sks += matkul[i].sks
    //             total_nilai_mutu += nilai_mutu
    //             if(angka_mutu>=3){
    //                 keterangan = "Lulus"
    //             } else {
    //                 keterangan = "Tidak Lulus"
    //             }

    //             output.nilai[i] = {
    //                 nama_matkul: matkul[i].deskripsi,
    //                 sks: matkul[i].sks,
    //                 average: nilai_semua_dosen,
    //                 huruf_mutu: huruf_mutu,
    //                 angka_mutu: angka_mutu,
    //                 nilai_mutu: nilai_mutu,
    //                 keterangan: keterangan
    //             }
    //             i++
    //         }
    //         let ipk = total_nilai_mutu / total_sks;
    //         let huruf_mutu_akhir = AngkaMutuAverage(ipk)

    //         output.total_sks = total_sks;
    //         output.ipk = ipk;
    //         output.huruf_mutu_akhir = huruf_mutu_akhir;

    //         await mahasiswa.update({
    //             ipk: ipk
    //         })

    //         return res.status(200).json({
    //             status: true,
    //             message: 'create data success!',
    //             data: output
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },

    // GET TOTAL NILAI UNTUK SETIAP MATKUL DARI SEMUA DOSEN
    getTotal: async (req, res, next) => {
        const {
            mahasiswa_id
        } = req.params
        try {
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                }
            })

            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!'
                });
            }

            let matkul = await matkuls.findAll();

            let output = {
                nama_mahasiswa: mahasiswa.full_name,
                npm: mahasiswa.npm,
                nilai: []
            }
            let i = 0;
            let total_sks = 0;
            let total_nilai_mutu = 0;
            let keterangan;
            let huruf_mutu, angka_mutu, nilai_mutu
            while (matkul[i]) {
                let nilai_matkul = await nilai_matkuls.findAll({
                    where: {
                        matkul_id: matkul[i].id,
                        mahasiswa_id: mahasiswa_id
                    }
                })
                let j = 0;
                let nilai_semua_dosen = 0;
                while (nilai_matkul[j]) {
                    let pembimbing = await pembimbings.findOne({
                        where: {
                            id: nilai_matkul[j].pembimbing_id
                        }
                    })

                    if (pembimbing.jenis_role == "pembimbing1") {
                        nilai_semua_dosen += (0.4 * nilai_matkul[j].average);
                    } else {
                        nilai_semua_dosen += (0.3 * nilai_matkul[j].average)
                    }
                    j++;
                }
                huruf_mutu = HurufMutu(nilai_semua_dosen)
                angka_mutu = AngkaMutu(huruf_mutu)
                nilai_mutu = angka_mutu * matkul[i].sks

                total_sks += matkul[i].sks
                total_nilai_mutu += nilai_mutu
                if (angka_mutu >= 3) {
                    keterangan = "Lulus"
                } else {
                    keterangan = "Tidak Lulus"
                }

                output.nilai[i] = {
                    nama_matkul: matkul[i].deskripsi,
                    sks: matkul[i].sks,
                    average: nilai_semua_dosen,
                    huruf_mutu: huruf_mutu,
                    angka_mutu: angka_mutu,
                    nilai_mutu: nilai_mutu,
                    keterangan: keterangan
                }
                i++
            }
            let ipk = total_nilai_mutu / total_sks;
            let huruf_mutu_akhir = AngkaMutuAverage(ipk)

            output.total_sks = total_sks;
            output.ipk = ipk;
            output.huruf_mutu_akhir = huruf_mutu_akhir;

            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: output
            });
        } catch (err) {
            next(err)
        }
    },
    getTotalAllMahasiswa: async (req, res, next) => { //get all mahasiswa with nilai
        try {
            let {
                sort = "full_name", type = "ASC", search = "", page = "1", limit = "10"
            } = req.query;
            page = parseInt(page);
            limit = parseInt(limit)
            let start = 0 + (page - 1) * limit;
            let end = page * limit;
            let mahasiswa = await mahasiswas.findAndCountAll({
                where: {
                    [Op.or]: [{
                            full_name: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            npm: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                },
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });

            if (!mahasiswa.rows[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!'
                });
            }

            let matkul = await matkuls.findAll();
            let data = [];
            let m = 0;
            while (mahasiswa.rows[m]) {
                let output = [];
                let eligible = true
                let pembimbing = await pembimbings.findAll({
                    where: {
                        mahasiswa_id: mahasiswa.rows[m].id
                    }
                })
                // if (pembimbing.length != 3) {
                //     m++
                //     continue
                // }
                let i = 0;
                let total_sks = 0;
                let total_nilai_mutu = 0;
                let keterangan;
                let huruf_mutu, angka_mutu, nilai_mutu
                let nilai = []
                while (matkul[i]) {
                    // if (!eligible) {
                    //     break
                    // }
                    let nilai_matkul = await nilai_matkuls.findAll({
                        where: {
                            matkul_id: matkul[i].id,
                            mahasiswa_id: mahasiswa.rows[m].id
                        }
                    })
                    // if (nilai_matkul.length != 3) {
                    //     eligible = false
                    //     break
                    // }
                    let j = 0;
                    let nilai_semua_dosen = 0;
                    while (nilai_matkul[j]) {
                        let pembimbing = await pembimbings.findOne({
                            where: {
                                id: nilai_matkul[j].pembimbing_id
                            }
                        })

                        if (pembimbing.jenis_role == "pembimbing1") {
                            nilai_semua_dosen += (0.4 * nilai_matkul[j].average);
                        } else {
                            nilai_semua_dosen += (0.3 * nilai_matkul[j].average)
                        }
                        j++;
                    }
                    huruf_mutu = HurufMutu(nilai_semua_dosen)
                    angka_mutu = AngkaMutu(huruf_mutu)
                    nilai_mutu = angka_mutu * matkul[i].sks

                    total_sks += matkul[i].sks
                    total_nilai_mutu += nilai_mutu
                    if (angka_mutu >= 3) {
                        keterangan = "Lulus"
                    } else {
                        keterangan = "Tidak Lulus"
                    }
                    nilai[i] = {
                        nama_matkul: matkul[i].deskripsi,
                        sks: matkul[i].sks,
                        average: nilai_semua_dosen,
                        huruf_mutu: huruf_mutu,
                        angka_mutu: angka_mutu,
                        nilai_mutu: nilai_mutu,
                        keterangan: keterangan
                    }
                    i++
                }
                // if (!eligible) {
                //     m++
                //     continue
                // }
                let ipk = total_nilai_mutu / total_sks;
                let huruf_mutu_akhir = AngkaMutuAverage(ipk)

                output[m] = {
                    id_mahasiswa: mahasiswa.rows[m].id,
                    nama_mahasiswa: mahasiswa.rows[m].full_name,
                    npm: mahasiswa.rows[m].npm,
                    total_sks : total_sks,
                    ipk : ipk,
                    huruf_mutu_akhir : huruf_mutu_akhir,
                    nilai: nilai
                }
                if (eligible){
                    data.push(output[m])
                } else {
                    output[m] = {
                        id_mahasiswa: mahasiswa.rows[m].id,
                        nama_mahasiswa: mahasiswa.rows[m].full_name,
                        npm: mahasiswa.rows[m].npm,
                        total_sks : "-",
                        ipk : "-",
                        huruf_mutu_akhir : "-",
                        nilai: "-"
                    }
                    data.push(output[m])
                }
                m++
            }

            // if(data.length==0){
            //     return res.status(400).json({
            //         status: false,
            //         message: 'data not found!'
            //     });
            // }

            let count = mahasiswa.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = mahasiswa.rows.length;
            pagination.thisPageData = data
            if (end < count) {
                pagination.next = {
                    page: page + 1
                }
            }
            if (start > 0) {
                pagination.prev = {
                    page: page - 1
                }
            }

            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: pagination
            });
        } catch (err) {
            next(err)
        }
    }
}