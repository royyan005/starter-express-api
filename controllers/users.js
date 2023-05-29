const {
    users
} = require('../models');

module.exports = {
        getAll: async (req, res, next) => {
            try {
                let user = await users.findAll();
                if (!user) {
                    return res.status(400).json({
                        status: false,
                        message: 'data not found!',
                        data: user
                    })}
                return res.status(200).json({
                    status: true,
                    message: 'get all data success!',
                    data: user
                });
            } catch (err) {
                next(err)
            }
        },
        getById: async (req, res, next) => {
            try {
                const {
                    id
                } = req.params;
                let user = await users.findOne({
                    where: {
                        id: id
                    }
                });
                if (!user) {
                    return res.status(400).json({
                        status: false,
                        message: 'data not found!',
                        data: user
                    })}
                    return res.status(200).json({
                        status: true,
                        message: 'get all data success!',
                        data: user
                    });
                } catch (err) {
                    next(err)
                }
            }
        }