const express = require("express");
const router = express.Router();
const passport = require("passport");

//we hv to import the model after schema
// Double dots help u to jump out of d folder u are in
const Stock = require("../models/stock");
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


router.get("/start", (req, res) => {
    res.render ("login");
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


router.get("/addProduce", (req, res) => {
  res.render("stock");
});

// router.post("/addProduce", (req, res) => {
//     const newStock = new Stock(req.body)
//     newStock.save()  //wn u save u want to go to another page
//     //for now i hv used the route i have already n u use the names inside
//     // we redirect to a route not a route file name
//     res.redirect("/start")

// newProduce is d value dat we instantiate n assign it a value wea the database wc is Stock
// Range of 400 stands for errors and 200 for success
router.post("/addProduce", async (req, res) => {
  try {
    const newProduce = new Stock(req.body);
    //dis below helps us to see wc data is going to be pushed to d db
    console.log("Print all details", newProduce);
    await newProduce.save();
    res.redirect("/viewProduce");
  } catch (error) {
    // res.status(400).render("stock");
    res.status(400).send("Unable to save produce to db");
    console.log("Error Adding Produce", error);
  }
});
// if U use error as err please be coinsistent
// we rendered stock so dat in case of any error we can get this page back
// Render  works with pages/pug file, Redirect works with routes

// U hv to export d router always n import the routes
// After this U go to the server file


// WN REDIRECTING USERS TO DIFF PAGES
// router.get("/makeSale", (req, res) => {
//     res.render ("addSale");
// });

// router.post( "/start", async(req, res) =>(req, res) => {
//     req.session.user = req.user;
//     try {
//         const newSale = new Sale(req.body)
//         newSale.save()
//  EITHER
//         if (req.user.role === "manager") {
//             res.redirect("/salesList");
//           } if (req.user.role === "salesagent") {
//             // res.redirect("/salesdashboard");
//             res.redirect("/receipt");
//           } 
//   OR
//             res.redirect("/receipt");
//     } 
//         catch (error) {
//         console.log("Make sale error", error)
//     }
    
// });

router.get("/viewUser", (req, res) => {
    res.render ("registerList");
});

router.post("/viewUser",)

module.exports = router;
