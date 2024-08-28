const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");
const Register = require("../models/register");
const Stock = require("../models/stock");
const NewSale = require("../models/newSale");

// Route to display the form for making a sale
// router.get("/makeSale", async (req, res) => {
//   res.render("sales");
// });

// // Route to handle the submission of a new sale
// router.post("/makeSale", async (req, res) => {
//   try {
//     const newSale = new NewSale(req.body);
//     await newSale.save();
//     res.redirect("/salesList");
//   } catch (error) {
//     console.error("Error saving sale to database:", error);
//     res.status(400).send("Unable to save sale to db");
//   }
// });            

router.get("/addSale/:id", async (req, res) => {
  try {
    const agents = await Signup.find({ role: "salesagent" });
    const produce = await Produce.findOne({ _id: req.params.id });
    res.render("add_sale", {
      title: "Sale",
      agents: agents,
      produce: produce,
    });
  } catch (error) {
    res.status(400).send("Unable to find sales agents in the database");
  }
});

router.post("/addSale/:id", async (req, res) => {
  try {
    const { saleTonnage } = req.body;
    // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
    const produce = await Produce.findById({ _id: req.params.id });
    if (!produce) {
      return res.status(404).send("produce not found");
    }

    if (produce.tonnage < saleTonnage) {
      return res
        .status(400)
        .send(
          `Not enough tones in stock,there are ${produce.tonnage} Kgs in stock`
        );
    }
    if (produce && produce.tonnage > 0) {
      const newsale = new Sale(req.body);
      await newsale.save();
      produce.tonnage -= saleTonnage; // short form of what is below
      // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
      await produce.save();
      res.redirect("/salesList");
    } else {
      return res.status(404).json({ error: "Produce out of stock" });
    }
  } catch (error) {
    console.error("Error saling produce:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// retrieve sales from the database
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ $natural: -1 })
      .populate("produceName", "produceName")
      .populate("salesAgent", "firstName lastName");
    res.render("sales_list", {
      title: "Sales List",
      sales: sales,
    });
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
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

// MAKE RECEIPT
router.get("/receipt/:id", async (req,res) => {
  try {
    const sale = await Sale.findOne({_id: req.params.id})
    .populate("produceName", "produceName")
    .populate("salesAgent", "username")
    
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
