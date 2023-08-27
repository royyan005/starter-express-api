const {
    mahasiswas,
    pembimbings,
    matkuls,
    nilai_matkuls
} = require("../models")
const {
    HurufMutu
} = require("../helpers/helper");
module.exports = {
    getBeritaAcara: async (req, res, next) => {
        const {
            user_id
        } = req.params;
        try {
            let matkul = await matkuls.count();
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: user_id
                },
                include: [{
                    model: nilai_matkuls,
                    as: 'nilai_matkuls',
                    attributes: ['id', 'average', 'matkul_id'],
                    include: [{
                        model: pembimbings,
                        as: 'pembimbings',
                        attributes: ['id', 'jenis_role', 'user_id', 'user_full_name'],
                    }]
                }]
            });
            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            let nilai_pembimbing1 = mahasiswa.nilai_matkuls.filter((nilai_matkul) => nilai_matkul.pembimbings.jenis_role == 'pembimbing1')
            let nilai_pembimbing2 = mahasiswa.nilai_matkuls.filter((nilai_matkul) => nilai_matkul.pembimbings.jenis_role == 'pembimbing2')
            let nilai_penguji = mahasiswa.nilai_matkuls.filter((nilai_matkul) => nilai_matkul.pembimbings.jenis_role == 'penguji')
            let i = 0
            let average_pembimbing1 = 0
            let average_pembimbing2 = 0
            let average_penguji = 0
            while (i<matkul) {
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

            let data = {
                mahasiswa: {
                    id: mahasiswa.id,
                    full_name: mahasiswa.full_name,
                    npm: mahasiswa.npm,
                    jurusan: mahasiswa.jurusan
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
                nilai_akhir_rata_rata: (final_average_pembimbing1 + final_average_pembimbing2 + final_average_penguji) / 3,
                huruf_mutu: HurufMutu((final_average_pembimbing1 + final_average_pembimbing2 + final_average_penguji) / 3)

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