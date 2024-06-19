const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");
const checkAuth = require("../middleware/checkAuth");

router.get("/me", checkAuth(false), async (req, res) => {
  const user = await User.findById(req.userId);

  return res.json({ user }).status(200);
});

// Create a new booking
router.post("/register", async (req, res) => {
  const { age, name, email, password } = req.body;

  console.log(age, name, email);

  const user = await User.findOne({ email });

  if (user) {
    return res
      .json({ error: "User already exists", success: false })
      .status(400);
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const newUser = new User({
      age,
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({ user: user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const valid = await bcryptjs.compare(password, user.password);

  if (!valid) {
    return res.json({ message: "Invalid password or email" }).status(400);
  }

  try {
    const token = jwt.sign(
      { userId: user._id, age: user.age },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
