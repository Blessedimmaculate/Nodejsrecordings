const express = require("express");
const router = express.Router();

// For managers only connectEnsureLogin.ensureLoggedIn(),
router.get(
  "/reports",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    req.session.user = req.user;
    if (req.user.role == "manager") {
      try {
        // instantiate a crop variable you will use to select a crop.
        let selectedProduce;
        if (req.query.searchProduce) selectedProduce = req.query.searchProduce;
        // Query for returning all tonnage and revenue of a produce
        let items = await Produce.find({ produceName: selectedProduce });

        // console.log("products from the db", goods)
        // console.log("products from the db after search", items)

        let totalCereals = await Produce.aggregate([
          { $match: { produceType: "cereals" } },
          {
            $group: {
              _id: "$all",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" }, // or as below
              // totalExpense: { $sum: { $multiply: [ "$produceCost", "$tonnage" ]}},
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);

        let totalLegumes = await Produce.aggregate([
          { $match: { produceType: "legume" } },
          {
            $group: {
              _id: "$all",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" },
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);
        // Get total quantity and cost of a produce
        let totalCrop = await Produce.aggregate([
          { $match: { produceName: selectedProduce } },
          {
            $group: {
              _id: "$produceName",
              stockQuantity: { $sum: "$tonnage" },
              totalExpense: { $sum: "$totalCost" },
              totalProjectedRevenue: {
                $sum: { $multiply: ["$sellingPrice", "$tonnage"] },
              },
            },
          },
        ]);

        res.render("reports", {
          title: "Reports",
          produces: items,
          totalcereals: totalCereals[0],
          totallegumes: totalLegumes[0],
          totalcrop: totalCrop[0],
        });
      } catch (error) {
        res.status(400).send("unable to find items in the database");
        console.log(error);
      }
    } else {
      res.send("This page is only accessed by managers");
    }
  }
);
