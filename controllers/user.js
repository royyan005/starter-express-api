const {
    users
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            let user = await users.findAll();
            if (!user[0]) {
                return res.status(400).json({
                    status: false,
                    message: 'data not found!'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'get all data success!',
                data: users
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
                data: user1
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
            token,
            role,
            createdBy,
            updatedBy
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
                token: token,
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

    login: async (req, res) => {
        const user = await users.findAll({
            where: {
                username: req.body.username
            }
        });
    
        if (user == '') {
            return res.status(400).json({
                status: res.statusCode,
                message: 'User tidak ditemukan'
            });
        }
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) {
            return res.status(403).json({
                message: "wrong password"
            });
        }
    
        const idUser = user[0].id;
        const username = user[0].username;
        const accessToken = jwt.sign({
                idUser,
                username,
            },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            }
        );
        const refreshToken = jwt.sign({
                idUser,
                username,
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
        res.status(200).json({
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
        const user = await users.findAll({
            where: {
                token: refreshToken
            }
        });
        if (!user) return res.status(401).json({
            status: res.statusCode,
            message: "No User Found"
        });
        const idUser = user[0].id
        await users.update({token: null}, {
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