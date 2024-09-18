const express = require('express');
const router = express.Router();


 router.get('/', (req, res) => {
 res.render('welcome');
  });
  
  // router.post('/', (req, res) => {
  //  console.log(req.body);
  //    //res.json(req.body); 
  //    const newsignup = new signup(req.body)
  // newsignup.save()
  // res.redirect('/signup')
  // });
  
   module.exports = router;