// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db/config'); // Ensures tables are created

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', reviewRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
