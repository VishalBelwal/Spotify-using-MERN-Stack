const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/Helpers");

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName, userName } = req.body;

    // Check if the user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "A user with the same email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName
    });

    // Log the new user object to check the hashed password
    console.log("New user to save:", newUser);

    await newUser.save();

    // Generate token for the new user
    const token = await getToken(email, newUser);

    // Prepare user object to return
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    // Generate token for the user
    const token = await getToken(user.email, user);

    // Prepare user object to return
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
