const express = require('express');
const router = express.Router();
const { processPayloads } = require('../controller/payloadController');

router.get('/process', async (req, res) => {
  try {
    await processPayloads();
    res.send('All payloads processed successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing payloads');
  }
});

module.exports = router;