const {
    mahasiswas,
    pembimbings,
    users,
    matkuls,
    nilai_matkuls
} = require("../models")
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;
const {
    Sequelize,
    Op
} = require('sequelize');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    // ... other options
});

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
            if (!mahasiswa) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            let data = []
            let i = 0;
            while (mahasiswa.rows[i]) {
                let pembimbing = await pembimbings.findAll({
                    where: {
                        mahasiswa_id: mahasiswa.rows[i].id
                    },
                    attributes: {
                        exclude: ["id", 'mahasiswa_id', 'mahasiswa_full_name', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy']
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
                    mahasiswa_data: mahasiswa.rows[i],
                    pembimbing1: pembimbing1,
                    pembimbing2: pembimbing2,
                    penguji: penguji
                }
                i++
            }
            let count = mahasiswa.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = mahasiswa.rows.length;
            pagination.thisPageData = data
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
                message: 'get data success!',
                data: pagination
            });
        } catch (err) {
            next(err)
        }
    },
    getAllWithFullNilai: async (req, res, next) => { //get all mahasiswa where nilai completed //not done yet
        try {
            let matkul_count = await matkuls.count()
            const mahasiswa = await mahasiswas.findAll({
                include: [{
                    model: nilai_matkuls,
                    as: 'nilai_matkuls',
                    attributes: ['pembimbing_id', 'matkul_id'], // Include necessary attributes
                }, ],
            });

            if(mahasiswa.length == 0){
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }

            let data = []
            let i = 0
            while (mahasiswa[i]) {
                if (mahasiswa[i].nilai_matkuls.length == matkul_count * 3) {
                    data.push({
                        id: mahasiswa[i].id,
                        full_name: mahasiswa[i].full_name,
                        npm: mahasiswa[i].npm,
                        jurusan: mahasiswa[i].jurusan
                    })
                }
                i++
            }
            // for (let each_mahasiswa in mahasiswa) {
            //     console.log(each_mahasiswa[each_mahasiswa]);
            // let pembimbing = await pembimbings.findAll({
            //     where: {
            //         mahasiswa_id: each_mahasiswa.id
            //     }
            // });
            // let nilai_matkul = []
            // for (let each_pembimbing in pembimbing) {
            //     nilai_matkul = await nilai_matkuls.findAll({
            //         where: {
            //             mahasiswa_id: each_mahasiswa.id,
            //             pembimbing_id: each_pembimbing.id
            //         }
            //     })
            // }
            // if (nilai_matkul.length == pembimbing.length * matkul_count) {
            //     data.push({mahasiswa:each_mahasiswa})
            // }
            // }

            // for (let each_mahasiswa in mahasiswa) {
            //     let pembimbing = await pembimbings.findAll({
            //         where: {
            //             mahasiswa_id: each_mahasiswa.id
            //     }})
            //     for (let each_pembimbing in pembimbing) {
            //         let nilai = await nilai_matkuls.findAll({
            //             where: {
            //                 mahasiswa_id: each_mahasiswa.id,
            //                 pembimbing_id: each_pembimbing.id
            //             }
            //         })
            //     }
            //     mahasiswa.nilai = nilai
            // }
            if(data.length == 0){
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
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
                },
                include: [{
                    model: pembimbings,
                    as: 'pembimbings',
                    attributes: ['id', 'jenis_role', 'user_id', 'user_full_name'], // Include the necessary attributes for checking
                }]
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