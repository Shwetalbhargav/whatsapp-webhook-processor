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
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,              // e.g. https://yourapp.vercel.app
  /^https:\/\/.*\.vercel\.app$/,       // all Vercel previews/prod
  'http://localhost:5173',             // Vite dev
  'http://localhost:3000'              // CRA/Next dev
].filter(Boolean);                      // <-- remove undefined/null

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // server-to-server, curl, Postman
    const ok = ALLOWED_ORIGINS.some(o =>
      (typeof o === 'string' && o === origin) ||
      (o instanceof RegExp && o.test(origin))
    );
    return cb(ok ? null : new Error(`CORS denied: ${origin}`), ok);
  },
  credentials: true,
  methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 204
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
app.use('/payload',      payloadRoutes);       
app.use('/messages',     messageRoutes);      
app.use('/conversations',conversationRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
