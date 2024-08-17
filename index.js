// DEPENDENCES
const express = require('express');


// INSTANTIATIONS
const app = express();




// CONFIGURATIONS
// IMPORT ROUTES
const studyRoutes = require("./routes/studyRoutes")



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
app.use("/", studyRoutes)



//Shd not be put above other endpoints
// for non existing pages
app.get("*", (req, res) => {
    res.send("error! Page does not exist");
})



// bootstrapping a server
app.listen(3001, () => console.log('listening on port 3001'));