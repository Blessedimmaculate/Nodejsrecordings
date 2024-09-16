const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// import model
const Credit = require('../models/credit');
const Procure = require('../models/procure');


router.get('/debit',
      connectEnsureLogin.ensureLoggedIn(), 
(req, res) => {
    res.render('credit',{title: "Sales"});
})

router.post('/debit', async (req, res) => {
    try {
        const { produceName, tonnage } = req.body;
        
        // Find the procure item
        let procure = await Procure.findOne({ produceName });
        
        if (!procure) {
            return res.status(404).send('Produce not found');
        }
        
        // Check stock availability
        if (procure.stock < tonnage) {
            return res.status(400).send(`Not enough tonnage in stock. Only ${procure.stock} Kgs available`);
        }
        
        // If enough stock is available, pass the stock value to the Pug template
        res.render('credit', {
            procureStock: procure.stock // Passing stock to the Pug template
        });
        
        // Update stock and save procure item
        procure.stock -= tonnage;
        await procure.save();
        
        // Create a new sales entry
        const newCredit = new Credit(req.body);
        await newCredit.save();
        
        res.redirect('/creditList');
    } catch (err) {
        console.error('Error handling sale:', err);
        res.status(500).send('Server error');
    }
});


router.get('/creditList', 
    async (req, res) => {
    try {
      // Find all credit items, sorted by the most recent
      const creditItems = await Credit.find().sort({ $natural: -1 });
  
      // Aggregation query to calculate total amountPaid and total amountDue
      const totals = await Credit.aggregate([
        {
            $project: {
              amountPaid: { $toDouble: "$amountPaid" },
              amountDue: { $toDouble: "$amountDue" }
            }
          },
        {
          $group: {
            _id: null,  // Group all documents
            totalAmountPaid: { $sum: "$amountPaid" },
            totalAmountDue: { $sum: "$amountDue" }
          }
        }
      ]);
  
      // Safeguard in case no credits found
      const totalAmountPaid = totals.length > 0 ? totals[0].totalAmountPaid : 0;
      const totalAmountDue = totals.length > 0 ? totals[0].totalAmountDue : 0;
  
      // Debugging: Log the calculated totals
      console.log("Total Amount Paid:", totalAmountPaid);
      console.log("Total Amount Due:", totalAmountDue);
  
      // Render the template and pass the data
      res.render('creditlist', {
        title: "Credit List",
        credits: creditItems,
        totalAmountPaid: totalAmountPaid,  // Pass total amount paid
        totalAmountDue: totalAmountDue,    // Pass total amount due
        user: req.user
      });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(404).send("Unable to find items in the db");
    }
  });
  
  
  
  

router.get("/updateCredit/:id", 
     connectEnsureLogin.ensureLoggedIn(), 
    async (req, res) => {
    try {
        const item = await Credit.findOne({ _id: req.params.id })
        res.render("updateCredit", {
            credit: item,
            title: "Update Produce",
            user: req.user,
        })
    } catch(error) {
        res.status(400).send("Unable to find item in the database");
    }
    
    
});


// post updated produce
router.post("/updateCredit", 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
    try {
        await Credit.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/creditList");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});


// delete Produce
router.post("/deleteCredit", 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
    try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect("back");
    } catch (err) {
    res.status(400).send("Unable to delete item in the database");
    }
    });
   

    
   

    router.get("/creditReceipt/:id",
        connectEnsureLogin.ensureLoggedIn(), 
        async (req, res) => {
        try{
            const credit = await Credit.findOne({_id: req.params.id})
            .populate("produceName","produceName")
            .populate("salesagent","name");
            console.log("my sale",credit)
            res.render("creditReceipt",{
                credit,
                title: "Receipt"
            });
        } catch (error) {
            res.status(400).send("The item isn't in the database")
        }

    })




module.exports = router;