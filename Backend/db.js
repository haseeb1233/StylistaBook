const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    const mongoDBURL = process.env.MONGO_DB;
    await mongoose.connect(mongoDBURL, {});
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
