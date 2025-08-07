require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path      = require('path');
const cors      = require('cors');

// bring in your routes
const payloadRoutes      = require('./route/payloadRoutes');
const messageRoutes      = require('./route/messageRoutes');
const conversationRoutes = require('./route/conversationRoutes');

const app = express();

// CORS setup (leave yours as-is)
const allowed = [
  process.env.CLIENT_URL,
  /^https:\/\/.*\.vercel\.app$/,
  'http://localhost:3000'
];
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    const ok = allowed.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (ok) return cb(null, true);
    cb(new Error(`CORS denied: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to DB
connectDB();

// Health‐check root
app.get('/', (req, res) =>
  res.send('Hello from my WhatsApp webhook processor!')
);

// Mount your routes
app.use('/payload',      payloadRoutes);       // GET /payload/process  (or POST / if you add it)
app.use('/messages',     messageRoutes);       // GET /messages, /:id, /waId/:waId, POST, PATCH
app.use('/conversations',conversationRoutes);  // GET /conversations

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
