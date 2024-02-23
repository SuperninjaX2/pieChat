const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
 // Corrected import path
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const msgModel = require("./models/Message"); // Properly declared and formatted import

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

    startServer()
}
// Entry point
main();

module.exports = app;
