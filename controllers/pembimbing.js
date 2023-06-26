const {
    pembimbings,
    mahasiswas,
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
            jenis_role
        } = req.body;
        try {

            let mahasiswaExist = await mahasiswas.findAll({
                where: {
                    id: mahasiswa_id
                }
            })
            if (!mahasiswaExist[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!'
                })
            }
            let pembimbingExist = await pembimbings.findAll({
                where: {
                    user_id: user_id,
                    mahasiswa_id: mahasiswa_id
                }
            })
            let roleExist = await pembimbings.findAll({
                where: {
                    jenis_role: jenis_role,
                    mahasiswa_id: mahasiswa_id
                }
            })

            if (pembimbingExist[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'user sudah menjadi pembimbing/penguji',
                    data: pembimbingExist
                })
            }
            if (roleExist[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'role sudah terpakai!',
                    data: roleExist
                })
            }

            let pembimbing = await pembimbings.create({
                user_id: user_id,
                mahasiswa_id: mahasiswa_id,
                jenis_role: jenis_role,
                createdBy: req.username,
                updatedBy: req.username
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
            jenis_role
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
                    message: 'data not found!',
                });
            }
            let roleExist = await pembimbings.findOne({
                where: {
                    mahasiswa_id: mahasiswa_id,
                    jenis_role: jenis_role
                }
            });

            if (roleExist) {
                return res.status(400).json({
                    status: false,
                    message: 'sudah memiliki pembimbing/penguji',
                });
            }

            let updated = await pembimbing.update({
                user_id: user_id,
                mahasiswa_id: mahasiswa_id,
                jenis_role: jenis_role,
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