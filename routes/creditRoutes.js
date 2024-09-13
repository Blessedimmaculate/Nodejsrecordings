const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// import model
const Credit = require('../models/credit');
const Procure = require('../models/procure');


router.get('/debit',
    //  connectEnsureLogin.ensureLoggedIn(), 
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
            return res.status(400).send('Not enough stock available');
        }
        
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
    //  connectEnsureLogin.ensureLoggedIn(), 
     async (req, res) => {
    try{
       const creditItems = await Credit.find().sort({ $natural: -1 });
       res.render('creditlist', {
       title: "Credit List",
       credits: creditItems,
       user: req.user

    });

    } catch (error) {
        res.status(404).send("Unable to find items in the db");
}
});



router.get("/updateCredit/:id", 
    // connectEnsureLogin.ensureLoggedIn(), 
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
router.post("/updateCredit", async (req, res) => {
    try {
        await Credit.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect("/creditList");
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});


// delete Produce
router.post("/deleteCredit", async (req, res) => {
    try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect("back");
    } catch (err) {
    res.status(400).send("Unable to delete item in the database");
    }
    });
   
   

    router.get("/creditReceipt/:id", 
        // connectEnsureLogin.ensureLoggedIn(), 
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