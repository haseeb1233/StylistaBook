const jwt = require("jsonwebtoken");

const StylistModel = require("../Models/stylist");
const { BlacklistModel } = require("../Models/Blacklist");
require("dotenv").config();
const stylistAuth = async (req, res, next) => {
  try {
    const blacklist = req.headers.authorization.split(" ")[1];
    console.log("token from headers", blacklist);
    const isblacklisted = await BlacklistModel.findOne({ blacklist });
    if (isblacklisted) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const decoded = jwt.verify(blacklist, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    const stylist = await StylistModel.findById(decoded.stylistId);
    console.log(decoded);
    if (!stylist) {
      return res.status(401).json({ error: "Professinoal not found" });
    }

    req.stylistID = stylist._id;

    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid Token" });
    console.log(
      "error from stylist auth--------------------------------------------------------- ",
      error
    );
  }
};

module.exports = stylistAuth;

// console.log(process.env.JWT_SECRET_KEY);
