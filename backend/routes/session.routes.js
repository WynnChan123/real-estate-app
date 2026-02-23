const express = require('express');
const { createSession, deleteSession, getSession, getSessions, updateSession } = require('../controllers/session.controller');

const router = express.Router();

router.post('/createSession', createSession);
router.delete('/deleteSession/:sessionId', deleteSession);
router.get('/getSession/:sessionId', getSession);
router.get('/getSessions/:userId', getSessions);
router.put('/updateSession/:sessionId', updateSession);

module.exports = router;
