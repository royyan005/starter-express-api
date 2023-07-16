const {
    users
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            let user = await users.findAndCountAll({
                where: {
                    [Op.or]: {
                            full_name: {
                                [Op.like]: `%${search}%`
                            }
                        }
                },
                order: [
                    [sort, type]
                ],
                limit: limit,
                offset: start
            });
            let count = user.count;
            let pagination = {}
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = user.rows.length;
            pagination.thisPageData = user.rows
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
            let user = await users.findOne({
                where: {
                    id: id
                }
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!',
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: user
            });
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        const {
            username,
            password,
            rePassword,
            full_name,
            role
        } = req.body
        try {
            let user = await users.findOne({
                where: {
                    username: username
                }
            });
            if (user) {
                return res.status(400).json({
                    status: false,
                    message: 'data already exist!',
                })
            }

            if (password !== rePassword)
                return res.status(400).json({
                    status: false,
                    message: 'Password dan rePassword tidak cocok !'
                });

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            let new_user = await users.create({
                username: username,
                password: hashPassword,
                full_name: full_name,
                role: role,
                createdBy: req.username,
                updatedBy: req.username
            })


            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: new_user
            });
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        const {
            username,
            password,
            rePassword,
            full_name,
            role
        } = req.body

        const {id} = req.params
        try {
            let user = await users.findOne({
                where: {
                    id: id
                }
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found',
                })
            }

            if (password !== rePassword)
                return res.status(400).json({
                    status: false,
                    message: 'Password dan rePassword tidak cocok !'
                });

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            let update_user = await user.update({
                username: username,
                password: hashPassword,
                full_name: full_name,
                role: role,
                updatedBy: req.username
            })


            return res.status(200).json({
                status: true,
                message: 'update data success!',
                data: update_user
            });
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        const {id} = req.params
        try {
            let user = await users.findOne({
                where: {
                    id: id
                }
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found',
                })
            }

            await user.destroy();
            return res.status(200).json({
                status: true,
                message: 'delete user success!'
            });
        } catch (err) {
            next(err)
        }
    },

    login: async (req, res) => {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (refreshTokenCookie) {
            const user = await users.findOne({
                where: {
                    token: refreshTokenCookie
                }
            });

            if (!user){
                return res.status(400).json({
                    status: res.statusCode,
                    message: 'User tidak ditemukan'
                });
            }

            const idUser = user.id;
            const username = user.username;
            const role = user.role;
            const accessToken = jwt.sign({
                    idUser,
                    username,
                    role,
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1d'
                }
            );
            const refreshToken = jwt.sign({
                    idUser,
                    username,
                    role,
                },
                process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '7d'
                }
            );
            await users.update({
                token: refreshToken
            }, {
                where: {
                    id: idUser
                }
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                status: res.statusCode,
                message: 'Berhasil Login',
                token: accessToken
            });
        }

        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Username dan password harus diisi'
            });
        }
        const user = await users.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'User tidak ditemukan'
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(403).json({
                message: "wrong password"
            });
        }

        const idUser = user.id;
        const username = user.username;
        const role = user.role
        const accessToken = jwt.sign({
                idUser,
                username,
                role,
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            }
        );
        const refreshToken = jwt.sign({
                idUser,
                username,
                role,
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d'
            }
        );

        await users.update({
            token: refreshToken
        }, {
            where: {
                id: idUser
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil Login',
            token: accessToken
        });
    },

    logout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({
            status: res.statusCode,
            message: "No Token Found"
        });
        const user = await users.findOne({
            where: {
                token: refreshToken
            }
        });
        if (!user) return res.status(401).json({
            status: res.statusCode,
            message: "No User Found"
        });
        const idUser = user.id
        await users.update({
            token: null
        }, {
            where: {
                id: idUser
            }
        });
        res.clearCookie('refreshToken')
        return res.status(200).json({
            status: res.statusCode,
            message: "Logged out successfully"
        });
    }
}