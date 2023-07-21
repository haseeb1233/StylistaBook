const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["customer", "stylist"],
    default: "customer",
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;



