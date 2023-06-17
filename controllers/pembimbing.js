const {
    pembimbings
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let pembimbing = await pembimbings.findAll();
            if (!pembimbing[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: pembimbing
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
            let pembimbing = await pembimbings.findOne({
                where: {
                    id: id
                }
            });
            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: pembimbing
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            user_id,
            mahasiswa_id,
            jenis_role,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let pembimbing = await pembimbings.create({
                user_id: user_id,
                mahasiswa_id: mahasiswa_id,
                jenis_role: jenis_role,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: pembimbing
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
            user_id,
            mahasiswa_id,
            jenis_role,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let pembimbing = await pembimbings.findOne({
                where: {
                    id: id
                }
            });

            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing not found!',
                });
            }

            let updated = await pembimbing.update({
                user_id: user_id,
                mahasiswa_id: mahasiswa_id,
                jenis_role: jenis_role,
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
            let pembimbing = await pembimbings.findOne({
                where: {
                    id: id
                }
            });

            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing not found!',
                });
            }

            await pembimbing.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}