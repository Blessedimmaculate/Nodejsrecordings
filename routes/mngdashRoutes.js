const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


 router.get('/mngdash', 
   connectEnsureLogin.ensureLoggedIn(), 
  (req, res) => {
 res.render('mngdash', {
   user: req.user,
 });
  });
  
  router.post('/mngdash', (req, res) => {
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