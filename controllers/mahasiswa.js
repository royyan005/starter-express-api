const {
    mahasiswas,
    pembimbings,
    users
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
    getMahasiswaAndPembimbing: async (req, res, next) => {
        try {
            let data = []
            let mahasiswa = await mahasiswas.findAll()
            if (!mahasiswa[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            let i = 0;
            while (mahasiswa[i]) {
                let pembimbing = await pembimbings.findAll({
                    where: {
                        mahasiswa_id: mahasiswa[i].id
                    },
                    attributes: {
                        exclude: ["id", 'mahasiswa_id','mahasiswa_full_name', 'createdAt', 'updatedAt','createdBy', 'updatedBy']
                    },
                });
                let j = 0;
                let pembimbing1 = "-"
                let pembimbing2 = "-"
                let penguji = "-"
                while (pembimbing[j]) {
                    if (pembimbing[j].jenis_role == "pembimbing1") {
                        pembimbing1 = pembimbing[j]
                    } else if (pembimbing[j].jenis_role == "pembimbing2") {
                        pembimbing2 = pembimbing[j]
                    } else {
                        penguji = pembimbing[j]
                    }
                    j++
                }
                data[i] = {
                    mahasiswa_data: mahasiswa[i],
                    pembimbng1: pembimbing1,
                    pembimbing2: pembimbing2,
                    penguji: penguji
                }
                i++
            }

            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: data
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