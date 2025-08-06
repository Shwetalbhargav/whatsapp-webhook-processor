
const fs = require('fs');
const path = require('path');
const ProcessedMessage = require('../models/ProcessedMessage');

const processPayloads = async () => {
  const dataDir = path.join(__dirname, '../data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  console.log('Processing payload files from', dataDir, '→', files);

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const raw = fs.readFileSync(filePath);
    const json = JSON.parse(raw);
    const value = json.metaData.entry[0].changes[0].value;

    if (value.messages) {
      await handleMessages(value);
    }
    if (value.statuses) {
      await handleStatuses(value);
    }
  }
};

const handleMessages = async (value) => {
  const waId = value.contacts[0].wa_id;
  for (const msg of value.messages) {
    const msgData = {
      msgId: msg.id,
      waId,
      from: msg.from,
      body: msg.text.body,
      type: msg.type,
      timestamp: new Date(Number(msg.timestamp) * 1000)
    };
    await ProcessedMessage.updateOne(
      { msgId: msg.id },
      { $setOnInsert: msgData },
      { upsert: true }
    );
  }
};

const handleStatuses = async (value) => {
  for (const stat of value.statuses) {
    await ProcessedMessage.findOneAndUpdate(
      { msgId: stat.meta_msg_id },
      { status: stat.status }
    );
  }
};

module.exports = { processPayloads };