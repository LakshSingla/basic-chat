const express = require('express');

const groupControllers = require('../controllers/group-controllers');

const router = express.Router();

router.post('/new', groupControllers.newGroup);

module.exports = router;