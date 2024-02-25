var express = require('express');
var sequelize = require("../config/database")
let MSG = require("../models/Message")
var router = express.Router();

/* POST send message route. */
router.post('/send', function(req, res, next) {
  // Extract JSON data from request body
  const { message } = req.body;

  // Check if message is provided
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Create a new message instance
  const newMsg = MSG.build({
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

module.exports = router;
