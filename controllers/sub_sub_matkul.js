const {
    sub_sub_matkuls,
    klasifikasi_sub_sub_matkuls
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
            let sub_sub_matkul = await sub_sub_matkuls.findAndCountAll({
                where: {
                    [Op.or]: [{
                            deskripsi: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            kode_sub_sub_matkul: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                },
                include: [
                    {
                        model: klasifikasi_sub_sub_matkuls,
                        as: 'klasifikasi_sub_sub_matkuls',
                        attributes: ['kode_klasifikasi','nilai_min', 'nilai_max', 'deskripsi']
                    }
                ],
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            let count = sub_sub_matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = sub_sub_matkul.rows.length;
            pagination.thisPageData = sub_sub_matkul.rows
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
            let sub_sub_matkul = await sub_sub_matkuls.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: klasifikasi_sub_sub_matkuls,
                        as: 'klasifikasi_sub_sub_matkuls',
                        attributes: ['kode_klasifikasi','nilai_min', 'nilai_max', 'deskripsi']
                    }
                ],
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
            klasifikasi
        } = req.body;
        try {
            let sub_sub_matkul = await sub_sub_matkuls.create({
                sub_matkul_id: sub_matkul_id,
                deskripsi: deskripsi,
                kode_sub_sub_matkul: kode_sub_sub_matkul,
                createdBy: req.username,
                updatedBy: req.username
            });
            
            let createdKlasifikasi = [];
            for (const klasifikasiEntry of klasifikasi) {
                let newKlasifikasi = await klasifikasi_sub_sub_matkuls.create({
                    nilai_min: klasifikasiEntry.nilai_min,
                    nilai_max: klasifikasiEntry.nilai_max,
                    deskripsi: klasifikasiEntry.deskripsi,
                    sub_sub_matkul_id: sub_sub_matkul.id,
                });
                createdKlasifikasi.push(newKlasifikasi);
            }

            sub_sub_matkul.klasifikasi = createdKlasifikasi;

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
            kode_sub_sub_matkul
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
    },
    createOrUpdate: async (req, res, next) => {
        const {
            sub_sub_matkul_id,
            sub_matkul_id,
            deskripsi,
            kode_sub_sub_matkul,
            klasifikasi
        } = req.body;
    
        try {
            let sub_sub_matkul;
    
            if (sub_sub_matkul_id === "0" || !sub_sub_matkul_id) {
                sub_sub_matkul = await sub_sub_matkuls.create({
                    sub_matkul_id: sub_matkul_id,
                    deskripsi: deskripsi,
                    kode_sub_sub_matkul: kode_sub_sub_matkul,
                    createdBy: req.username,
                    updatedBy: req.username
                });
            } else {
                sub_sub_matkul = await sub_sub_matkuls.findByPk(sub_sub_matkul_id);
                if (!sub_sub_matkuls) {
                    return res.status(404).json({
                        status: false,
                        message: 'sub_sub_matkul not found'
                    });
                }
                await sub_sub_matkuls.update({
                    sub_matkul_id: sub_matkul_id,
                    deskripsi: deskripsi,
                    kode_sub_sub_matkul: kode_sub_sub_matkul,
                    updatedBy: req.username
                });
            }
    
            let createdOrUpdateKlasifikasi = [];
            for (const klasifikasiEntry of klasifikasi) {
                if (klasifikasiEntry.klasifikasi_id === "0" || !klasifikasiEntry.klasifikasi_id) {
                    let newKlasifikasi = await klasifikasi_sub_sub_matkuls.create({
                        nilai_min: klasifikasiEntry.nilai_min,
                        nilai_max: klasifikasiEntry.nilai_max,
                        deskripsi: klasifikasiEntry.deskripsi,
                        sub_sub_matkul_id: sub_sub_matkul.id,
                    });
                    createdOrUpdateKlasifikasi.push(newKlasifikasi);
                } else {
                    let existingKlasifikasi = await klasifikasi_sub_sub_matkuls.findByPk(klasifikasiEntry.klasifikasi_id);
                    if (!existingKlasifikasi) {
                        return res.status(404).json({
                            status: false,
                            message: 'klasifikasi not found'
                        });
                    }
                    await existingKlasifikasi.update({
                        nilai_min: klasifikasiEntry.nilai_min,
                        nilai_max: klasifikasiEntry.nilai_max,
                        deskripsi: klasifikasiEntry.deskripsi
                    });
                    createdOrUpdateKlasifikasi.push(existingKlasifikasi);
                }
            }
    
            sub_sub_matkul.klasifikasi = createdOrUpdateKlasifikasi;
    
            return res.status(200).json({
                status: true,
                message: 'create or update data success!',
                data: sub_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    }
}