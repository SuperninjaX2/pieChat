const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require("../config/database");

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures email is unique for each user
    validate: {
      isEmail: true, // Validates email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // Consider using a hashing algorithm for password storage
  },
  // Other relevant user attributes can be added here
}, {
  // Model options
  timestamps: true, // Automatically adds createdAt and updatedAt columns
});

module.exports = User;
