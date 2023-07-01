const {
    mahasiswas
} = require("../models")
const {
    Op
} = require('sequelize');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let {
                sort = "full_name", type = "ASC", search = "", page = "1", limit = "10"
            } = req.query;
            page = parseInt(page);
            limit = parseInt(limit)
            let start = 0 + (page - 1) * limit;
            let end = page * limit;
            let mahasiswa = await mahasiswas.findAndCountAll({
                where: {
                    [Op.or]: [{
                            full_name: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            npm: {
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
            let count = mahasiswa.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = mahasiswa.rows.length;
            pagination.thisPageData = mahasiswa.rows
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
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: id
                }
            });
            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: mahasiswa
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            full_name,
            npm,
            jurusan
        } = req.body;

        try {
            let mahasiswaExist = await mahasiswas.findOne({
                where: {
                    npm: npm
                }
            })
            if (mahasiswaExist) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa already exist!'
                });
            }
            let mahasiswa = await mahasiswas.create({
                full_name: full_name,
                npm: npm,
                jurusan: jurusan,
                createdBy: req.username,
                updatedBy: req.username
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: mahasiswa
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
            full_name,
            npm,
            jurusan
        } = req.body;
        try {
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: id
                }
            });

            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!',
                });
            }

            let updated = await mahasiswa.update({
                full_name: full_name,
                npm: npm,
                jurusan: jurusan,
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
            let mahasiswa = await mahasiswas.findOne({
                where: {
                    id: id
                }
            });

            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'mahasiswa not found!',
                });
            }

            await mahasiswa.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}