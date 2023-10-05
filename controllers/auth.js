const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


exports.register = async (req, res, next) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token });
}

exports.login = (req, res, next) => {
    res.send('User login ...');
}