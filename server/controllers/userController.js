const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const UserServices = require("./services/userServices");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: true, message: 'All fields are required' });
  }

  // Check if user already exists
  const isUser = await UserServices.findByEmail(email);
  if (isUser) {
    return res.status(400).json({ error: true, message: `Email ${email} is already registered` });
  }

  // Hash password when registering
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "72h" }
  );

  return res.status(201).json({
    error: false,
    user: { username: user.username, email: user.email },
    accessToken,
    message: "Registration Successful"
  });
};

module.exports = { registerUser };
