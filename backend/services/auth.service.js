const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const registerUser = async ({ username, email, password}) => {
    //Check if user already exists
    const existingUser = await User.findOne({ email }); 
    if(existingUser) {
      return { error: 'User already exists with this email' };
    }else {
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return { message: 'User registered successfully', userId: newUser._id };
    }
}

const loginUser = async ({ email, password }) => {
    //check if user is in the database
    const user = await User.findOne({ email});
    if(!user) {
      return { error: 'User not found' };
    }

    //if user exists, compare password 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return { error: 'Invalid password' };
    }

    //Create payload for JWT
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    //if password matches, generate JWT token and return to client
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return { message: 'Login successful', token };
}



module.exports = { registerUser, loginUser };