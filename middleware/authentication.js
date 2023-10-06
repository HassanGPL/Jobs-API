const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {

    // Check for Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Invalid Authorization');
    }

    // Get Token from Authorization Header
    const token = await authHeader.split(' ')[1];

    try {
        // Get PayLoad from Token
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Save User Data in Req.
        const user = User.findById(payload.userId).select('-password')
        req.user = user;

        // req.user = { userId: payload.userId, name: payload.name };

        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid Authorization');
    }

}

module.exports = auth;