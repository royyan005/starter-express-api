const {
    sub_sub_matkuls
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let sub_sub_matkul = await sub_sub_matkuls.findAll();
            if (!sub_sub_matkul[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: sub_sub_matkul
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
            let sub_sub_matkul = await sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: sub_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            sub_matkul_id,
            deskripsi,
            kode_sub_sub_matkul,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let sub_sub_matkul = await sub_sub_matkuls.create({
                sub_matkul_id: sub_matkul_id,
                deskripsi: deskripsi,
                kode_sub_sub_matkul: kode_sub_sub_matkul,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: sub_sub_matkul
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
            sub_matkul_id,
            deskripsi,
            kode_sub_sub_matkul,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let sub_sub_matkul = await sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'sub_sub_matkul not found!',
                });
            }

            let updated = await sub_sub_matkul.update({
                sub_matkul_id: sub_matkul_id,
                deskripsi: deskripsi,
                kode_sub_sub_matkul: kode_sub_sub_matkul,
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
            let sub_sub_matkul = await sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'sub_sub_matkul not found!',
                });
            }

            await sub_sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}