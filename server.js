
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const payloadRoutes = require('./route/payloadRoutes');
const messageRoutes   = require('./route/messageRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

// typo fix: make sure this really reads “const”
const allowed = [
  process.env.CLIENT_URL,                 
  /^https:\/\/.*\.vercel\.app$/,          
  'http://localhost:3000'                 
];

const corsOptions = {
  origin(origin, cb) {
    
    if (!origin) return cb(null, true);

    
    const ok = allowed.some(o =>
      typeof o === 'string'
        ? o === origin
        : o.test(origin)
    );

    if (ok) return cb(null, true);

    cb(new Error(`CORS denied: ${origin}`));
  },
  credentials: true
};


app.use(cors(corsOptions));


app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB Atlas
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Hello from my WhatsApp webhook processor!');
});
app.use('/payload', payloadRoutes);
app.use('/messages', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
