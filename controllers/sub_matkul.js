const {
    sub_matkuls
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
            let sub_matkul = await sub_matkuls.findAndCountAll({
                where: {
                    [Op.or]: [{
                            deskripsi: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            kode_sub_matkul: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                },
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            let count = sub_matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = sub_matkul.rows.length;
            pagination.thisPageData = sub_matkul.rows
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
    getAllwSubSub: async (req, res, next) => { //get all sub matkul with sub sub matkul
        try {
            let sub_matkul = await sub_matkuls.findAll({
                where: {
                    is_sub_sub_matkul: true
                }
            });
            
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: sub_matkul
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
            let sub_matkul = await sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            matkul_id,
            deskripsi,
            kode_sub_matkul,
            is_sub_sub_matkul
        } = req.body;
        try {
            let sub_matkul = await sub_matkuls.create({
                matkul_id: matkul_id,
                deskripsi: deskripsi,
                kode_sub_matkul: kode_sub_matkul,
                is_sub_sub_matkul: is_sub_sub_matkul,
                createdBy: req.username,
                updatedBy: req.username
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: sub_matkul
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
            matkul_id,
            deskripsi,
            kode_sub_matkul,
            is_sub_sub_matkul
        } = req.body;
        try {
            let sub_matkul = await sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'sub_matkul not found!',
                });
            }

            let updated = await sub_matkul.update({
                matkul_id: matkul_id,
                deskripsi: deskripsi,
                kode_sub_matkul: kode_sub_matkul,
                is_sub_sub_matkul: is_sub_sub_matkul,
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
            let sub_matkul = await sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'sub_matkul not found!',
                });
            }

            await sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}