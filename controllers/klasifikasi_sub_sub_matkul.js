const {
    klasifikasi_sub_sub_matkuls
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let klasifikasi_sub_sub_matkul = await klasifikasi_sub_sub_matkuls.findAll();
            if (!klasifikasi_sub_sub_matkul[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: klasifikasi_sub_sub_matkul
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
            let klasifikasi_sub_sub_matkul = await klasifikasi_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!klasifikasi_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: klasifikasi_sub_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            sub_sub_matkul_id,
            deskripsi,
            nilai_min,
            nilai_max,
            kode_klasifikasi
        } = req.body;
        try {
            let klasifikasi_sub_sub_matkul = await klasifikasi_sub_sub_matkuls.create({
                sub_sub_matkul_id: sub_sub_matkul_id,
                deskripsi: deskripsi,
                nilai_min: nilai_min,
                nilai_max: nilai_max,
                kode_klasifikasi: kode_klasifikasi,
                createdBy: req.username,
                updatedBy: req.username
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: klasifikasi_sub_sub_matkul
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
            sub_sub_matkul_id,
            deskripsi,
            nilai_min,
            nilai_max,
            kode_klasifikasi
        } = req.body;
        try {
            let klasifikasi_sub_sub_matkul = await klasifikasi_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!klasifikasi_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'klasifikasi_sub_sub_matkul not found!',
                });
            }

            let updated = await klasifikasi_sub_sub_matkul.update({
                sub_sub_matkul_id: sub_sub_matkul_id,
                deskripsi: deskripsi,
                nilai_min: nilai_min,
                nilai_max: nilai_max,
                kode_klasifikasi: kode_klasifikasi,
                updatedBy: req.username
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
            let klasifikasi_sub_sub_matkul = await klasifikasi_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!klasifikasi_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'klasifikasi_sub_sub_matkul not found!',
                });
            }

            await klasifikasi_sub_sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}