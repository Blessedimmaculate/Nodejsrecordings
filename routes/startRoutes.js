const express = require('express');
const router = express.Router();


 router.get('/', (req, res) => {
 res.render('welcome');
  });
<<<<<<< HEAD

=======
  
  // router.post('/', (req, res) => {
  //  console.log(req.body);
  //    //res.json(req.body); 
  //    const newsignup = new signup(req.body)
  // newsignup.save()
  // res.redirect('/signup')
  // });
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
  
   module.exports = router;