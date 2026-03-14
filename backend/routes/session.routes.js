const express = require('express');
const { createSession, deleteSession, getSession, getSessions, updateSession } = require('../controllers/session.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createSession', protect, createSession);
router.delete('/deleteSession/:sessionId', protect, deleteSession);
router.get('/getSession/:sessionId', protect, getSession);
router.get('/getSessions', protect, getSessions);
router.put('/updateSession/:sessionId', protect, updateSession);

module.exports = router;
