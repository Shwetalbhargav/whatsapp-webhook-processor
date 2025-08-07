// controller/messageController.js

const mongoose = require('mongoose');
const ProcessedMessage = require('../models/ProcessedMessage');

/**
 * GET /messages
 * Return all processed messages, newest first.
 */
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ProcessedMessage
      .find({})
      .sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * GET /messages/:id
 * Return the one message/status by msgId.
 */
exports.getMessageById = async (req, res) => {
  try {
    const msg = await ProcessedMessage.findOne({ msgId: req.params.id });
    if (!msg) {
      return res.status(404).json({ error: `No message with id ${req.params.id}` });
    }
    res.json(msg);
  } catch (err) {
    console.error(`Error fetching message ${req.params.id}:`, err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * PATCH /messages/:id/status
 * Update the delivery status of a message.
 * Expects { status: "sent"|"delivered"|"read" } in body.
 */
exports.updateMessageStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Missing status in request body' });
  }

  try {
    const updated = await ProcessedMessage.findOneAndUpdate(
      { msgId: req.params.id },
      { status, timestamp: new Date() },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: `No message with id ${req.params.id}` });
    }
    res.json(updated);
  } catch (err) {
    console.error(`Error updating status for ${req.params.id}:`, err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * POST /messages
 * Create a “demo” outbound message.
 * Expects JSON body { from, to, body, type }.
 */
exports.createDemoMessage = async (req, res) => {
  const { from, to: waId, body, type } = req.body;
  if (!from || !waId || !body || !type) {
    return res.status(400).json({ error: 'Required fields: from, to, body, type' });
  }

  // generate a unique msgId
  const msgId = new mongoose.Types.ObjectId().toString();

  const msgData = {
    msgId,
    waId,
    from,
    body,
    type,
    timestamp: new Date(),
    status: 'sent'
  };

  try {
    const created = await ProcessedMessage.create(msgData);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating demo message:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getMessagesByWaId = async (req, res, next) => {
  try {
    const msgs = await ProcessedMessage
      .find({ waId: req.params.waId })
      .sort({ timestamp: 1 });
    res.json(msgs);
  } catch (err) {
    next(err);
  }
};
