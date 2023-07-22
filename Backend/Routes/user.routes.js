//********UPDATED CODE WITH  EMAIL VERIFICATION******


const express = require("express");
const nodemailer = require("nodemailer");
const userrouter = express.Router();
const { UserInfo } = require("../Models/user.model")
const mongoose = require("mongoose");
userrouter.use(express.json());
const cors = require("cors");
userrouter.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { passport } = require("../Configs/google.auth");
const { googleAuthentication } = require("../Controllers/user.controller");

const JWT_SECRET = "mahendra";

const sendVerificationMail = async (name, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "itsmahendramohane11@gmail.com",
        pass: "llqgdfjnfaayufuk",
      },
    });

    const mailOptions = {
      from: "itsmahendramohane11@gmail.com",
      to: email,
      subject: "For verification mail",
      html: `<p>Hi ${name}, please click here to <a href="http://localhost:8000/user/verify?id=${userId}">verify</a> your mail</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendResetPassword = async (username, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "itsmahendramohane11@gmail.com",
        pass: "llqgdfjnfaayufuk",
      },
    });

    const mailOptions = {
      from: "itsmahendramohane11@gmail.com",
      to: email,
      subject: "For reset password",
      html: `<p>Hi ${username}, please click here to <a href="http://localhost:8000/user/reset-password">reset</a> your password</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Google OAuth routes
userrouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userrouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    const fetch_user = await UserModel.findOne({ email: req.user.email });
    if (fetch_user) {
      token_Generator(res, fetch_user.name, fetch_user._id, fetch_user.role);
    } else {
      req.user.password = bcrypt.hashSync(req.user.password, 2);
      const user = new UserModel(req.user);
      await user.save();
      token_Generator(res, req.user.name, "login with google", "customer");
    }
  }
);

// User registration route
userrouter.post("/register", async (req, res) => {
  try {
    const { fname,lname, email, password,userType } = req.body;
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(401).send({ msg: "User Already Registered" });
    }

    const hash = await bcrypt.hash(password, 8);

    const newUser = new UserInfo({ fname,lname, email, password: hash, userType});

    const userData = await newUser.save();

    if (userData) {
      sendVerificationMail(`${fname} ${lname}`, email, userData._id);
      res.status(200).json({ msg: "Registration successful", userData });
    } else {
      res.status(401).json({ msg: "Registration failed" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

// User login route
userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await UserInfo.findOne({ email });
    if (!isUserPresent) {
      return res.status(401).send("User not found");
    }
    if (!isUserPresent.isVerified) {
      return res.status(400).send({ msg: "You are not verified" });
    }
    const isPass = await bcrypt.compare(password, isUserPresent.password);
    if (!isPass) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    const token = await jwt.sign(
      {
        userId: isUserPresent._id,
      },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    res.send({
      msg: "Login success",
      token,
      username: isUserPresent.name,
      userId: isUserPresent._id,
      isVerified: isUserPresent.isVerified,
      role: isUserPresent.role,
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// Function to update password with bcrypt hashing
const updatePassword = async (password) => {
  try {
    const hashPass = await bcrypt.hash(password, 8);
    return hashPass;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
};

// Route to request a password reset
userrouter.post("/reset-password", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    const tokenData = await UserModel.findOne({ _id: decoded.userId });
    if (!tokenData) {
      throw new Error("User not found");
    }
    const password = req.body.password;
    const hashPass = await updatePassword(password);
    tokenData.password = hashPass;
    await tokenData.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route to change the user's password
userrouter.post("/change-password", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const tokenData = await UserModel.findOne({ _id: userId });
    if (!tokenData) {
      throw new Error("User not found");
    }
    const isPass = await bcrypt.compare(oldPassword, tokenData.password);
    if (!isPass) {
      return res.status(401).send({ msg: "Invalid old password" });
    }
    const hashPass = await updatePassword(newPassword);
    tokenData.password = hashPass;
    await tokenData.save();
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route to request password reset by email
userrouter.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1hr",
    });
    const tokenData = new TokenModel({ userId: user._id, token });
    await tokenData.save();
    sendResetPassword(user.name, email, token);
    res.status(200).json({ msg: "Reset password link has been sent" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route to verify email
userrouter.get("/verify", async (req, res) => {
  try {
    const token = req.query.id;
    const data = await TokenModel.findOne({ token });
    if (!data) {
      throw new Error("Token not found");
    }
    const userData = await UserModel.findOne({ _id: data.userId });
    if (!userData) {
      throw new Error("User not found");
    }
    userData.isVerified = true;
    await userData.save();
    res.send("Email verified successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route to add token to blacklist
userrouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const blacklistToken = new BlacklistModel({ token });
    await blacklistToken.save();
    res.send("Logout successful");
  } catch (error) {
    res.send(error.message);
  }
});

// Delete user route
userrouter.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await UserModel.deleteOne({ _id: userId });
    res.send("User deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

// To send verification link again
userrouter.post("/sendlink", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("User is already verified");
    }

    sendVerificationMail(user.name, email, user._id);
    res.status(200).json({ msg: "Verification link sent again" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

module.exports = userrouter;



//**************UPDATED CODE END HERE+**************** */



//*******************WORKING CODE HERE  **********************/


// const express = require("express");
// const userrouter = express.Router();
// const { UserInfo } = require("../Models/user.model")

// const mongoose = require("mongoose");
// userrouter.use(express.json());
// const cors = require("cors");
// userrouter.use(cors());
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const { passport } = require("../Configs/google.auth");
// const { googleAuthentication } = require("../Controllers/user.controller");

// // const { passport } = require("../Config/google-oauth")

// const JWT_SECRET = "mahendra";

// //********registration herte************* */
// userrouter.post("/register", async (req, res) => {
//   const { fname, lname, email, password } = req.body;
//   const userType = "customer"

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await UserInfo.findOne({ email });

//     if (oldUser) {
//       return res.json({ error: "User Exists" });
//     }
//     await UserInfo.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });
//     res.send({ status: "User Register Successfully" });
//   } catch (error) {
//     res.send({ status: "something went wrong", err: error.message });
//   }
// });

// //***************log in here******** */

// userrouter.post("/login-user", async (req, res) => {
//   const { email, password } = req.body;
//   console.log('--->', req.body);

//   try {
//     const user = await UserInfo.findOne({ email });
//     if (!user) {
//       return res.json({ error: "User Not found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ email: user.email }, JWT_SECRET, {
//         expiresIn: "15m",
//       });

//       // if (res.status(201)) {
//       return res.json({ status: "ok", data: token, userID: user._id, userDetails: user });
//       // } else {
//       // return res.json({ error: "error" });
//       // }
//     } else {
//       return res.json({ status: false, message: "Invalid Password" });

//     }
//   } catch (error) {
//     res.json({ status: "error", message: error.message });
//   }
// });

// //*****************reset password here*************** */
// userrouter.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await UserInfo.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: encryptedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// });

// // *************google auth******************//


// userrouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// userrouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session:false }), googleAuthentication )

// module.exports = userrouter;