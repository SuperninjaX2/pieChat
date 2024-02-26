
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const exphbs = require('hbs');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const msgModel = require("./models/Message");
const userModel = require("./models/user");

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

// ROUTES

// Delete a message by ID
app.delete("/msg/:id", async (req, res) => {
  // Extract the message ID from the URL parameters
  const messageId = req.params.id;

  try {
    // Find the message in the database
    const message = await msgModel.findByPk(messageId);

    if (message) {
      // Delete the message if found
      await message.destroy();
      res.json({ message: "Message deleted successfully" }); // Send success response
    } else {
      res.status(404).json({ error: "Message not found" }); // Send 404 if message not found
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); // Send 500 if error occurs
  }
});

app.post("/signUp", async (req, res) => {
  // Extract message details from request body
  const { firstName, lastName, number } = req.body;

  // Validate that message is provided
  if (!message) {
    return res.status(400).json({ error: "Message is required" }); // Send 400 if message is missing
  }

  try {
    // Create a new user in the database
    const newUser = await userModel.create({
      firstName,
      lastName,
      number,
    });

    // Send a 201 response with the created user information
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); // Send 500 if error occurs
  }
});

app.post("/login", async (req, res) => {
  // Extract username and password from request body
  const { username, number } = req.body;

  try {
    // Validate user input (ensure username and password are provided)
    if (!username || !number) {
      return res
        .status(400)
        .json({ error: "Username and password are required" }); // Send 400 if credentials are missing
    }

    // Query the database to find a matching user
    const user = await userModel.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" }); // Send 401 if user not found
    }

    // Compare the provided password with the stored hash using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" }); // Send 401 if password incorrect
    }

    // Create a session or token upon successful login (replace with your preferred method)
    req.session.user = user;

    // Send a success response with message
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" }); // Send 500 if error occurs
  }
});

// SERVER SETUP

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying another port...`);
    } else {
      console.error("Server error:", err);
    }
  });

// DATABASE INITIALIZATION

// Initialize Sequelize models
const main = async () => {
  await msgModel.sync({ force: true }); // Synchronize message model with database schema
  await userModel.sync({ force: true }); // Synchronize user model with database schema
};

// Entry point
main();

// EXPORT

module.exports = app;
