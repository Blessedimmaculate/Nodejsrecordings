// DEPENDENCES
const express = require('express');
const path = require("path");  //path is inbuilt not installed



// INSTANTIATIONS
const app = express();




// CONFIGURATIONS
// IMPORT ROUTES
const studyRoutes = require("./routes/studyRoutes")




// PUG FILE
// Set d view engine to pug 
app.set('view engine', 'pug') //specifies the view engine is pug

// to help us access the views we hv imported in the routes
// set the views path
// the first view stands for d directory for d uy pages
// uy pages are to be found a folder called views
// the last view stand for the directory studyRoutes
app.set("views", path.join(__dirname, "views")); //specifies d view directory



// MIDDLEWARE
// Help to monitor tym
app.use(express.urlencoded({extended: true}));

// this shows tym
app.use((req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
  });

//we attach a middleware to an end point 
//Simple request time logger for a specific route
app.use('/first', (req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
  });


// ROUTES
// are moved to d routes folder and then imported in index.js
// Use routes or use imported routes
// Behaves like a middle ware but here we are using routes
app.use("/", studyRoutes);



//Shd not be put above other endpoints
// for non existing pages
app.get("*", (req, res) => {
    res.send("error! Page does not exist");
})



// bootstrapping a server
app.listen(3001, () => console.log('listening on port 3001'));