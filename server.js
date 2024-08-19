// Dependencies
const express = require("express");
const path = require("path"); //path is inbuilt not installed
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",  //can be like an id "secret" can change and named anything
  resave: false,  //we don't want to save d sessions
  saveUninitialized: false  //we don't want to keep details of those who hv bn providing wrong emails
});

// helps us to connect to d .env file
require("dotenv").config();  // Load environment variables

// INSTANTIATIONS
const app = express();
const port = 3001;


const Register = require("./models/register")

// import models
// CONFIGURATIONS
// IMPORT ROUTES
const registerRoutes = require("./routes/registerRoutes");
const studyRoutes = require("./routes/studyRoutes");
const stockListRoutes = require("./routes/stockListRoutes");


// Database connection to mongoose
// 
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });



// PUG FILE
// Set d view engine to pug
app.set("view engine", "pug"); //specifies the view engine is pug
app.set("views", path.join(__dirname, "views")); //specifies d view directory

// MIDDLEWARE
// The first two lines enable settings though they hv app.use
app.use(express.static(path.join(__dirname, "public"))); //specify a folder for static files
app.use(express.urlencoded({ extended: true })); //helps to parse data for forms
app.use(express.json()); //helps to capture data in json format


// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
passport.use(Register.createStrategy());
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());


// ROUTES
app.use("/", registerRoutes);
app.use("/", studyRoutes);
app.use("/", stockListRoutes);

// for non existing pages
app.get("*", (req, res) => {
  res.send("error! Page does not exist");
});

// bootstrapping a server
// app.listen(3001, () => console.log('listening on port 3001'));
app.listen(port, () => console.log(`listening on port ${port}`));
