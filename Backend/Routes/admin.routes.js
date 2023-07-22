const express = require("express");
const adminRouter = express.Router();
const { UserInfo } = require("../Models/user.model")

const mongoose = require("mongoose");
const cors = require("cors");
adminRouter.use(cors());

// code here//

module.exports = {
    adminRouter
}
