const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require('dotenv').config();

const UserModel=require('./schemas/user.schema');
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET

const UserController=require('./controllers/userController');
// ----
let mongoose =require('mongoose');
const myDB = mongoose.connection.useDb('projecttracker');
// -------
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // -------------
    const usercollection = myDB.collection("usermodels");
    // Check if the document exists
    const existingObject = await usercollection.findOne({userid:profile.id});
    
    if (existingObject) {
      console.log('OBJECT ALREADY EXISTS:', profile.id);
    } else {
      const user=new UserModel({
        userid: profile.id,
        username: profile.displayName,
        boardIds: []
    });
    user.save();
    }
    return done(null,profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});