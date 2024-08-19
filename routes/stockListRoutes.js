const express = require('express');
const router = express.Router();
const StockList = require("../models/stockList");

// Render the sales records
router.get("/viewProduce", async (req, res) => {
    try {
        const sales = await StockList.find(); // Fetch all sales records from the database
        res.render("stockList", { sales });  // Pass the sales data to the template
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).send("Server error");
    }
});

// Handle form submission (Adding a new produce)
router.post("/viewProduce", async(req, res) => {
    try {
        const produceList = new StockList(req.body);
        console.log("Print all details from stock", produceList)
        await produceList.save();
        // res.redirect("/viewProduce");  // Redirect to the sales view page
    } catch (error) {
        console.log("Error Adding Produce", error);
        res.status(400).render("stockList", { sales: [] }); // Render the page with an empty list
    }
});

module.exports = router;
