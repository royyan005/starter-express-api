const Jwt = require('jsonwebtoken');
const {
    users
} = require('../models');

module.exports = {
    verifyTokenAdmin: async (req, res, next) => {
        let username = ""
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({
            status: res.statusCode,
            message: "unauthorized"
        });
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(403).json({
                status: res.statusCode,
                message: "token invalid"
            });
            req.idUser = decode.idUser;
            req.username = decode.username;
            username = decode.username;
        });

        const user = await users.findAll({
            where: {
                username: username
            }
        });

        if (user == '') {
            return res.status(400).json({
                status: res.statusCode,
                message: 'user tidak ditemukan'
            });
        }

        console.log(user[0].role);

        if (user[0].role != 'ADMIN') {
            return res.status(403).json({
                status: res.statusCode,
                message: 'Unauthorized'
            });
        }

        next();
    },
    verifyTokenAdminOrSuperAdmin: async (req, res, next) => {
        let username = ""
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({
            status: res.statusCode,
            message: "unauthorized"
        });
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(403).json({
                status: res.statusCode,
                message: "token invalid"
            });
            req.idUser = decode.idUser;
            req.username = decode.username;
            username = decode.username;
        });

        const user = await users.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'user tidak ditemukan'
            });
        }

        let role = user.role;

        console.log(role);

        if (role != "ADMIN" && role != "SUPERADMIN") {
            return res.status(403).json({
                status: res.statusCode,
                message: 'Unauthorized'
            });
        }

        next();
    },
    verifyTokenDosen: async (req, res, next) => {
        let username = ""
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({
            status: res.statusCode,
            message: "unauthorized"
        });
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(403).json({
                status: res.statusCode,
                message: "token invalid"
            });
            req.idUser = decode.idUser;
            req.username = decode.username;
            username = decode.username;
        });

        const user = await users.findAll({
            where: {
                username: username
            }
        });

        if (user == '') {
            return res.status(400).json({
                status: res.statusCode,
                message: 'user tidak ditemukan'
            });
        }

        console.log(user[0].role);

        if (user[0].role != 'USER') {
            return res.status(403).json({
                status: res.statusCode,
                message: 'Unauthorized'
            });
        }

        next();
    },
    isLogin: (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized'
                })
            }

            const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.idUser = decoded.idUser;
            req.username = decoded.username;
            next();
        } catch (err) {
            if (err.message == 'jwt malformed') {
                return res.status(401).json({
                    status: false,
                    message: err.message,
                    data: null
                })
            }

            next(err);

        }
    }
}