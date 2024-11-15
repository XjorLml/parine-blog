require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const config = require("./config/config.json");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Connect to MongoDB Atlas (without deprecated options)
mongoose.connect(config.connectionString)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const User = require("./models/user.model");

const { authenticateToken } = require("./utilities");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
    return res.status(200).json({ message: "Server is running" });
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: true, message: 'All fields are required' });
    }
  
    // Check if user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: true, message: `Email ${email} is already registered` });
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
  
    try {
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
        message: "Registration successful"
      });
    } catch (err) {
      console.error("Error during user registration:", err);  // Log server-side error details
      return res.status(500).json({ error: true, message: 'Server error, please try again later' });
    }
  });
  
app.post("/login", async(req, res) =>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message: "Email and Password are required"});
    }

    const user = await User.findOne({email});
    if (!user){
        return res.status(400).json({message: "User doesn't exist"});
    }  

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "72h" }
    );

    return res.status(201).json({
        error: false,
        user: { username: user.username, email: user.email },
        accessToken,
        message: "Login Successful"
    });
});

app.get("/get-user", authenticateToken, async (req, res) => {
    const { userId } = req.user;


    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: "",
    });
});


app.listen(8000, () => {
    console.log('Server running on port 8000');
});
