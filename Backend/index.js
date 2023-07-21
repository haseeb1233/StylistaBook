const express = require("express");
const cors = require("cors")
require("dotenv").config()
const passport = require('passport');
require('./google-outh'); 
const port = process.env.PORT
const cookiParser = require("cookie-parser");
const connectDB = require("./db");
const app = express();
const bodyParser = require('body-parser');
app.use(passport.initialize());
app.use(express.json())
app.use(cors())

const userrouter = require("./Routes/user.router")

const auth = require("./Middleware/auth")

app.use(cookiParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userrouter)

//server setup here.....//

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server is running at 8000");
});
