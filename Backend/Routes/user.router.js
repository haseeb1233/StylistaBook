const express = require('express');
const nodemailer = require("nodemailer");
const UserModel = require('../Models/user.model');
const randomstring = require("randomstring");
const userrouter = express.Router();
const bcrypt = require('bcrypt');
const path = require("path");
// const passport = require("passport");
const passport = require("../google-outh");


const { BlacklistModel } = require("../Models/blacklist");
const auth = require("../Middleware/auth");
const jwt = require('jsonwebtoken');

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
    const { name, email, password, role } = req.body;
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(401).send({ msg: "User Already Registered" });
    }

    const hash = await bcrypt.hash(password, 8);

    const newUser = new UserModel({ name, email, password: hash, role });

    const userData = await newUser.save();
    if (userData) {
      sendVerificationMail(name, email, userData._id);
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
    const isUserPresent = await UserModel.findOne({ email });
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

    if (tokenData && tokenData._id) {
      res.cookie("userId", tokenData._id.toString(), { maxAge: 1000 * 60 });
      res.sendFile(path.join(__dirname, "../public/pages/resetpassword.html"));
    } else {
      res.status(400).send({ success: false, msg: "This link has expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route to change the user's password
userrouter.post("/change-password", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).send({ success: false, msg: "User ID not found" });
    }

    const userToken = await UserModel.findById(userId);
    if (userToken) {
      const password = req.body.password;
      const newPassword = await updatePassword(password);

      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );

      res.status(200).send({ success: true, msg: "Password changed successfully" });
    } else {
      res.status(400).send({ success: false, msg: "This link has expired" });
    }
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
      return res.status(400).send({ success: false, msg: "This email doesn't exist" });
    }

    if (!user.isVerified) {
      return res.status(301).send({ success: false, msg: "Please verify your email" });
    }

    const randomString = randomstring.generate();
    await UserModel.updateOne({ email }, { $set: { token: randomString } });
    sendResetPassword(user.name, email, randomString);

    res.status(200).send({ success: true, msg: "Reset password email has been sent to your email" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route to verify email
userrouter.get("/verify", async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await UserModel.updateOne(
      { _id: userId },
      { $set: { isVerified: true } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "Email already verified" });
    }

    res.sendFile(path.join(__dirname, "../public/pages/verify.html"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route to add token to blacklist
userrouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(403);
    let blackListedToken = new BlacklistModel({ token });
    await blackListedToken.save();
    res.send({ msg: "Logout successful" });
  } catch (error) {
    res.send(error.message);
  }
});

// Delete user route
userrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteUsers = await UserModel.findByIdAndDelete({ _id: id });
  return res.status(200).send({ msg: "User Deleted" });
});

// To send verification link again
userrouter.post("/sendlink", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      sendVerificationMail(user.name, user.email, user._id);
      res.status(200).send({ msg: "Verification mail sent to your email" });
    } else {
      res.status(400).send({ msg: "This email doesn't exist" });
    }
  } catch (error) { }
});

module.exports = userrouter;





//some part is working//


// const express = require('express')
// const nodemailer = require("nodemailer")
// const UserModel = require('../Models/user.model')
// const randomstring = require("randomstring");
// const userrouter = express.Router()
// const bcrypt = require('bcrypt')
// const app = express()
// const path = require("path");
// const passport = require("passport")
// const {BlackListModel}=require("../Models/blacklist")
// app.use(express.static(path.join(__dirname, "public")));
// const authmid=require("../Middleware/auth")

// const jwt = require('jsonwebtoken')


// const sendVerificationMail = async (name, email, userId) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: "itsmahendramohane11@gmail.com",
//         pass: "llqgdfjnfaayufuk",
//       },
//     });

//     const mailOptions = {
//       from: "itsmahendramohane11@gmail.com",
//       to: email,
//       subject: "For verification mail",
//       html: `<p>Hi ${name}, please click here to <a href="http://localhost:8000/user/verify?id=${userId}">verify</a> your mail</p>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // 
// const sendResetPassword = async (username, email, token) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: "itsmahendramohane11@gmail.com",
//         pass: "llqgdfjnfaayufuk",
//       },
//     });

//     const mailOptions = {
//       from: "itsmahendramohane11@gmail.com",
//       to: email,
//       subject: "For reset password",
//       html: `<p>Hi ${username}, please click here to <a href="http://localhost:8000/user/reset-password">reset </a> your password</p>`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// //********for google auth******************

// userrouter.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// userrouter.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     session: false,
//   }),
//   async function (req, res) {
//     const fetch_user = await userModel.findOne({ email: req.user.email });
//     if (fetch_user) {
//       token_Genretor(res, fetch_user.name, fetch_user._id, fetch_user.role);
//     } else {
//       console.log(req.user)
//       req.user.password = bcrypt.hashSync(req.user.password, 2);
//       const user = new userModel(req.user);
//       await user.save();
//       token_Genretor(res, req.user.name, "login with google", "customer");
//     }
//   }
// );


// // ***********end for google auth**********

// userrouter.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const userExist = await UserModel.findOne({ email });

//     if (userExist) {
//       return res.status(401).send({ msg: "User Already Registered" });
//     }

