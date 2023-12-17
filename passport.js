const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require('dotenv').config();

const UserModel=require('./schemas/user.schema');
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET

const UserController=require('./controllers/userController');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
    const existingObject = await UserModel.findOne({userid:profile.id});
    console.log(existingObject)
    if (existingObject) {
      console.log('OBJECT ALREADY EXISTS:', profile.id);
    } else {
      const user=new UserModel({
        userid: profile.id,
        username: profile.displayName,
        boards: []
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