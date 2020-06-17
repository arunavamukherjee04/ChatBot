const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const User = require('./Users');
const Socket = require('./SocketIO');


/**
 * @route   GET /
 * @desc    root route of the application
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json({
        message: `ChatBot is up and running`,
        timestamp: new Date().toString()
    });
});


router.post('/user', (req, res) => {
    const payload = req.body;
    const new_user = {
        ...payload,
        user_id: uuidv4(),
        is_online: true
    };

    User.add(new_user);
    
    const { io } = Socket.getSocketIO();
    io.emit('USER_JOINED', User.getAll());

    
    res.status(201).json({
        msg: 'USER_CREATED',
        user: new_user
    });

    


});

module.exports = router;