//     const hash = await bcrypt.hash(password, 8);

//     const newUser = new UserModel({ name, email, password: hash, role });

//     const userData = await newUser.save();
//     if (userData) {
//       sendVerificationMail(name, email, userData._id);
//       res.status(200).json({ msg: "Registration successful", userData });
//     } else {
//       res.status(401).json({ msg: "Registration failed" });
//     }
//   } catch (error) {
//     res.status(400).json({ msg: "Something went wrong" });
//   }
// });



// userrouter.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const isUserPresent = await UserModel.findOne({ email });
//     if (!isUserPresent) {
//       return res.status(401).send("user not found");
//     }
//     if (!isUserPresent.isVerified) {
//       return res.status(400).send({ msg: "You are not verified" })
//     }
//     const isPass = await bcrypt.compare(password, isUserPresent.password);
//     if (!isPass) {
//       return res.status(401).send({ msg: "invalid credential" });
//     }
//     const token = await jwt.sign(
//       {
//         userId: isUserPresent._id,
//       },
//       process.env.SECRET,
//       { expiresIn: "1hr" }
//     );
//     res.send({
//       msg: "login success",
//       token,
//       username: isUserPresent.name,
//       userId: isUserPresent._id,
//       isVerified: isUserPresent.isVerified,
//       role: isUserPresent.role
//     });
//   } catch (error) {
//     res.status(401).send(error.message);
//   }
// });

// // 
// const updatePassword = async (password) => {
//   try {
//     const hasPass = await bcrypt.hash(password, 8);
//     return hasPass;
//   } catch (error) {
//     throw new Error("Failed to hash password");
//   }
// };


// userrouter.post("/reset-password", async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     const decoded = jwt.verify(token, process.env.SECRET)
//     const tokenData = await UserModel.findOne({ _id: decoded.userId })
// console.log(decoded)

// // //new aaadi//

// // const userinDB=await UserModel.findById(decoded.userId)
// // const {oldPassword,newPassword}=req.body;
// // const compare=bcrypt.compare(oldPassword,userinDB.password)
// // if(!compare){
// //   return res.json("pls provide correct password")
// // }

// // // userinDB.password=new password
// // const dataTodb=UserModel.findByIdAndUpdate(decoded.userId,{password:newPassword})
// // console.log(dataTodb)
// // return res.json("password reset done")


// // //

//     if (tokenData && tokenData._id) {
//       console.log(tokenData._id.toString());
//       res.cookie("userId", tokenData._id.toString(), { maxAge: 1000 * 60 });
//       res.sendFile(path.join(__dirname, "../public/pages/resetpassword.html"));
//     } else {
//       res.status(400).send({ success: false, msg: "This link expired" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// });

// userrouter.post("/change-password", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     if (!userId) {
//       return res.status(400).send({ success: false, msg: "User ID not found" });
//     }

//     const userToken = await UserModel.findById(userId);
//     if (userToken) {
//       const password = req.body.password;
//       const newPassword = await updatePassword(password);

//       await UserModel.findByIdAndUpdate(
//         { _id: userId },
//         { $set: { password: newPassword, token: "" } },
//         { new: true }
//       );

//       res.status(200).send({ success: true, msg: "Password changed successfully" });
//     } else {
//       res.status(400).send({ success: false, msg: "This link expired" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// });

// userrouter.post("/forget-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).send({ success: false, msg: "This email doesn't exist" });
//     }

//     if (!user.isVerified) {
//       return res.status(301).send({ success: false, msg: "Please verify your email" });
//     }

//     const randomString = randomstring.generate();
//     await UserModel.updateOne({ email }, { $set: { token: randomString } });
//     sendResetPassword(user.username, email, randomString);

//     res.status(200).send({ success: true, msg: "Reset password email is sent to your email" });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// });



// userrouter.get("/verify", async (req, res) => {
//   try {
//     const userId = req.query.id;

//     const user = await UserModel.updateOne(
//       { _id: userId },
//       { $set: { isVerified: true } }
//     );
//     if (!user) {
//       return res
//         .status(404)
//         .json({ error: "User not found" });
//     }

//     if (user.isVerified) {
//       return res.status(200).json({ message: "Email already verified" });
//     }

//     res.sendFile(path.join(__dirname, "../public/pages/verify.html"));
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// userrouter.get("/logout", async (req, res) => {
//   try {
//     const token = req.headers?.authorization;
//     if (!token) return res.status(403);
//     let blackListedToken = new BlackListModel({ token });
//     await blackListedToken.save();
//     res.send({ msg: "logout succesfull" });
//   } catch (error) {
//     res.send(error.message);
//   }
// });



// userrouter.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params
//   const deleteUsers = await UserModel.findByIdAndDelete({ _id: id })
//   return res.status(200).send({ msg: "User Deleted" })
// })

// // To send verification link again

// userrouter.post("/sendlink", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await UserModel.findOne({ email: email });
//     if (user) {
//       sendVerificationMail(user.name, user.email, user._id);
//       res.status(200).send({ msg: "Verification mail sent to your mail" });
//     } else {
//       res.status(400).send({ msg: "This mail don't exist" });
//     }
//   } catch (error) { }
// });



// module.exports = userrouter
