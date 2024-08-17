// DEPENDENCES
// These are the ones that we install
// require is the same as import
// app is a variable that points to express that we installed
// line 4 shd keep at the top coz it is the beginning
const express = require('express');


//2. ISTANTIATIONS
// U declare a variable and u assign a value
const app = express();


//3. CONFIGURATIONS
// Files dat we've done in another place and then brought
// or for using a pug
// for setting how to access our css and images
// where to find our static files


//4. MIDDLEWARE   
// control the flow of the request-response cycle
// app.use is the middleware
// Fetches data from d form to d console or database 
app.use(express.urlencoded({extended: true}));


//5. ROUTES
// WE A RETURNING A MESSAGE
app.get('/', (req, res) => { // new
    res.send('Homepage! Hello world.');
});

app.get('/about', (req, res) => { // new
    res.send('About page. Nice.');
});

app.post('/addmember', (req, res) => { // new
    res.send('These are member details');
});


//PATH PARAMS
//get profile from database using the username
app.get("/profile/:username", function (req, res){
    var username = req.params.username;
})

//PATHPARAMETERS   Whatever name U use is a path parameter
app.get("/pathparams/:name", (req, res) => {
    res.send("My param is " + req.params.name);
});


//QUERY PARAMS a qn mark is used   QN MARK is the beginning of d query string
//U can search by gender and  age
//key is class
// localhost:3001/students?class=Nodejs&cohort=16
app.get("/students?", (req, res) => {
    res.send("This is Immaculate from " + req.query.class + " class and " + req.query.cohort + " cohort " + req.query.age + " age");
});

app.get("/member?", (req, res) => {
    res.send("This is a student from " + req.query.gender + " and " + req.query.age);
});

// name is a value name, cohort, class is a search creteria
// we later eliminate the content after ? but it will be provided in the browser
// This content after ? is the query and used on get mtd
app.get("/persons?name=Irene&class=Javascript&cohort=cohort16", (req, res) => {
    res.send("This is " + req.query.name + " from " + req.query.class + " class " + req.query.cohort + " cohort ");
});


// WE A RETURNING A FILE
//SERVING HTML FILES
// Get route for a file in the same directory
// __dir specifies the directory
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

// 6. BOOTSTRAPPING SERVER
// 3000 assigns exprees to run on port 3000 don't go below 3000
// listen gives the info
// SERVER
app.listen(3001, () => console.log('listening on port 3001'));
