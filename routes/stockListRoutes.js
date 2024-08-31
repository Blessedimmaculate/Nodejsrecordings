const express = require('express');
const router = express.Router();
const Stock = require("../models/stock");
const Sale = require("../models/Sale"); // Ensure you have Sale model imported

// Route to handle making a sale
router.post("/makeSale/:id", async (req, res) => {
  try {
    const { saleTonnage, amountPaid, buyerName, salesAgent, date, time } = req.body;
    const produce = await Stock.findById(req.params.id);

    if (!produce) {
      return res.status(404).send("Produce not found");
    }
    

    const newSale = new Sale({
      produceName: produce.produceName,
      saleTonnage,
      amount: amountPaid,
      buyerName,
      salesAgent,
      saledate: new Date(date),
      timeSale: time
    });

    await newSale.save();
    produce.tonnage -= saleTonnage;
    await produce.save();

    res.redirect("/viewProduce"); // Redirect to the updated produce list
  } catch (error) {
    console.error("Error making sale:", error);
    res.status(500).send("Internal server error");
  }
});



// router.get("/makeSale", async (req, res) => {
//     res.render("sales");
//   });
  
//   // Route to handle the submission of a new sale
//   router.post("/makeSale", async (req, res) => {
//     try {
//       const newSale = new NewSale(req.body);
//       await newSale.save();
//       res.redirect("/salesList");
//     } catch (error) {
//       console.error("Error saving sale to database:", error);
//       res.status(400).send("Unable to save sale to db");
//     }
//   });

router.get("/addProduce", async (req, res) => {
    res.render("stock");
})

router.post("/addProduce", async (req, res) => {
    try {
        const newProduce = new Stock(req.body);
        await newProduce.save();
        res.redirect("/viewProduce");
    } catch (error) {
        res.status(400).send("Unable to save produce to db");
    }
});

router.get("/viewProduce", async (req, res) => {
    try {
        const procuredProduce = await Stock.find().sort({ $natural: -1 });
        res.render("stockList", {
            title: "Stock List",
            produces: procuredProduce,
        });
    } catch (error) {
        res.status(400).send("Unable to find items in the database");
    }
});

router.get("/updateProduce/:id", async (req, res) => {
    try {
        const item = await Stock.findOne({ _id: req.params.id });
        res.render("updateStock", {  
            title: "Update Produce",
            produce: item,
        });
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
});

router.post("/updateProduce", async (req, res) => {
    try {
        await Stock.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/viewProduce");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});

router.post("/deleteProduce", async (req, res) => {
    try {
        await Stock.deleteOne({ _id: req.body.id });
        res.redirect("back");
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
});

module.exports = router;
