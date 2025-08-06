const mongoose = require('mongoose');

const ProcessedMessageSchema = new mongoose.Schema({
  msgId: { type: String, unique: true, required: true },
  waId: String,
  from: String,
  body: String,
  type: String,
  timestamp: Date,
  status: { type: String, default: 'sent' }
}, {
  collection: 'processed_messages'
});

module.exports = mongoose.model('ProcessedMessage', ProcessedMessageSchema);