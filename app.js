
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const exphbs = require('hbs');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const msgModel = require("./models/Message");

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Express Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Get all messages
app.get('/msgs', async (req, res) => {
  try {
    const messages = await msgModel.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

// Get message by id
app.get('/msg/:id', async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await msgModel.findByPk(messageId);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new message
app.post('/send', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  try {
    const newMsg = await msgModel.create({
      message: message
    });
    res.status(201).json(newMsg);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// delete msg
// ... (existing code)

// Delete a message by ID
app.delete('/msg/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await msgModel.findByPk(messageId);
    if (message) {
      await message.destroy(); // Delete the message
      res.json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (existing code)
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying another port...`);
  } else {
    console.error('Server error:', err);
  }
});

// Initialize Sequelize
const main = async () => {
  await msgModel.sync({ force: true });
};

// Entry point
main();

module.exports = app;
