const express = require('express');
const router = express.Router();
const path = require("path");


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
// the name after/ is not necessarily the file's name
// and its the one written in d browser
router.get("/learning", (req, res) => {
    res.render ("example");
})

router.post("/learning", (req, res) => {
    console.log(req.body);
})

router.get("/index", (req, res) => {
    res.render ("index");
})

router.post("/index", (req, res) => {
    console.log(req.body);
})

router.get("/", (req, res) => {
    res.render ("welcome");
})

router.get("/stock", (req, res) => {
    res.render ("status");
})

router.get("/login", (req, res) => {
    res.render ("login");
})

router.post("/login", (req, res) => {
    console.log(req.body);
    res.json(req.body)
})



router.get("/fname", (req, res) => {
    res.render ("quotes");
})

router.post("/fname", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});




// We are exporting and must be there
// This helps to access data in d terminal
module.exports = router;
