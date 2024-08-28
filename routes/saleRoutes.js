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

    res.redirect("/salesList");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// View Sales List
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("produceName", "produceName")
      .populate("salesAgent", "firstName lastName");
    res.render("sales_list", { title: "Sales List", sales });
  } catch (error) {
    res.status(400).send("Unable to load sales list");
  }
});

// Update Sale - Display Form
router.get("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("produceName", "produceName")
      .populate("salesAgent", "firstName lastName");
    const agents = await Register.find({ role: "salesagent" });
    res.render("edit_sale", { title: "Edit Sale", sale, agents });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update Sale - Handle Submission
router.post("/updateSale/:id", async (req, res) => {
  try {
    await Sale.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/salesList");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete Sale
router.post("/deleteSale/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.redirect("/salesList");
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
