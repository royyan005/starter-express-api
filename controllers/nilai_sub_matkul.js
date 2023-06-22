const {
    nilai_matkuls,
    nilai_sub_matkuls,
    nilai_sub_sub_matkuls,
    sub_matkuls,
    matkuls,
    pembimbings
} = require("../models")
const {
    HurufMutu
} = require("../helpers/helper");

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
            user_id,
            nilai = 0,
            sub_matkul_id,
            createdBy = "",
            updatedBy = ""
        } = req.body;

        const {
            mahasiswa_id
        } = req.params
        try {
            let average;
            let nilai_sub_sub_matkul;
            let nilai_sub_matkul;
            let nilai_matkul;
            let nilai_matkul_exist
            let nilai_sub_matkul_exist

            let pembimbing = await pembimbings.findOne({
                where: {
                    user_id: user_id,
                    mahasiswa_id: mahasiswa_id
                }
            })
            let sub_matkul = await sub_matkuls.findOne({
                where: {
                    id: sub_matkul_id
                }
            })

            let matkul = await matkuls.findOne({
                where: {
                    id: sub_matkul.matkul_id
                }
            })

            nilai_matkul_exist = await nilai_matkuls.findOne({
                where: {
                    mahasiswa_id: mahasiswa_id,
                    matkul_id: matkul.id,
                    pembimbing_id: pembimbing.id
                }
            })

            if (sub_matkul.is_sub_sub_matkul == false) {
                if (!nilai_matkul_exist) {
                    nilai_matkul = await nilai_matkuls.create({
                        average: 0,
                        huruf_mutu: "E",
                        pembimbing_id: pembimbing.id,
                        mahasiswa_id: mahasiswa_id,
                        matkul_id: matkul.id,
                        createdBy: "",
                        updatedBy: ""
                    })

                    nilai_sub_matkul = await nilai_sub_matkuls.create({
                        nilai: nilai,
                        nilai_matkul_id: nilai_matkul.id,
                        sub_matkul_id: sub_matkul_id,
                        createdBy: createdBy,
                        updatedBy: updatedBy
                    });
                } else {
                    nilai_sub_matkul_exist = await nilai_sub_matkuls.findOne({
                        where: {
                            nilai_matkul_id: nilai_matkul_exist.id,
                            sub_matkul_id: sub_matkul_id,
                        }
                    });

                    if (nilai_sub_matkul_exist) {
                        return res.status(400).json({
                            status: false,
                            message: 'data already exist!'
                        });
                    }

                    nilai_sub_matkul = await nilai_sub_matkuls.create({
                        nilai: nilai,
                        nilai_matkul_id: nilai_matkul_exist.id,
                        sub_matkul_id: sub_matkul_id,
                        createdBy: createdBy,
                        updatedBy: updatedBy
                    });
                }
            } else {
                nilai_sub_matkul = await nilai_sub_matkuls.findOne({
                    where: {
                        sub_matkul_id: sub_matkul.id,
                        nilai_matkul_id: nilai_matkul_exist.id
                    }
                })

                nilai_sub_sub_matkul = await nilai_sub_sub_matkuls.findAll({
                    where: {
                        nilai_sub_matkul_id: nilai_sub_matkul.id
                    }
                })

                let i = 0;
                let total = 0;
                while (nilai_sub_sub_matkul[i]) {
                    total += nilai_sub_sub_matkul[i].nilai;
                    i++
                }
                average = total / i

                await nilai_sub_matkul.update({
                    nilai: average
                })
            }
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
            user_id,
            nilai = 0,
            createdBy = "",
            updatedBy = ""
        } = req.body;
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

            let updated = await nilai_sub_matkul.update({
                nilai: nilai,
                createdBy: createdBy,
                updatedBy: updatedBy
            });

            let getAllNilaiSubMatkul = await nilai_sub_matkuls.findAll({
                where: {
                    nilai_matkul_id: nilai_matkul.id
                }
            })

            let i = 0;
            let total = 0;
            let average = 0;

            while (getAllNilaiSubMatkul[i]) {
                total += getAllNilaiSubMatkul[i].nilai;
                i++
            }

            average = total / i

            await nilai_matkul.update({
                average: average,
                huruf_mutu: HurufMutu(average)
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