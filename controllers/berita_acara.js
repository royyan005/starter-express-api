const {
    mahasiswas,
    pembimbings,
    matkuls,
    nilai_matkuls,
    users
} = require("../models")
const {
    HurufMutu
} = require("../helpers/helper");
module.exports = {
    getBeritaAcara: async (req, res, next) => {
        const {
            mahasiswa_id
        } = req.params;
        try {
            let matkul = await matkuls.count();
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: mahasiswa_id
                },
                include: [{
                    model: pembimbings,
                    as: 'pembimbings',
                    attributes: ['id', 'jenis_role', 'user_id', 'user_full_name'],
                    include: [{
                        model: nilai_matkuls,
                        as: 'nilai_matkuls',
                        attributes: ['id', 'average', 'matkul_id'],
                        
                    }]
                }]
            });
            if (mahasiswa.pembimbings.length < 3) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai mahasiswa belum lengkap!',
                })
            }

            let nilai_pembimbing1 = mahasiswa.pembimbings.filter(p => p.jenis_role == 'pembimbing1').map(p => p.nilai_matkuls)[0]
            let nilai_pembimbing2 = mahasiswa.pembimbings.filter(p => p.jenis_role == 'pembimbing2').map(p => p.nilai_matkuls)[0]
            let nilai_penguji = mahasiswa.pembimbings.filter(p => p.jenis_role == 'penguji').map(p => p.nilai_matkuls)[0]
            let i = 0
            let average_pembimbing1 = 0
            let average_pembimbing2 = 0
            let average_penguji = 0
            while (i < matkul) {
                average_pembimbing1 += nilai_pembimbing1[i].average
                average_pembimbing2 += nilai_pembimbing2[i].average
                average_penguji += nilai_penguji[i].average
                i++
            }
            average_pembimbing1 /= matkul
            average_pembimbing2 /= matkul
            average_penguji /= matkul
            let final_average_pembimbing1 = average_pembimbing1 * 0.4
            let final_average_pembimbing2 = average_pembimbing2 * 0.3
            let final_average_penguji = average_penguji * 0.3
            let pembimbing1 = mahasiswa.pembimbings.filter(p => p.jenis_role == 'pembimbing1')[0]
            let dosen_pembimbing1 = await users.findOne({
                where: {
                    id: pembimbing1.user_id
                }
            })
            let pembimbing2 = mahasiswa.pembimbings.filter(p => p.jenis_role == 'pembimbing2')[0]
            let dosen_pembimbing2 = await users.findOne({
                where: {
                    id: pembimbing2.user_id
                }
            })
            let penguji = mahasiswa.pembimbings.filter(p => p.jenis_role == 'penguji')[0]
            let dosen_penguji = await users.findOne({
                where: {
                    id: penguji.user_id
                }
            })

            let data = {
                mahasiswa: {
                    id: mahasiswa.id,
                    full_name: mahasiswa.full_name,
                    npm: mahasiswa.npm,
                    jurusan: mahasiswa.jurusan,
                    pembimbing_1: {
                        id: dosen_pembimbing1.id,
                        full_name: dosen_pembimbing1.full_name,
                        username: dosen_pembimbing1.username,
                    },
                    pembimbing_2: {
                        id: dosen_pembimbing2.id,
                        full_name: dosen_pembimbing2.full_name,
                        username: dosen_pembimbing2.username,
                    },
                    penguji: {
                        id: dosen_penguji.id,
                        full_name: dosen_penguji.full_name,
                        username: dosen_penguji.username,
                    },
                },
                nilai: {
                    pembimbing_1: average_pembimbing1,
                    pembimbing_2: average_pembimbing2,
                    penguji: average_penguji
                },
                nilai_akhir: {
                    pembimbing_1: final_average_pembimbing1,
                    pembimbing_2: final_average_pembimbing2,
                    penguji: final_average_penguji
                },
                nilai_akhir_rata_rata: (final_average_pembimbing1 + final_average_pembimbing2 + final_average_penguji),
                huruf_mutu: HurufMutu((final_average_pembimbing1 + final_average_pembimbing2 + final_average_penguji))

            }

            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: data
            });
        } catch (err) {
            next(err)
        }
    },
}