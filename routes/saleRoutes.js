const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Produce = require("../models/stock");
const Register = require("../models/register");

// Add a Sale - Display Form
router.get("/addSale/:id", async (req, res) => {
  try {
    const agents = await Register.find({ role: "salesagent" });
    const produce = await Produce.findById(req.params.id);
    res.render("add_sale", { title: "Add Sale", agents, produce });
  } catch (error) {
    res.status(400).send("Unable to load the page");
  }
});

// Add a Sale - Handle Submission
router.post("/addSale/:id", async (req, res) => {
  try {
    const { saleTonnage } = req.body;
    const produce = await Produce.findById(req.params.id);
    if (!produce) return res.status(404).send("Produce not found");
    if (produce.tonnage < saleTonnage)
      return res.status(400).send(`Not enough stock. Only ${produce.tonnage} Kgs available`);

    const sale = new Sale(req.body);
    await sale.save();
    produce.tonnage -= saleTonnage;
    await produce.save();
    const sales = await Sale.find().sort({ $natural: -1 });
    return res.render("sales_list1", { title: "Sales List", sales });
      } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// View Sales List
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
       res.render("sales_list1", { title: "Sales List", sales });
      } catch (error) {
          res.status(500).send("Unable to load sales list");
  }
});

// Update Sale - Display Form
router.get("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("produceName", "produceName")
      .populate("salesAgent", "username");
    const agents = await Register.find({ role: "salesagent" });
    res.render("edit_sale", { title: "Edit Sale", sale, agents });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update Sale - Handle Submission
router.post("/updateSale/:id", async (req, res) => {
  try {
    await Sale.findOneAndUpdate(req.params.id, req.body);
    res.redirect("/salesList");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete Sale
router.post("/deleteSale/:id", async (req, res) => {
  try {
    const saleId = req.params.id; // Get the sale ID from the URL parameters
    await Sale.deleteOne({ _id: saleId }); // Delete the sale with the specific ID
    res.redirect("back"); // Redirect back to the previous page
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});


// MAKE RECEIPT
router.get("/receipt/:id", async (req,res) => {
  try {
    const sale = await Sale.findOne({_id: req.params.id})
    .populate("produceName", "produceName"
    .populate("salesAgent", "username")
    );
    console.log("my sale", sale)
    const formatedDate = formatDate(sale.saledate);
    res.render("sales_receipt", {
      sale,
      formatedDate,
      title: "Receipt", 
    });
  } catch (error) {
    res.status(400).send("Unable to find item in the database")
  }
})

module.exports = router;
