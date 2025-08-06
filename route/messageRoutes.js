// route/messageRoutes.js
const express = require('express');
const router  = express.Router();
const {
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  createDemoMessage
} = require('../controller/messageController');

// GET /messages
router.get('/', getAllMessages);

// GET /messages/:id
router.get('/:id', getMessageById);

// PATCH /messages/:id/status
router.patch('/:id/status', updateMessageStatus);

// POST /messages       ← “demo” outbound‐style message
router.post('/', createDemoMessage);

module.exports = router;
