const {
    matkuls
} = require("../models")
const {
    Op
} = require('sequelize');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let {
                sort = "deskripsi", type = "ASC", search = "", page = "1", limit = "10"
            } = req.query;
            page = parseInt(page);
            limit = parseInt(limit)
            let start = 0 + (page - 1) * limit;
            let end = page * limit;
            let matkul = await matkuls.findAndCountAll({
                // where: {
                //     [Op.or]: [{
                //             deskripsi: {
                //                 [Op.like]: `%${search}%`
                //             }
                //         },
                //         {
                //             kode_matkul: {
                //                 [Op.like]: `%${search}%`
                //             }
                //         }
                //     ]
                // },
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            let count = matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = matkul.rows.length;
            pagination.thisPageData = matkul.rows
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