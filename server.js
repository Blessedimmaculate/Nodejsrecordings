// Dependencies
const express = require("express");
const path = require("path"); // Path is inbuilt, not installed
const moment = require("moment");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",  // This can be changed and named anything
  resave: false,  // We don't want to resave sessions
  saveUninitialized: false  // We don't want to save uninitialized sessions
});

// Load environment variables
require("dotenv").config();

// INSTANTIATIONS
const app = express();
const port = process.env.PORT || 3001;

// Import models
const Register = require("./models/register");

// Import routes
const registerRoutes = require("./routes/registerRoutes");
const studyRoutes = require("./routes/studyRoutes");
const stockListRoutes = require("./routes/stockListRoutes");
const saleRoutes = require("./routes/saleRoutes");
const agentRoutes = require('./routes/agentRoutes');
const creditRoutes = require("./routes/creditRoutes");

// Database connection
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
app.locals.moment = moment;
app.set("view engine", "pug"); // Specifies the view engine is pug
app.set("views", path.join(__dirname, "views")); // Specifies the view directory

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public"))); // Specifies a folder for static files
app.use(express.urlencoded({ extended: true })); // Helps to parse data from forms
app.use(express.json()); // Helps to capture data in JSON format

// Express session configurations
app.use(expressSession); // Use express session
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Helps to use passport session in routes

// Passport configuration for Register model
passport.use(Register.createStrategy()); // Use the local strategy in routes
passport.serializeUser(Register.serializeUser()); // Serializes the user for the session
passport.deserializeUser(Register.deserializeUser()); // Deserializes the user from the session

// ROUTES
app.use("/", registerRoutes);
app.use("/", studyRoutes);
app.use("/", stockListRoutes);
app.use("/", saleRoutes);
app.use('/', agentRoutes);
app.use("/", creditRoutes);

// Handle non-existing pages
app.get("*", (req, res) => {
  res.send("Error! Page does not exist.");
});

// Bootstrapping the server
app.listen(port, () => console.log(`Listening on port ${port}`));
