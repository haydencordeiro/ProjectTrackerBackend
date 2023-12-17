const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const boardRoute = require("./routes/board");
const app = express();
require('./db.js');
const UserController=require("./controllers/userController");

app.use(
  cookieSession({ name: "session", keys: ["asdukfhakhdahkf"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5174/ProjectTracker/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/board", boardRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});

app.post('/adduser',(req,res) => UserController.createNewUser(req,res));

