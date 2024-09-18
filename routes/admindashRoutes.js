const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


 router.get('/admindash', 
  // connectEnsureLogin.ensureLoggedIn(), 
  (req, res) => {
 res.render('admindash', {
   user: req.user,
 });
  });
  
// Route for handling POST requests to '/admindash'
router.post('/admindash', (req, res) => {
  console.log(req.body);  // Logs the data sent from the client (form, etc.) to the console
  res.json(req.body);     // Sends the same data back to the client in JSON format
});

// Logout route
router.get("/logout", (req, res) => {
 if (req.session) {  // Checks if the user has an active session
   req.session.destroy((err) => {  // Destroys the session (logs out the user)
     if (err) {  // If there's an error while logging out
       return res.status(500).send("Error logging out");  // Sends an error message
     }
     res.redirect("/");  // Redirects the user to the homepage after logout
   });
 }
});

  
   module.exports = router;