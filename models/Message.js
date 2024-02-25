
 // Ensure correct import path
const { Sequelize, DataTypes }= require('sequelize');

const sequelize = require("../config/database")

const MSG = sequelize.define('MSG', {
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Other model options go here
});

module.exports = MSG;
