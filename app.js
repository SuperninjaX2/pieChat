const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//models
var msgModel= require("./models/Msg")

const app = express()

// Sequelize initialization function
const initSequelize = async () => {
  const sequelize = new Sequelize('sqlite::memory:') // Example SQLite database, replace with your database configuration
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
await msgModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");
// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Initialize Sequelize
const main = async () => {
  await initSequelize();
  startServer();
};

// Start server
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


// Entry point
main();

module.exports = app;
