const express = require('express');

const groupControllersUnprotected = require('../controllers/group-controllers-unprotected');

const router = express.Router(); 

router.get('/retrieve', groupControllersUnprotected.retrieveGroups);

module.exports = router;