const express = require('express');

const { createMessage, getMessages } = require('../controllers/chat.controller');

const router = express.Router();

router.post('/createMessage', createMessage);
router.get('/getMessages/:sessionId', getMessages);

module.exports = router;