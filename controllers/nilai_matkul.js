const {
    nilai_matkuls,
    nilai_sub_matkuls,
    sub_matkuls,
    nilai_sub_sub_matkuls,
    pembimbings
} = require("../models");
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
            let nilai_matkul = await nilai_matkuls.findAndCountAll({
                // where: {
                //     [Op.or]: [{
                //             deskripsi: {
                //                 [Op.like]: `%${search}%`
                //             }
                //         },
                //         {
                //             kode_nilai_matkul: {
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
            let count = nilai_matkul.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = nilai_matkul.rows.length;
            pagination.thisPageData = nilai_matkul.rows
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
            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!nilai_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: nilai_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    // create: async (req, res, next) => {
    //     const {mahasiswa_id} = req.params
    //     const {
    //         matkul_id
    //     } = req.body;
    //     const user_id = req.idUser;
    //     try {

    //         let pembimbing = await pembimbings.findOne({
    //             where:{
    //                 user_id: user_id,
    //                 mahasiswa_id: mahasiswa_id
    //             }
    //         })
    //         let nilai_matkul = await nilai_matkuls.findOne({
    //             where:{
    //                 mahasiswa_id: mahasiswa_id,
    //                 pembimbing_id: pembimbing.id,
    //                 matkul_id: matkul_id
    //             }
    //         })

    //         let nilai_sub_matkul = await nilai_sub_matkuls.findAll({
    //             where:{
    //                 nilai_matkul_id: nilai_matkul.id
    //             }
    //         })

    //         let i = 0;
    //         let total = 0;
    //         let average = 0;

    //         while(nilai_sub_matkul[i]){
    //             total += nilai_sub_matkul[i].nilai;
    //             i++
    //         }

    //         average = total/i

    //         await nilai_matkul.update({
    //             average: average,
    //             huruf_mutu: HurufMutu(average)
    //         })

    //         return res.status(200).json({
    //             status: true,
    //             message: 'create data success!',
    //             data: nilai_matkul
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },
    // update: async (req, res, next) => {
    //     const {
    //         id
    //     } = req.params
    //     const {
    //         average,
    //         huruf_mutu,
    //         mahasiswa_id,
    //         pembimbing_id,
    //         matkul_id,
    //         createdBy,
    //         updatedBy
    //     } = req.body;
    //     try {
    //         let nilai_matkul = await nilai_matkuls.findOne({
    //             where: {
    //                 id: id
    //             }
    //         });

    //         if (!nilai_matkul) {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'nilai_matkul not found!',
    //             });
    //         }

    //         let updated = await nilai_matkul.update({
    //             average: average,
    //             huruf_mutu: huruf_mutu,
    //             mahasiswa_id: mahasiswa_id,
    //             pembimbing_id: pembimbing_id,
    //             matkul_id: matkul_id,
    //             createdBy: createdBy,
    //             updatedBy: updatedBy
    //         });
    //         return res.status(200).json({
    //             status: true,
    //             message: 'update data success!',
    //             data: updated
    //         });
    //     } catch (err) {
    //         next(err)
    //     }
    // },
    delete: async (req, res, next) => {
        const {
            id,
        } = req.params
        try {
            let nilai_matkul = await nilai_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_matkul not found!',
                });
            }

            let nilai_sub_matkul = await nilai_sub_matkuls.findAll({
                where: {
                    nilai_matkul_id: nilai_matkul.id
                }
            })

            let i = 0
            while(nilai_sub_matkul[i]){
                let sub_matkul = await sub_matkuls.findOne({
                    where:{
                        id: nilai_sub_matkul[i].sub_matkul_id
                    }
                })
                if(sub_matkul.is_sub_sub_matkul == true){
                    let nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findAll({
                        where: {
                            nilai_sub_matkul_id: nilai_sub_matkul[i].id
                        }
                    })
                    
                    let j = 0;
                    while(nilai_sub_sub_matkul[j]){
                        await nilai_sub_sub_matkul[j].destroy()
                        j++
                    }
                }
                await nilai_sub_matkul[i].destroy();
                i++
            }

            await nilai_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    },
    deleteAllbyPembimbing: async (req, res, next) => {
        const {
            mahasiswa_id,
        } = req.params
        
        try {
            let pembimbing = await pembimbings.findOne({
                where:{
                    user_id: req.idUser,
                    mahasiswa_id: mahasiswa_id
                }
            })
            if(!pembimbing){
                return res.status(400).json({
                    status: false,
                    message: 'pembimbing not found!',
                });
            }
            let nilai_matkul = await nilai_matkuls.findAll({
                where: {
                    mahasiswa_id: mahasiswa_id,
                    pembimbing_id: pembimbing.id
                },
                include: [{
                    model: nilai_sub_matkuls,
                    as: 'nilai_sub_matkuls',
                    include: [{
                        model: nilai_sub_sub_matkuls,
                        as: 'nilai_sub_sub_matkuls'
                    }]
                }]
            });

            await nilai_sub_sub_matkuls.destroy({
                where: {
                    nilai_sub_matkul_id: {
                        [Op.in]: nilai_matkul.map(n => n.nilai_sub_matkuls.map(s => s.id)).flat()
                    }
                }
            });

            await nilai_sub_matkuls.destroy({
                where: {
                    id: {
                        [Op.in]: nilai_matkul.map(n => n.nilai_sub_matkuls.map(s => s.id)).flat()
                    }
                }
            });

            await nilai_matkuls.destroy({
                where: {
                    mahasiswa_id: mahasiswa_id,
                    pembimbing_id: pembimbing.id
                }
            });
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}