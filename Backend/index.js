const express = require("express");
const connectDB = require("./db");
const app = express();

require("dotenv").config();
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server is running at 8000");
});
