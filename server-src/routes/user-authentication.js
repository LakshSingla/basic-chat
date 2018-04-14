const express = require('express');

const authControllers = require('../controllers/user-authentication');

const router = express.Router();

router.post('/register', authControllers.register);

module.exports = router;