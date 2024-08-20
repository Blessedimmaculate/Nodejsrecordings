const express = require('express');
const router = express.Router();
const StockList = require("../models/stockList");

router.get("/viewProduce", async (req, res) => {
    try {
        const procuredProduce = await StockList.find();  // Use StockList model here
        res.render("stockList", {  // Make sure the Pug template name matches
            title: "Stock List", 
            produces: procuredProduce,
        });
    } catch (error) {
        res.status(400).send("Unable to find items in the database");
    }
});

module.exports = router;


// router.get("/viewProduce", async (req, res) => {
//     try {
//         //for Stock, u use where U saved in the records router coz this is a list
//         //title appears on d tab
//         //produces is wat we a gonna call it in d pug file. procuredProduce name can be maintained
//         const procuredProduce = await Stock.find();
//         res.render("stock", { title: "Stock List", 
//         produces: procuredProduce,
//         })
//     } catch (error) {
//         res.status(400).send("Unable to find items in the database")
//     }
// });



// Render the sales records
// router.get("/viewProduce", async (req, res) => {
//     try {
//         const sales = await StockList.find(); // Fetch all sales records from the database
//         res.render("stockList", { sales });  // Pass the sales data to the template
//     } catch (error) {
//         console.error("Error fetching sales data:", error);
//         res.status(500).send("Server error");
//     }
// });

// // Handle form submission (Adding a new produce)
// router.post("/viewProduce", async(req, res) => {
//     try {
//         const produceList = new StockList(req.body);
//         console.log("Print all details from stock", produceList)
//         await produceList.save();
//         // res.redirect("/viewProduce");  // Redirect to the sales view page
//     } catch (error) {
//         console.log("Error Adding Produce", error);
//         res.status(400).render("stockList", { sales: [] }); // Render the page with an empty list
//     }
// });





