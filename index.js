// DEPENDENCES
const express = require('express');


// INSTANTIATIONS
const app = express();




// CONFIGURATIONS




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
app.get('/', (req, res) => { // new
    res.send('Homepage! Hello world.');
});

app.get("/first", (req, res) => {
    res.sendFile (__dirname + "/index.html")
})

app.get("/quotes", (req, res) =>{
    res.sendFile (__dirname + "/quotes.html")
})

app.post("/quotes", (req, res) =>{
   console.log(req.body)
})

//Shd not be put above other endpoints
// for non existing pages
app.get("*", (req, res) => {
    res.send("error! Page does not exist");
})



// bootstrapping a server
app.listen(3001, () => console.log('listening on port 3001'));