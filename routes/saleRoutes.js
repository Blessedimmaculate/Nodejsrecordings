const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");
const Register = require('../models/register');
const Stock = require('../models/stock');


// Route to display the form for adding a new sale
router.get("/addSale/:id", async (req, res) => {
  try {
    const agents = await Register.find({ role: "salesagent" });
    const produce = await Stock.findById(req.params.id);
    if (!produce) {
      return res.status(404).send("Produce not found");
    }
    res.render("add_sale", { title: "Add Sale", agents, produce });
  } catch (error) {
    console.error("Error retrieving agents or produce:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle the submission of a new sale
router.post("/addSale/:id", async (req, res) => {
  try {
    const { saleTonnage } = req.body;
    const produce = await Stock.findById(req.params.id);

    if (!produce) {
      return res.status(404).send("Produce not found");
    }

    if (produce.tonnage < saleTonnage) {
      return res.status(400).send(`Not enough stock, only ${produce.tonnage} Kgs available`);
    }

    const newSale = new Sale(req.body);
    await newSale.save();

    produce.tonnage -= saleTonnage;
    await produce.save();

    res.redirect("/salesList");
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to display the list of all sales
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("produceName", "produceName")
      .populate("salesAgent", "firstName lastName")
      .sort({ $natural: -1 });

    res.render("sales_list", { title: "Sales List", sales });
  } catch (error) {
    console.error("Error retrieving sales:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to display the form for editing an existing sale
router.get("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("produceName", "produceName")
      .populate("salesAgent", "firstName lastName");

    if (!sale) {
      return res.status(404).send("Sale not found");
    }

    const agents = await Register.find({ role: "salesagent" });
    res.render("edit_sale", { title: "Edit Sale", sale, agents });
  } catch (error) {
    console.error("Error retrieving sale or agents:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle the submission of an edited sale
router.post("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!sale) {
      return res.status(404).send("Sale not found");
    }

    res.redirect("/salesList");
  } catch (error) {
    console.error("Error updating sale:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle the deletion of a sale
router.post("/deleteSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).send("Sale not found");
    }

    res.redirect("/salesList");
  } catch (error) {
    console.error("Error deleting sale:", error);
    res.status(500).send("Internal server error");
  }
});


// // RECEIPT
// router.get("/receipt/:id", async (req, res) => {
//   try {
//     const sale = await Sale.findOne(req.params.id)
//       .populate("produceName", "produceName")
      //  const formattedDate = formatDate(sale.saledate);
      //  res.render("")

//     if (!sale) {
//       return res.status(404).send("Sale not found");
//     }

//     const agents = await Register.find({ role: "salesagent" });
//     res.render("edit_sale", { title: "Edit Sale", sale, agents });
//   } catch (error) {
//     console.error("Error retrieving sale or agents:", error);
//     res.status(500).send("Internal server error");
//   }
// });
module.exports = router;
