const express = require('express');
const router = express.Router();



router.get("/addWorker", (req, res) => {
    res.render ("register");
})

router.post("/addWorker", (req, res) => {
    console.log(req.body) //prints to d console
    res.json(req.body); //returns data to d browser ina json format
})

module.exports = router;