const connectDB = require('./config/db');
const { processPayloads } = require('./controllers/payloadController');

(async () => {
  await connectDB();
  await processPayloads();
  console.log('Payload processing complete');
  process.exit(0);
})();