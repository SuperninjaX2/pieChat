const { Sequelize } = require('sequelize');
const msgModel = require("../models/Message"); // Corrected import path

const sequelize = new Sequelize('sqlite::memory:'); // Example SQLite database, replace with your database configuration

const initSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await msgModel.sync({ force: true }); // Syncing msgModel
  console.log("The table for the Message model was just (re)created!"); // Corrected log message
};

initSequelize(); // Call initSequelize function to authenticate and sync models

module.exports = sequelize; // Exporting the sequelize instance
