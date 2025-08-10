const express = require('express');
const router = express.Router();
const { getConversations } = require('../controller/conversationController');

// GET /conversations
router.get('/', getConversations);

module.exports = router;
