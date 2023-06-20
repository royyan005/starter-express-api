const {
    users
} = require('../models');

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

            let new_user = await users.create({
                username: username,
                password: password,
                full_name: full_name,
                token: token,
                role: role,
                createdBy: createdBy,
                updatedBy: updatedBy
            })


            return res.status(200).json({
                status: true,
                message: 'create data success!',
                data: new_user
            });
        } catch (err) {
            next(err)
        }
    }
}