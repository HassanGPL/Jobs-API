const User = require('../models/User');


exports.register = (req, res, next) => {
    res.json(req.body);
}

exports.login = (req, res, next) => {
    res.send('User login ...');
}