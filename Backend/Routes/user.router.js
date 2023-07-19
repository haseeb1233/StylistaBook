const express = require('express')
const nodemailer = require("nodemailer")
const UserModel = require('../Models/user.model')
// const randomstring = require("randomstring");
const userrouter = express.Router()
const bcrypt = require('bcrypt')
const app = express()
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


const jwt = require('jsonwebtoken')
const { BlacklistModel } = require('../Google_Oauth/models/blacklist')


//verification mail here //


const sendVerificationMail = async (name, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "itsmahendramohane11@gmail.com",
        pass: "123456",
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

// mail reset password here //


const sendResetPassword = async (username, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "itsmahendramohane11@gmail.com",
        pass: "123456",
      },
    });

    const mailOptions = {
      from: "itsmahendramohane11@gmail.com",
      to: email,
      subject: "For reset password",
      html: `<p>Hi ${username}, please click here to <a href="http://localhost:8000/user/reset-password?token=${token}">reset </a> your password</p>`,
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

//registration part here...//

userrouter.post("/register", async (req, res) => {
    try {
      const { name, email, password ,role} = req.body;
  
      const userExist = await UserModel.findOne({ email });
  
      if (userExist) {
        return res.status(401).send({ msg: "User Already Registered" });
      }
  
      const hash = await bcrypt.hash(password, 8);
  
      const newUser = new UserModel({ name, email, password: hash,role });
  
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
  
//login here....//



  userrouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const isUserPresent = await UserModel.findOne({ email });
      if (!isUserPresent) {
        return res.status(401).send("user not found");
      }
      const isPass = await bcrypt.compare(password, isUserPresent.password);
      if (!isPass) {
        return res.status(401).send({ msg: "invalid credential" });
      }
      const token = await jwt.sign(
        {
          userId: isUserPresent._id,
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );
      res.send({
        msg: "login success",
        token,
        username: isUserPresent.name,
        userId: isUserPresent._id,
        isVerified:isUserPresent.isVerified,
        role: isUserPresent.role
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });

  // update the password here..//

  const updatePassword = async (password) => {
    try {
      const hasPass = await bcrypt.hash(password, 8);
      return hasPass;
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  };
  
  //reset the password here...//
  userrouter.get("/reset-password", async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await UserModel.findOne({ token });
  
      if (tokenData && tokenData._id) {
        console.log(tokenData._id.toString());
        res.cookie("userId", tokenData._id.toString(), { maxAge: 1000 * 60 });
        res.sendFile(path.join(__dirname, "../public/pages/resetpassword.html"));
      } else {
        res.status(400).send({ success: false, msg: "This link expired" });
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });
  

  //..chage the password here ..
  userrouter.post("/change-password", async (req, res) => {
    try {
      const userId = req.cookies.userId;
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
        res.status(400).send({ success: false, msg: "This link expired" });
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });

  // forget password here //
  
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
      sendResetPassword(user.username, email, randomString);
  
      res.status(200).send({ success: true, msg: "Reset password email is sent to your email" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });
  
 
  //verifying email here..//


  userrouter.get("/verify", async (req, res) => {
    try {
      const userId = req.query.id;
  
      const user = await UserModel.updateOne(
        { _id: userId },
        {$set:{isEmailVerified:true}}
      );
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found" });
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
  
  
  //..user logout here..//

  userrouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers?.authorization;
      if (!token) return res.status(403);
      let blackListedToken = new BlackListModel({ token });
      await blackListedToken.save();
      res.send({ msg: "logout succesfull" });
    } catch (error) {
      res.send(error.message);
    }
  });

//deleting user..//

userrouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await UserModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"User Deleted"})
})


// To send verification link again

userrouter.post("/sendlink", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      sendVerificationMail(user.name, user.email, user._id);
      res.status(200).send({ msg: "Verification mail sent to your mail" });
    } else {
      res.status(400).send({ msg: "This mail don't exist" });
    }
  } catch (error) {}
});



module.exports=userrouter