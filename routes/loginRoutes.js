const express = require('express');
const router = express.Router();
const passport = require("passport");


 router.get('/login', (req, res) => {
 res.render('login2');
  });
  
//   router.post('/login', (req, res) => {
//    console.log(req.body);
//     //  res.json(req.body); 
//    const newdash = new dash(req.body)
//   newdash.save()
//   res.redirect('/dash')
//    });


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
    res.redirect("/dash");
    res.send("Saleagent dashboard");
  } else {
    res.send("user with that role does not exist in the system");
  }
}
);

   module.exports = router;
