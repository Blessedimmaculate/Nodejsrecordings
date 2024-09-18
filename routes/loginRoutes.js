const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login2');
});

// Route to handle login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), 
  (req, res) => {
    req.session.user = req.user; // Assigning a session to a user who has logged in
    
    if (req.user.role === 'manager') {
      res.redirect('/mngdash');
    } else if (req.user.role === 'salesagent') {
      res.redirect('/agentdash');
    } else if (req.user.role === 'administrator') {
      res.redirect('/admindash');
    } else {
      res.status(400).send('User with that role does not exist in the system');
    }
  }
);

module.exports = router;
