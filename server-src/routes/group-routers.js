const express = require('express');

const groupControllers = require('../controllers/group-controllers');

const router = express.Router();

router.post('/new', groupControllers.newGroup);

router.post('/:gid/join', groupControllers.joinGroup);

router.get('/:gid/leave', (req, res, next) => {
    console.log(req.params.gid);
    next();
});

router.get('/:gid/leave', groupControllers.leaveGroup);

module.exports = router;
