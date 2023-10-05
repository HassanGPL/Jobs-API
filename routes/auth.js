const express = require('express');
const authContoller = require('../controllers/auth');

const router = express.Router();


router.post('/login', authContoller.login);
router.post('/register', authContoller.register);


module.exports = router;