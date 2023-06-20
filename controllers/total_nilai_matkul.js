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
                        where:{
                            id: nilai_matkul[j].pembimbing_id
                        }
                    })

                    if(pembimbing.jenis_role=="pembimbing1"){
                        nilai_semua_dosen += (0.4*nilai_matkul[j].average);
                    } else {
                        nilai_semua_dosen += (0.3*nilai_matkul[j].average)
                    }
                    j++;
                }
                huruf_mutu = HurufMutu(nilai_semua_dosen)
                angka_mutu = AngkaMutu(huruf_mutu)
                nilai_mutu = angka_mutu * matkul[i].sks

                total_sks += matkul[i].sks
                total_nilai_mutu += nilai_mutu
                if(angka_mutu>=3){
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
    }
}