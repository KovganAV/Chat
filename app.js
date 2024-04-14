const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const registerRoute = require('../server/register');
const loginRoute = require('../server/login');
const logoutRoute = require('../server/logout');
const messagesRoute = require('../server/messages');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/messages', messagesRoute);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/newdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', () => {
  console.log('Connected to the database');
});
