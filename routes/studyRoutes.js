const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

// Middleware for Passport
router.use(passport.initialize());
router.use(passport.session());

// Import models
const Signup = require('../models/signup');
const Procure = require('../models/procure');
const Sales = require('../models/sales');
const Credit = require('../models/credit');

// Register admin
router.get("/addWorker", (req, res) => {
  res.render("signup", { title: "Signup" });
});

router.post("/addWorker", async (req, res) => {
  try {
    const existingUser = await Signup.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("A user with this email already exists!");
    }
    const user = new Signup(req.body);
    await Signup.register(user, req.body.password, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/workersList");
    });
  } catch (err) {
    res.status(400).render("signup", { title: "Signup" });
    console.log("Signup user error", err);
  }
});

// Workers list
router.get('/workersList', 
  // Uncomment the line below if you want to ensure the user is logged in
  // connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
    try {
      const signupItems = await Signup.find().sort({ $natural: -1 });
      res.render('signuplist', {
        title: "Signup List",
        signups: signupItems,
        user: req.user 
      });
    } catch (error) {
      res.status(404).send("Unable to find items in the database");
    }
  }
);

// Update Signup
router.get("/updateSignup/:id", 
  // Uncomment the line below if you want to ensure the user is logged in
  // connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
    try {
      const item = await Signup.findOne({ _id: req.params.id });
      res.render("updateSignup", {
        signup: item,
        title: "Update Signup",
        user: req.user
      });
    } catch (error) {
      res.status(400).send("Unable to find item in the database");
    }
  }
);

// Post updated signup
router.post("/updateSignup", async (req, res) => {
  try {
    await Signup.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/workersList");
  } catch (err) {
    res.status(404).send("Unable to update item in the database");
  }
});

// Delete signup
router.post("/deleteSignup", async (req, res) => {
  try {
    await Signup.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete item in the database");
  }
});

// Reports route
router.get('/reports', 
  // Uncomment the line below if you want to ensure the user is logged in
  // connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
    try {
      const procure = await Procure.aggregate([
        { $group: { _id: null, totalcost: { $sum: '$totalcost' }, stock: { $sum: '$stock' } } }
      ]);

      const sales = await Sales.aggregate([
        { $group: { _id: null, totalpayment: { $sum: '$totalpayment' }, tonnage: { $sum: '$tonnage' } } }
      ]);

      const credit = await Credit.aggregate([
        { $group: { _id: null, totalamountDue: { $sum: '$totalamountDue' }, tonnage: { $sum: '$tonnage' } } }
      ]);

      res.render('report', {
        procure: procure[0] || {},
        sales: sales[0] || {},
        credit: credit[0] || {},
        user: req.user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
