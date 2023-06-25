const {
    matkuls
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let matkul = await matkuls.findAll();
            if (!matkul[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: matkul
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
            let matkul = await matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            kode_matkul,
            deskripsi,
            sks
        } = req.body;
        try {
            let exist = await matkuls.findOne({
                where: {
                    kode_matkul: kode_matkul,
                    deskripsi: deskripsi,
                    sks: sks
                }
            })

            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'data already exist'
                });
            }

            let matkul = await matkuls.create({
                kode_matkul: kode_matkul,
                deskripsi: deskripsi,
                sks: sks,
                createdBy: req.username,
                updatedBy: req.username
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: matkul
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
            kode_matkul,
            deskripsi,
            sks
        } = req.body;
        try {
            let matkul = await matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'matkul not found!',
                });
            }

            let updated = await matkul.update({
                kode_matkul: kode_matkul,
                deskripsi: deskripsi,
                sks: sks,
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
            let matkul = await matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'matkul not found!',
                });
            }

            await matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}