const express = require("express");
const router = express.Router();
const passport = require("passport");

//we hv to import the model after schema
// Double dots help u to jump out of d folder u are in

const Register = require("../models/register");             


// REGISTER
router.get("/addWorker", (req, res) => {
  res.render("register", {title: "Register"});
});
// router.post("/addWorker", (req, res) => {
//     console.log(req.body) //prints to d console
//     res.json(req.body); //returns data to d browser ina json format
// });

// Register admin
router.post("/addWorker", async (req, res) => {
  try {
    // added
    const existingUser = await Register.findOne({ email: req.body.email }); //check if user already exists
    if (existingUser) {
      return res
        .status(400)
        .send("Not registered, a user with a similar email already exists!");
    }
    const user = new Register(req.body);
    // await user.save() //saves any info dat doesn't require logging in
    // We use our collection Register
    await Register.register(user, req.body.password, (err) => {
      //Here we want d password to be hashed for privacy
      // The .register is an inbuilt mthd
      //used to register a user who will later login
      if (err) {
        throw err;
      }
      res.redirect("/start");
    });
  } catch (err) {
    res.status(400).render("register", { tittle: "Signup" });
    console.log("Signup user error", err);
  }
});


// router.get("/start", (req, res) => {
//     res.render ("login");
// });
// // Login admin   local stands for a local strategy
// router.post( "/start",passport.authenticate("local", { failureRedirect: "/start" }),
//   (req, res) => {
//     //Session is d tym from wn one logs in until he logs out 
//     req.session.user = req.user; //assigning a session to a user who has logged in
// // Roles are obtained from the register page in a way they a indeted
//     if (req.user.role === "manager") {
//       // res.redirect("/managerdashboard");
//       res.send("Manager dashboard");
//     } else if (req.user.role === "salesagent") {
//       // res.redirect("/salesdashboard");
//       res.send("Saleagent dashboard");
//     } else {
//       res.send("user with that role does not exist in the system");
//     }
//   }
// );

router.get("/start", (req, res) => {
  res.render ("login2");
});
// Login admin   local stands for a local strategy
router.post( "/start",passport.authenticate("local", { failureRedirect: "/start" }),
(req, res) => {
  //Session is d tym from wn one logs in until he logs out 
  req.session.user = req.user; //assigning a session to a user who has logged in
// Roles are obtained from the register page in a way they a indeted
  if (req.user.role === "manager") {
    // res.redirect("/managerdashboard");
    res.send("Manager dashboard");
  } else if (req.user.role === "salesagent") {
    // res.redirect("/salesdashboard");
    res.send("Saleagent dashboard");
  } else {
    res.send("user with that role does not exist in the system");
  }
}
);



// Logout route  destroys a session wn the user logs out
router.get("/logout", (req, res) => {
    if (req.session) {
    req.session.destroy((err) => {
    if (err) {
    return res.status(500).send("Error logging out");
    }
    res.redirect("/");
    });
    }else {   //not working
        console.log("You don't have a session");
    }
    });


router.get("/viewUser", (req, res) => {
    res.render ("registerList");
});

router.post("/viewUser",)

module.exports = router;
