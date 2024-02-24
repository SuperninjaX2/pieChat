const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const msgModel = require("./models/Message");
const exphbs = require('hbs'); // Import Express Handlebars

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
<<<<<<< HEAD
app.get('/msgs', function(req, res) {
  msgModel.findAll()
    .then(messages => {
      res.json(messages);
    })
    .catch(err => {
      console.error('Error fetching messages:', err);
      res.status(500).send('Error fetching messages');
    });
});

=======
>>>>>>> 7a70e5b2c32763cb1768c435da3b9a0fecf2668e
app.post('/send', function(req, res) {
  // Extract JSON data from request body
  const { message } = req.body;

  // Check if message is provided
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Create a new message instance
  const newMsg = msgModel.build({
    message: message
  });

  // Save the message to the database
  newMsg.save()
    .then(savedMsg => {
      res.status(201).json(savedMsg);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Start server
const startServer = () => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is already in use. Trying another port...`);
      setTimeout(() => {
        startServer(); // Try starting the server again
      }, 1000);
    } else {
      console.error('Server error:', err);
    }
  });
};

// Initialize Sequelize and start server
const main = async () => {
    await msgModel.sync({ force: true });

    startServer();
}

// Entry point
main();

module.exports = app;
