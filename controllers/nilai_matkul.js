const {
    nilai_matkuls
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let nilai_matkul = await nilai_matkuls.findAll();
            if (!nilai_matkul[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: nilai_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    getById: async (req, res, next) => {
        const {
            id
        } = req.params;
        try {
            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!nilai_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: nilai_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            average,
            huruf_mutu,
            angka_mutu,
            nilai_mutu,
            mahasiswa_id,
            pembimbing_id,
            matkul_id,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let exist = await nilai_matkuls.findAll({
                where: {
                    average: average,
                    huruf_mutu: huruf_mutu,
                    angka_mutu: angka_mutu,
                    nilai_mutu: nilai_mutu,
                    mahasiswa_id: mahasiswa_id,
                    pembimbing_id: pembimbing_id,
                    matkul_id: matkul_id
                }
            })

            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'data already exist'
                });
            }

            let nilai_matkul = await nilai_matkuls.create({
                average: average,
                huruf_mutu: huruf_mutu,
                angka_mutu: angka_mutu,
                nilai_mutu: nilai_mutu,
                mahasiswa_id: mahasiswa_id,
                pembimbing_id: pembimbing_id,
                matkul_id: matkul_id,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: nilai_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    update: async (req, res, next) => {
        const {
            id
        } = req.params
        const {
            average,
            huruf_mutu,
            angka_mutu,
            nilai_mutu,
            mahasiswa_id,
            pembimbing_id,
            matkul_id,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_matkul not found!',
                });
            }

            let updated = await nilai_matkul.update({
                average: average,
                huruf_mutu: huruf_mutu,
                angka_mutu: angka_mutu,
                nilai_mutu: nilai_mutu,
                mahasiswa_id: mahasiswa_id,
                pembimbing_id: pembimbing_id,
                matkul_id: matkul_id,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            return res.status(200).json({
                status: true,
                message: 'update data success!',
                data: updated
            });
        } catch (err) {
            next(err)
        }
    },
    delete: async (req, res, next) => {
        const {
            id
        } = req.params
        try {
            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_matkul not found!',
                });
            }

            await nilai_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}