const express = require('express');
const router = express.Router();const ensureLoggedIn = require('connect-ensure-login');
const connectEnsureLogin = require('connect-ensure-login');

// Import models
const Sales = require('../models/sales');
const Procure = require('../models/procure');


<<<<<<< HEAD
router.get('/makeSale', 
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
=======
router.get('/makeSale', (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
    res.render('sales', { title: "Sales" });
});


router.post('/makeSale', async (req, res) => {
    try {
        const { produceName, tonnage } = req.body;
        
        
        let procure = await Procure.findOne({ produceName });
        
        if (!procure) {
            return res.status(404).send('Produce not found');
        }
        
       
        if (procure.stock < tonnage) {
            return res.status(400).send('Not enough stock available');
        }
        
        
        procure.stock -= tonnage;
        await procure.save();
        
        
        const newSales = new Sales(req.body);
        await newSales.save();
        
        res.redirect('/salesList');
    } catch (err) {
        console.error('Error handling sale:', err);
        res.status(500).send('Server error');
    }
});

// Route to display the list of sales
router.get('/salesList', 
<<<<<<< HEAD
    async (req, res) => {
    try {
      // Find all sales items, sorted by the most recent
      const salesItems = await Sales.find().sort({ $natural: -1 });
  
      // Aggregation query to calculate total sales
      const totalSales = await Sales.aggregate([
        { $group: { _id: null, total: { $sum: "$totalpayment" } } }
      ]);
  
      // Safeguard against no sales found
      const totalAmount = totalSales.length > 0 ? totalSales[0].total : 0;
  
      // Render the template and pass the data
      res.render('saleslist', {
        title: "Sales List",
        saless: salesItems,
        totalAmount: totalAmount, // Pass the total amount
        user: req.user
      });
    } catch (error) {
      res.status(404).send("Unable to find items in the db");
    }
  });
  


// Route to get the update form for sales
router.get('/updateSales/:id', 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
=======
    // connectEnsureLogin.ensureLoggedIn(), 
    async (req, res) => {
    try {
        const salesItems = await Sales.find().sort({ $natural: -1 });
        res.render('saleslist', {
            title: "Sales List",
            saless: salesItems,
            user: req.user
        });
    } catch (error) {
        res.status(404).send("Unable to find items in the db");
    }
});

// Route to get the update form for sales
router.get('/updateSales/:id', async (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
    try {
        const item = await Sales.findOne({ _id: req.params.id });
        res.render('updateSales', {
            title: "Update Sales",
            sales: item
        });
    } catch (error) {
        res.status(400).send("Unable to find item in the database");
    }
});

// Route to post updated sales
<<<<<<< HEAD
router.post('/updateSales', 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
=======
router.post('/updateSales', async (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
    try {
        await Sales.findOneAndUpdate({ _id: req.query.id }, req.body);
        res.redirect('/salesList');
    } catch (err) {
        res.status(404).send("Unable to update item in the database");
    }
});

// Route to delete a sales item
<<<<<<< HEAD
router.post('/deleteSales', 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
=======
router.post('/deleteSales', async (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
    try {
        await Sales.deleteOne({ _id: req.body.id });
        res.redirect('back');
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
});

// Route to view receipt
<<<<<<< HEAD
router.get('/receipt/:id', 
    connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
=======
router.get('/receipt/:id', async (req, res) => {
>>>>>>> 0a97a5ccf0f3eabd376384ebab1ab8c87bb4508d
    try {
        const sales = await Sales.findOne({ _id: req.params.id })
            .populate('produceName', 'produceName')
            .populate('salesagent', 'name');
        res.render('receipt', {
            sales,
            title: 'Receipt'
        });
    } catch (error) {
        res.status(400).send("The item isn't in the database");
    }
});

module.exports = router;
