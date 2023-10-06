const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors')


exports.register = async (req, res, next) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token });
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please Provide Your E-mail and Password');
    }

    // Find User with E-mail
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError(`The E-mail address you entered isn't connected to an account.`);
    }

    // Compare Password
    const isCorrect = await user.comparePassword(password);

    if (!isCorrect) {
        throw new UnauthenticatedError(`The password you've entered is incorrect.`);
    }

    // Create Token
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });


}