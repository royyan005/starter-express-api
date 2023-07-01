const {
    klasifikasi_sub_matkuls
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
            let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findAndCountAll({
                where: {
                    [Op.or]: [{
                            deskripsi: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            kode_klasifikasi: {
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
            let count = klasifikasi_sub_matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = klasifikasi_sub_matkul.rows.length;
            pagination.thisPageData = klasifikasi_sub_matkul.rows
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
            let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!klasifikasi_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: klasifikasi_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            sub_matkul_id,
            deskripsi,
            nilai_min,
            nilai_max,
            kode_klasifikasi
        } = req.body;
        try {
            let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.create({
                sub_matkul_id: sub_matkul_id,
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
                data: klasifikasi_sub_matkul
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
            nilai_min,
            nilai_max,
            kode_klasifikasi
        } = req.body;
        try {
            let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!klasifikasi_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'klasifikasi_sub_matkul not found!',
                });
            }

            let updated = await klasifikasi_sub_matkul.update({
                sub_matkul_id: sub_matkul_id,
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
            let klasifikasi_sub_matkul = await klasifikasi_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!klasifikasi_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'klasifikasi_sub_matkul not found!',
                });
            }

            await klasifikasi_sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}