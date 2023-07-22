const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistModel = require("../Models/blacklist");
const StylistModel = require("../Models/stylist");
// const stylistAuth = require("../Middlewares/stylistAuth");
require("dotenv").config();
const stylistRouter = express.Router();

//-------------------------- Register New stylist -----------------------------------

stylistRouter.post("/register", async (req, res) => {
  try {
    let { name, email, phone, password, image, salonName, address, bio } =
      req.body;

    const existingUser = await StylistModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already registered Please Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    req.body.password = hashedPassword;
    const newUser = new StylistModel({
      name,
      email,
      phone,
      password: hashedPassword,
      image,
      salonName,
      address,
      bio,
      otp: "1234",
      isEmailVerified: true,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message:
        "Stylist registered successfully. Please check your email for the OTP.",

      stylist: {
        id: savedUser._id,
        name,
        email,
        phone,
        image,
        salonName,
        address,
      },
    });
  } catch (error) {
    console.error("Error registering stylist:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

stylistRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const stylist = await StylistModel.findOne({ email });
    if (!stylist) {
      return res.status(404).json({ message: "stylist not found" });
    }

    const isPasswordValid = bcrypt.compare(password, stylist.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { stylistId: stylist._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // });

    res.json({
      token,
      stylist: {
        id: savedUser._id,
        name: stylist.name,
        email: stylist.email,
        phone: stylist.phone,
        image: stylist.image,
        salonName: stylist.salonName,
        address: stylist.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// stylistRouter.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const stylist = await StylistModel.findOne({ email });

//     if (!stylist || stylist.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     stylist.emailVerified = true;
//     await user.save();

//     return res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// Auth for all route ---------------------

// stylistRouter.use(stylistAuth);

// ------------------------- stylist  profile  --------------------------

stylistRouter.get("/profile", async (req, res) => {
  try {
    const stylistId = req.userId;
    const stylist = await StylistModel.findById(stylistId);

    if (!stylist) {
      return res.status(404).json({ message: "stylist not found" });
    }

    let { _id, name, email, phone, image, salonName, address } = stylist;
    return res
      .status(200)
      .json({ _id, name, email, phone, image, salonName, address });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//------------------- Update stylist Profile---------------------
// stylistRouter.patch("/profile", async (req, res) => {
//   try {
//     const stylistId = req.stylist._id;

//     const updates = req.body;

//     const stylist = await StylistModel.findByIdAndUpdate(stylistId, updates, {
//       new: true,
//     });

//     if (!stylist) {
//       return res.status(404).json({ error: "stylist not found" });
//     }

//     res.json(stylist);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to update stylist profile" });
//   }
// });

// ---------------Change Password-------------------
// stylistRouter.patch("/changePassword", async (req, res) => {
//   try {
//     const stylistId = req.stylist._id;

//     const { currentPassword, newPassword } = req.body;

//     const stylist = await StylistModel.findById(stylistId);

//     if (!stylist) {
//       return res.status(404).json({ error: "stylist not found" });
//     }
//     const isMatch = await bcrypt.compare(currentPassword, stylist.password);

//     if (!isMatch) {
//       return res.status(401).json({ error: "Invalid current password" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 5);

//     stylist.password = hashedPassword;
//     await stylist.save();

//     res.json({ message: "Password changed successfully" });
//   } catch (error) {
//     res.status(400).json({ error: "Failed to change password" });
//   }
// });

// -------------Forgot Password ----with OTP------------------------
// stylistRouter.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     const stylist = await StylistModel.findOne({ email });

//     if (!stylist) {
//       return res.status(404).json({ error: "stylist not found" });
//     }

//     await sendOtp(stylist.email, otp);

//     stylist.otp = otp;
//     await stylist.save();

//     res.json({ message: "OTP sent to email" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to initiate password reset" });
//   }
// });

//---------------- Reset Password-------- Verify OTP and Update Password---------------------
// stylistRouter.patch("/reset-password", async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const stylist = await StylistModel.findOne({ email });

//     if (!stylist) {
//       return res.status(404).json({ error: "stylist not found" });
//     }

//     if (stylist.resetOtp !== otp) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 5);

//     stylist.password = hashedPassword;
//     stylist.otp = null;
//     await stylist.save();

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to reset password" });
//   }
// });

// -------------------single stylist details-------------

// stylistRouter.get("/single/:id", async (req, res) => {
//   try {
//     const stylistId = req.params.id;

//     const stylist = await StylistModel.findById(stylistId);

//     if (!stylist) {
//       return res.status(404).json({ message: "stylist not found" });
//     }

//     res.json(stylist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// -----------delete stylist---------------------
// stylistRouter.delete("/:id", async (req, res) => {
//   try {
//     const stylistId = req.params.id;
//     const deletedUser = await stylist.findByIdAndDelete(stylistId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "stylist not found" });
//     }

//     res.json({ message: "stylist deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// -----------------logout stylist  by  blacklisting------------------

stylistRouter.post("/logout", async (req, res) => {
  const { token } = req.body;

  const newBlacklistedToken = new BlacklistModel({ token });
  await newBlacklistedToken.save();

  res.json({ message: "Token revoked successfully" });
});

// -----------------------get all stylists ----------------------------
stylistRouter.get("/allstylist", async (req, res) => {
  try {
    const stylists = await StylistModel.find();

    res.json(stylists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = stylistRouter;
