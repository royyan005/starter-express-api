const {
    nilai_sub_matkuls,
    sub_matkuls
} = require("../models")

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let nilai_sub_matkul = await nilai_sub_matkuls.findAll();
            if (!nilai_sub_matkul[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: nilai_sub_matkul
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
            let nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });
            if (!nilai_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get data success!',
                data: nilai_sub_matkul
            });
        } catch (err) {
            next(err)
        }
    },
    create: async (req, res, next) => {
        const {
            nilai,
            mahasiswa_id,
            sub_matkul_id,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let value;
            let sub_matkul = await sub_matkuls.findOne({
                where:{
                    id: sub_matkul_id
                }
            })

            // check apakah menggunakan sub_sub_matkul kalo iya pake rata-ratanya, kalo gak ada pake nilai inputan
            // if(sub_matkul.is_sub_sub_matkul==true){
            //     value = 
            // }

            let nilai_sub_matkul = await nilai_sub_matkuls.create({
                nilai: nilai,
                mahasiswa_id: mahasiswa_id,
                sub_matkul_id: sub_matkul_id,
                createdBy: createdBy,
                updatedBy: updatedBy
            });
            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: nilai_sub_matkul
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
            nilai,
            mahasiswa_id,
            sub_matkul_id,
            createdBy,
            updatedBy
        } = req.body;
        try {
            let nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_sub_matkul not found!',
                });
            }

            let updated = await nilai_sub_matkul.update({
                nilai: nilai,
                mahasiswa_id: mahasiswa_id,
                sub_matkul_id: sub_matkul_id,
                createdBy: createdBy,
                updatedBy: updatedBy
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
            let nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                where: {
                    id: id
                }
            });

            if (!nilai_sub_matkul) {
                return res.status(400).json({
                    status: false,
                    message: 'nilai_sub_matkul not found!',
                });
            }

            await nilai_sub_matkul.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete data success!',
            });
        } catch (err) {
            next(err)
        }
    }
}