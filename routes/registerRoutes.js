const express = require('express');
const router = express.Router();

//we hv to import the model after schema
// Double dots help u to jump out of d folder u are in
const Stock = require("../models/stock")


router.get("/addWorker", (req, res) => {
    res.render ("register");
});

router.post("/addWorker", (req, res) => {
    console.log(req.body) //prints to d console
    res.json(req.body); //returns data to d browser ina json format
});


router.get("/addProduce", (req, res) => {
    res.render ("stock");
});

// router.post("/addProduce", (req, res) => {
//     const newStock = new Stock(req.body)
//     newStock.save()  //wn u save u want to go to another page
//     //for now i hv used the route i have already n u use the names inside
//     // we redirect to a route not a route file name
//     res.redirect("/start")
   
// newProduce is d value dat we instantiate n assign it a value wea the database wc is Stock
// Range of 400 stands for errors and 200 for success
router.post("/addProduce", async(req, res) => {
    try{
        const newProduce = new Stock(req.body)
        //dis below helps us to see wc data is going to be pushed to d db
        console.log("Print all details", newProduce)
        await newProduce.save()
        res.redirect("/viewProduce")
    } catch (error) {
        res.status(400).render("stock")
        console.log("Error Adding Produce", error)
    }
});
// if U use error as err please be coinsistent
// we rendered stock so dat in case of any error we can get this page back
// Render  works with pages/pug file, Redirect works with routes

// U hv to export d router always n import the routes
// After this U go to the server file
module.exports = router;