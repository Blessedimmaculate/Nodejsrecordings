const express = require("express");
const router = express.Router();

const Credit = require("../models/credit");


router.get("/creditSale", async (req, res) => {
    res.render('credit');
})

router.post("/creditSale", async (req, res) => {
    try {
        const dueSale = new Credit(req.body);
        await dueSale.save();
        res.redirect("/creditList");
    } catch (error) {
       res.status(400).send("Unable to make credit sale");
    }
});


router.get('/creditList', async (req, res) => {
    try {
      const salesData = await Credit.find(); // Retrieve all sales from the database
      res.render('creditList', { salesData }); // Render the list view with the sales data
    } catch (err) {
      res.status(500).send('Error retrieving sales data');
    }
  });
  

module.exports = router;   