const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Route to render the manager dashboard
router.get('/mngdash', 
  connectEnsureLogin.ensureLoggedIn(), // Ensure user is logged in
  (req, res) => {
    res.render('mngdash', {
      user: req.user, // Pass user data to the view
    });
  }
);

// Route to handle POST requests to /mngdash
router.post('/mngdash', (req, res) => {
  console.log(req.body);
  res.json(req.body); 
});

// Logout route
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
