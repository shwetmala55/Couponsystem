
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a schema for the user details
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Handle POST request for signup form submission
router.post('/signup', async (req, res) => {
  // Extract the form data from req.body
  const { username, email, password } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.json({ message: 'Signup successful' });
  } catch (error) {
    // Handle any errors that occurred during saving
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});
router.post('/login', async (req, res) => {
 const { email, password } = req.body;

 try {
   // Find the user in the database
   const user = await User.findOne({ email });

   if (!user) {
     // User not found, return error response
     return res.status(404).json({ message: 'User not found' });
   }

   // Check if the password matches
   if (user.password !== password) {
     // Incorrect password, return error response
     return res.status(401).json({ message: 'Incorrect password' });
   }

   // Login successful, return success response
   res.json({ message: 'Login successful' });
 } catch (error) {
   // Handle any errors that occurred during login
   console.error('Login error:', error);
   res.status(500).json({ message: 'Login failed' });
 }
});
module.exports = router;
/************ */
