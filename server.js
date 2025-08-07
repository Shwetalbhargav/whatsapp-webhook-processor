
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const payloadRoutes = require('./route/payloadRoutes');
const messageRoutes   = require('./route/messageRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'https://whatsapp-webclone-m898e8ynh-shwetals-projects.vercel.app/'  }));


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
