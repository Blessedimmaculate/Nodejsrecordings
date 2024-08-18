const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // new
    res.send('Homepage! Hello world.');
});


// THE ROUTE NAME SHD NOT ALWAYS BE THE NAME OF THE FILE
// THE NAME OF YO PUG IS D ONE AFTER __dirname+
router.get("/first", (req, res) => {
    res.sendFile (__dirname + "/index.html");
})

router.get("/quotes", (req, res) =>{
    res.sendFile (__dirname + "../views/quotes.html");
})

router.post("/quotes", (req, res) =>{
   console.log(req.body);
})



// AFTER USING PUG
router.get("/example", (req, res) => {
    res.render ("example");
})

// We are exporting and must be there
// This helps to access data in d terminal
module.exports = router;