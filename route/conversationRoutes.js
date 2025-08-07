const express = require('express');
const router = express.Router();
const { getConversations } = require('../controllers/conversationController');

// GET /conversations
router.get('/', getConversations);

module.exports = router;
