var express = require('express');
var sequelize = require("../config/database")
let MSG = require("../models/Message")
var router = express.Router();

/* GET home page. */
router.get('/send', function(req, res, next) {
  const newMsg = MSG.build({
  message:"hello"
});
newMsg.save()
  .then(() => {
    console.log('User created successfully!');
  })
  .catch(err => {
    console.error('Error creating user:', err);
  });
});

module.exports = router;
