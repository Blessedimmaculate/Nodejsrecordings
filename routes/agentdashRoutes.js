const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


 router.get('/agentdash', 
    connectEnsureLogin.ensureLoggedIn(),
   (req, res) => {
 res.render('agentdash', {
  user: req.user
 });
  });
  
  router.post('/agentdash', (req, res) => {
   console.log(req.body);
     res.json(req.body);
  });

  // Logout route
router.get("/logout", (req, res) => {
  if (req.session) {
  req.session.destroy((err) => {
  if (err) {
  return res.status(500).send("Error logging out");
  }
  res.redirect("/");
  });
  }
  });
  
   module.exports = router;