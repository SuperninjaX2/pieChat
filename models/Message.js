const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Ensure correct import path

const MSG = sequelize.define('MSG', {
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Other model options go here
});

module.exports = MSG;
