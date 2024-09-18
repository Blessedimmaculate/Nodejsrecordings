const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


<<<<<<< HEAD
 router.get('/agentdash', 
    connectEnsureLogin.ensureLoggedIn(),
   (req, res) => {
=======
 router.get('/agentdash', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
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