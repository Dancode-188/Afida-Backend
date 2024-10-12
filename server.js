const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Define routes
app.use('/api/contributions', require('./routes/contributions'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
