// models/ProcessedMessage.js
const mongoose = require('mongoose');

const ProcessedMessageSchema = new mongoose.Schema({
  msgId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  waId: {
    type: String,
    required: true,
    index: true
  },
  from: {
    type: String
  },
  body: {
    type: String
  },
  type: {
    type: String
  },
  timestamp: {
    type: Date,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  }
});

module.exports = mongoose.model('ProcessedMessage', ProcessedMessageSchema);
