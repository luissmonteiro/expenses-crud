const express = require('express');
require("dotenv/config");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const db = require('./db');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cookieParser(JWT_SECRET));
app.use(cookieSession({
  name: 'session',
  keys: [JWT_SECRET]
}));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', expenseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
