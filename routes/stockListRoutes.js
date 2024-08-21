const express = require('express');
const router = express.Router();

const Stock = require("../models/stock");

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

// Retrieve a single produce item and render the update form
router.get("/updateProduce/:id", async (req, res) => {
    try {
        const item = await Stock.findOne({ _id: req.params.id });
        res.render("updateStock", {  // Change to the correct Pug template
            title: "Update Produce",
            produce: item,
        });
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
});

// Handle the submission of the updated produce form
router.post("/updateProduce", async (req, res) => {
    try {
        await Stock.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/viewProduce");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});

// Delete Produce
router.post("/deleteProduce", async (req, res) => {
    try {
        await Stock.deleteOne({ _id: req.body.id });
        res.redirect("back");
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
});

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Stock = require("../models/stock");         

// router.get("/viewProduce", async (req, res) => {
//     try {
//         //for Stock, u use where U saved in the records router coz this is a list
//         //title appears on d tab
//         //produces is wat we a gonna call it in d pug file. procuredProduce name can be maintained
//         //Natural--Wn U find data frm d db u want to sort
//         //Natural makes the one U put last to appear on top
//         const procuredProduce = await Stock.find().sort({$natural:-1});  // Use StockList model here
//         res.render("stockList", {  // Make sure the Pug template name matches
//             title: "Stock List", 
//             produces: procuredProduce,
//         });
//     } catch (error) {
//         res.status(400).send("Unable to find items in the database");
//     }
// });


// // RETRIEVE PRODUCE FROM D DATABASE
// // item is d one picked frm d database
// // get produce update form
// //And Produce is refered to by mongodb
// // await Produce is the same as the above in the list /viewProduce
// // Brings a form   id is provided by d db in mongoose automatically
// // req.param will be seen on d tab
// router.get("/updateProduce/:id", async (req, res) => {
//     try {
//     const item = await Stock.findOne({ _id: req.params.id });
//     res.render("/viewProduce", {
//     title: "Update Produce",
//     produce: item,
//     });
//     } catch (err) {
//     res.status(400).send("Unable to find item in the database");
//     }
//     });
    
//     // posts updated produce
//     // we don't put d id coz it has been already captured
// router.post("/updateProduce", async (req, res) => {
//     try {
//     await Stock.findOneAndUpdate({ _id: req.query.id }, req.body);
//     res.redirect("/stockList");
//     } catch (err) {
//     res.status(404).send("Unable to update item in the database");
//     }
//     });

//     // delete Produce
// router.post("/deleteProduce", async (req, res) => {
//     try {
//     await Stock.deleteOne({ _id: req.body.id });
//     res.redirect("back");
//     } catch (err) {
//     res.status(400).send("Unable to delete item in the database");
//     }
//     });

// module.exports = router;






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





