// routes/messageRoutes.js
const express = require('express');
const router  = express.Router();
const {
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  createDemoMessage,
  getMessagesByWaId,         
} = require('../controller/messageController');

// GET /messages
router.get('/', getAllMessages);

// GET /messages/:id
router.get('/:id', getMessageById);

// PATCH /messages/:id/status
router.patch('/:id/status', updateMessageStatus);

// POST /messages       
router.post('/', createDemoMessage);

// GET /messages/waId/:waId 
router.get('/waId/:waId', getMessagesByWaId);

module.exports = router;
