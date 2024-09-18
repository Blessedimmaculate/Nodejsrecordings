const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');


// import model
const Procure = require('../models/procure');

router.get('/produce', 
   connectEnsureLogin.ensureLoggedIn(), 
  (req, res) => {
    res.render('procure', { title: "Produce" });
})

router.post('/produce', async (req, res) => {
    try {
        const newProcure = new Procure(req.body);
        await newProcure.save();
        res.redirect('/produceList');
    } catch (error) {
        res.status(404).send("unable to save produce to db");
    }
})


router.get('/produceList', 
  async (req, res) => {
  try {
    // Find all procure items, sorted by the most recent
    const procureItems = await Procure.find().sort({ $natural: -1 });

    // Aggregation query to calculate totalCost
    const totalCostResult = await Procure.aggregate([
      {
        $group: {
          _id: null,  // Group all documents
          totalCost: { $sum: "$totalcost" } // Replace `totalCost` with the correct field name if different
        }
      }
    ]);

    // Safeguard in case no procure items found
    const totalCost = totalCostResult.length > 0 ? totalCostResult[0].totalCost : 0;

    // Render the template and pass the data
    res.render('procurelist', {
      title: "Produce List",
      procures: procureItems,
      totalCost: totalCost, // Pass total cost to the view
      user: req.user
    });
  } catch (error) {
    console.error("Error fetching procure list:", error);  // Log the error for debugging
    res.status(404).send("Unable to find items in the db");
  }
});



router.get('/produceList',  
  // connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
    try {
        const procureItems = await Procure.find().sort({ $natural: -1 }); 
        res.render('procurelist', {
            title: "Produce List",
            procures: procureItems,
            user: req.user

        });

    } catch (error) {
        res.status(404).send("Unable to find items in the db");
       
    }
});


router.get("/updateProcure/:id", 
   connectEnsureLogin.ensureLoggedIn(), 
  async (req, res) => {
    try {
        const item = await Procure.findOne({ _id: req.params.id })
        res.render("updateprocure", {
            procure: item,
            title: "Update Produce",
            user: req.user,
        })
    } catch(error) {
        res.status(400).send("Unable to find item in the database");
    }
    
    
});


// post updated produce
router.post("/updateProcure", async (req, res) => {
    try {
        await Procure.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/produceList");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});


  

//delete user
// delete Produce
router.post("/deleteProcure", async (req, res) => {
    try {
    await Procure.findByIdAndDelete(req.body.id);
    res.redirect("back");
    } catch (err) {
    res.status(400).send("Unable to delete item in the database");
    }
    });



router.get('/viewstock', async (req, res) => {
    try {
        // Uses aggregation to process data in the 'Procure' collection
        const procure = await Procure.aggregate([
            { 
                // Filters documents to include only specified produce names
                $match: { produceName: { $in: ['Beans', 'Maize', 'Soyabeans', 'Cowpeas', 'Gnuts', 'Rice'] } }
            },
            { 
                // Group the documents by 'produceName' and calculate the total stock for each type
                $group: { 
                    _id: '$produceName',  // Group by 'produceName'
                    totalStock: { $sum: '$stock' }  // Calculate total stock for each produce name
                }
            }
        ]);

        // Transform the results to a simpler format
        const procureData = procure.map(item => ({
            produceName: item._id,  // Set the produce name
            stock: item.totalStock || 0  // Set the total stock or 0 if not available
        }));

        // Render the 'viewstock' template and pass the procure data to it
        res.render('viewstock', {
            procure: procureData,  // Provide the stock data to the view
        });
    } catch (err) {
        // If there is an error, log it and send a 500 Internal Server Error response
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


      
    
module.exports = router;