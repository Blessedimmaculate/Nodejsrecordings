const express = require('express');
const router = express.Router();
const passport = require("passport");


 router.get('/login', (req, res) => {
 res.render('login2');
  });
  


   // Login admin   local stands for a local strategy
router.post( "/login",passport.authenticate("local", { failureRedirect: "/login" }),
(req, res) => {
  //Session is d tym from wn one logs in until he logs out 
  req.session.user = req.user; //assigning a session to a user who has logged in
// Roles are obtained from the register page in a way they a indeted
  if (req.user.role === "manager") {
    res.redirect("/mngdash");
    res.send("Manager dashboard");
  } else if (req.user.role === "salesagent") {
    res.redirect("/agentdash");
    res.send("Saleagent dashboard");
  } 
  else if (req.user.role === "administrator") {
    res.redirect("/admindash");
    res.send("Admin dashboard");
  }else {
    res.send("user with that role does not exist in the system");
  }
}
);

   module.exports = router;
