require("dotenv").config();

const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');

async function connectDB() {
  try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB successfully.");
  }catch (e) {
    console.error("Error connecting to MongoDB:", e);
    process.exit(1);
  }
}
module.exports = { connectDB };
