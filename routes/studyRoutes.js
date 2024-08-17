const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // new
    res.send('Homepage! Hello world.');
});

router.get("/first", (req, res) => {
    res.sendFile (__dirname + "/index.html");
})

router.get("/quotes", (req, res) =>{
    res.sendFile (__dirname + "/quotes.html");
})

router.post("/quotes", (req, res) =>{
   console.log(req.body);
})

// We are exporting and must be there
// This helps to access data in d terminal
module.exports = router;