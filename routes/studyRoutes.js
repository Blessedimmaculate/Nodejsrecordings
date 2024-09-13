const express = require('express');
const router = express.Router();
const passport = require ('passport');
const connectEnsureLogin = require('connect-ensure-login');


router.use(passport.initialize());
router.use(passport.session());

//import model
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
  return res
  .status(400)
  .send("Not registered, a user with a similar email already exists!");
  }
  const user = new Signup(req.body);
  await Signup.register(user, req.body.password, (err) => {
  if (err) {
  throw err;
  }
  res.redirect("/workersList");
  });
  } catch (err) {
  res.status(400).render("signup", { tittle: "Signup" });
  console.log("Signup user error", err);
  }
  });


// // Login admin page
// router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
// (req, res) => {
// req.session.user = req.user; 
// if(req.user.role === "manager"){
//  res.redirect("/mngdash");
// } else if(req.user.role === "salesagent"){
//  res.redirect("/agentdash");
// } else {
// res.send("user with that role does not exist in the system")
// }

// }
// );

router.get('/workersList', 
  // connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
  try {
      const signupItems = await Signup.find().sort({ $natural: -1 }); //this is for sorting the new produce up
      res.render('signuplist', {
          title: "Signup List",
          signups: signupItems,
          user: req.user 
      });

  } catch (error) {
      res.status(404).send("Unable to find items in the db");
  }
});




router.get("/updateSignup/:id",
  //  connectEnsureLogin.ensureLoggedIn(), 
   async (req, res) => {
    try {
        const item = await Signup.findOne({ _id: req.params.id })
        res.render("updateSignup", {
            signup: item,
            title: "Update Produce",
            user: req.user
        })
    } catch(error) {
        res.status(400).send("Unable to find item in the database");
    }
    
    
});


// post updated signup
router.post("/updateSignup", async (req, res) => {
    try {
        await Signup.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/workersList");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});

// delete signup
router.post("/deleteSignup", async (req, res) => {
    try {
    await Signup.deleteOne({ _id: req.body.id });
    res.redirect("back");
    } catch (err) {
    res.status(400).send("Unable to delete item in the database");
    }
    });


 //reports route

    
    router.get('/reports',  
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
      });
      
    
    



module.exports = router;