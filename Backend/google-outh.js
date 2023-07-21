require("dotenv").config();

const passport = require('passport');

const { UserModel }= require("./Models/user.model")

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const  {v4:uuidv4} = require("uuid");


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile, cb) {
    let email = profile._json.email
  const user = new UserModel({
    email,
    password: uuidv4()
  })

  try {
    await user.save();
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
  
  
    // await user.save()
    // const {_id,password} = user;
    // const payload = {
    //     email,
    //     id,
    //     password,
    //     url: profile._json.picture
    // }

  }
));

module.exports=passport