const {
    nilai_sub_sub_matkuls,
    nilai_sub_matkuls,
    nilai_matkuls,
    sub_sub_matkuls,
    sub_matkuls,
    matkuls,
    pembimbings
} = require("../models");
const {
    HurufMutu
} = require("../helpers/helper");
const {
    Op
} = require('sequelize');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let {
                sort = "createdAt", type = "ASC", search = "", page = "1", limit = "10"
            } = req.query;
            page = parseInt(page);
            limit = parseInt(limit)
            let start = 0 + (page - 1) * limit;
            let end = page * limit;
            let nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findAndCountAll({
                // where: {
                //     [Op.or]: [{
                //             deskripsi: {
                //                 [Op.like]: `%${search}%`
                //             }
                //         },
                //         {
                //             kode_nilai_sub_sub_matkul: {
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
            let count = nilai_sub_sub_matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = nilai_sub_sub_matkul.rows.length;
            pagination.thisPageData = nilai_sub_sub_matkul.rows
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
            let nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!nilai_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: nilai_sub_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            nilai,
            sub_sub_matkul_id
        } = req.body;
        const user_id = req.idUser
        const {
            mahasiswa_id
        } = req.params
        try {
            let nilai_matkul;
            let nilai_sub_matkul;
            let nilai_sub_sub_matkul;
            let nilai_sub_sub_matkul_exist
            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user_id,
                    mahasiswa_id: mahasiswa_id
                }
            })
            let sub_sub_matkul = await sub_sub_matkuls.findOne({
                where: {
                    id: sub_sub_matkul_id
                }
            })

            let sub_matkul = await sub_matkuls.findOne({
                where: {
                    id: sub_sub_matkul.sub_matkul_id,
                    is_sub_sub_matkul: true
                }
            })

            let matkul = await matkuls.findOne({
                where: {
                    id: sub_matkul.matkul_id
                }
            })
            let nilai_matkul_exist = await nilai_matkuls.findOne({
                where: {
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul.id,
                    pembimbing_id: pembimbing.id
                }
            })
            if (!nilai_matkul_exist) {
                nilai_matkul = await nilai_matkuls.create({
                    average: 0,
                    huruf_mutu: "E",
                    pembimbing_id: pembimbing.id,
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul.id,
                    createdBy: req.username,
                    updatedBy: req.username
                })
                nilai_sub_matkul = await nilai_sub_matkuls.create({
                    sub_matkul_id: sub_matkul.id,
                    nilai_matkul_id: nilai_matkul.id,
                    nilai: 0,
                    createdBy: req.username,
                    updatedBy: req.username
                })

                nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.create({
                    nilai: nilai,
                    nilai_sub_matkul_id: nilai_sub_matkul.id,
                    sub_sub_matkul_id: sub_sub_matkul_id,
                    createdBy: req.username,
                    updatedBy: req.username
                });

                return res.status(200).json({
                    status: true,
                    message: 'create data success!',
                    data: nilai_sub_sub_matkul
                });

            } else {
                let nilai_sub_matkul_exist = await nilai_sub_matkuls.findOne({
                    where: {
                        sub_matkul_id: sub_matkul.id,
                        nilai_matkul_id: nilai_matkul_exist.id
                    }
                })
                if (!nilai_sub_matkul_exist) {
                    nilai_sub_matkul = await nilai_sub_matkuls.create({
                        sub_matkul_id: sub_matkul.id,
                        nilai_matkul_id: nilai_matkul_exist.id,
                        nilai: 0,
                        createdBy: req.username,
                        updatedBy: req.username
                    })

                    nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.create({
                        nilai: nilai,
                        nilai_sub_matkul_id: nilai_sub_matkul.id,
                        sub_sub_matkul_id: sub_sub_matkul_id,
                        createdBy: req.username,
                        updatedBy: req.username
                    });

                    let get_all_nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findAll({
                        where: {
                            nilai_sub_matkul_id: nilai_sub_matkul.id
                        }
                    })

                    let i = 0;
                    let total = 0;
                    while (get_all_nilai_sub_sub_matkul[i]) {
                        total += get_all_nilai_sub_sub_matkul[i].nilai;
                        i++
                    }
                    average = total / i

                    await nilai_sub_matkul.update({
                        nilai: average
                    })
                } else {

                    nilai_sub_sub_matkul_exist = await nilai_sub_sub_matkuls.findOne({
                        where: {
                            sub_sub_matkul_id: sub_sub_matkul_id,
                            nilai_sub_matkul_id: nilai_sub_matkul_exist.id
                        }
                    })

                    if (nilai_sub_sub_matkul_exist) {
                        return res.status(400).json({
                            status: false,
                            message: 'data already exist!',
                            data: nilai_sub_sub_matkul
                        });
                    }

                    nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.create({
                        nilai: nilai,
                        nilai_sub_matkul_id: nilai_sub_matkul_exist.id,
                        sub_sub_matkul_id: sub_sub_matkul_id,
                        createdBy: req.username,
                        updatedBy: req.username
                    });

                    let get_all_nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findAll({
                        where: {
                            nilai_sub_matkul_id: nilai_sub_matkul_exist.id
                        }
                    })

                    let i = 0;
                    let total = 0;
                    while (get_all_nilai_sub_sub_matkul[i]) {
                        total += get_all_nilai_sub_sub_matkul[i].nilai;
                        i++
                    }
                    average = total / i

                    await nilai_sub_matkul_exist.update({
                        nilai: average,
                        updatedBy: req.username
                    })
                }
            }
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: nilai_sub_sub_matkul
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
            nilai = 0
        } = req.body;
        const user_id = req.idUser
        try {
            let nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_sub_sub_matkul not found!',
                });
            }

            let nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                where: {
                    id: nilai_sub_sub_matkul.nilai_sub_matkul_id
                }
            })

            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: nilai_sub_matkul.nilai_matkul_id
                }
            })

            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user_id,
                    mahasiswa_id: nilai_matkul.mahasiswa_id
                }
            })

            if (!pembimbing) {
                return res.status(400).json({
                    status: false,
                    message: 'user bukan pembimbing atau penguji mahasiswa ini!',
                });
            }

            if (nilai_matkul.pembimbing_id != pembimbing.id) {
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing atau penguji tidak berhak mengubah nilai!',
                });
            }

            let updated = await nilai_sub_sub_matkul.update({
                nilai: nilai,
                updatedBy: req.username
            });

            let getAllNilaiSubSubMatkul = await nilai_sub_sub_matkuls.findAll({
                where: {
                    nilai_sub_matkul_id: nilai_sub_matkul.id
                }
            })

            let i = 0;
            let total = 0;
            let average = 0;

            while (getAllNilaiSubSubMatkul[i]) {
                total += getAllNilaiSubSubMatkul[i].nilai;
                i++
            }

            average = total / i

            await nilai_sub_matkul.update({
                nilai: average,
                huruf_mutu: HurufMutu(average),
                updatedBy: req.username
            })

            let getAllNilaiSubMatkul = await nilai_sub_matkuls.findAll({
                where: {
                    nilai_matkul_id: nilai_matkul.id
                }
            })

            i = 0;
            total = 0;
            average = 0;

            while (getAllNilaiSubMatkul[i]) {
                total += getAllNilaiSubMatkul[i].nilai;
                i++
            }

            average = total / i

            await nilai_matkul.update({
                average: average,
                huruf_mutu: HurufMutu(average),
                updatedBy: req.username
            })

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
            let nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_sub_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_sub_sub_matkul not found!',
                });
            }

            await nilai_sub_sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}