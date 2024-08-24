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





const express = require("express");
const router = express.Router();
// const connectEnsureLogin = require("connect-ensure-login")


const Sale = require("../models/Sale");
const Stock = require("../models/stock");
const Register = require("../models/register"); 





router.get("/addSale/:id", async (req, res) => {
  try {
    const agents = await Register.find({ role: "salesagent" });
    const produce = await Stock.findOne({ _id: req.params.id });
    res.render("add_sale", {
      title: "Sale",
      agents: agents,
      produce: produce,
    });
  } catch (error) {
    res.status(400).send("Unable to find sales agents in the database");
  }
});

// we create a saletonnage pointing to add_sale pug
router.post("/addSale/:id", async (req, res) => {
  try {
    const { saleTonnage } = req.body;
    // saleTonnage is the same as req.body.saleTonnage, it's an input name in the add sale pug file
    const produce = await Stock.findById({ _id: req.params.id });
    if (!produce) {
      return res.status(404).send("produce not found");
    }

    if (produce.tonnage < saleTonnage) {
      return res
        .status(400)
        .send(
          `Not enough tones in stock,there are ${produce.tonnage} Kgs in stock`
        );
    }
    if (produce && produce.tonnage > 0) {
      const newsale = new Sale(req.body);
      await newsale.save();
      produce.tonnage -= saleTonnage; // short form of what is below
      // produce.tonnage = produce.tonnage - saleTonnage // long form of the above
      await produce.save();
      res.redirect("/salesList");
    } else {
      return res.status(404).json({ error: "Produce out of stock" });
    }
  } catch (error) {
    console.error("Error saling produce:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// retrieve sales from the database
// Populate mthd d 1st produceName referss to d first produceName ind Sale collection
// D 2nd produceName refers to d source in the stockList collection
// Hence populating d name frm d source
router.get("/salesList", async (req, res) => {
  try {
    const sales = await Sale.find()
      .sort({ $natural: -1 })
      .populate("produceName", "produceName")
      .populate("salesAgent","username");
    res.render("sales_list", {
      title: "Sales List",
      sales: sales,
    });
  } catch (error) {
    res.status(400).send("Unable to find items in the database");
  }
});


// Function to format the date
function formatDate(date){
    return date.toISOString().split("T")[O];
}
// Get sale update form
router.get("/updateStock/:id", async (req, res) => {
    try {
        const sale = await Sale.findOne({_id:req.params.id})
        .populate("producename", "produceName")
        const formattedDate = formatDate(sale.saledate);
        res.render("edit_sale",{
            sale,
            formattedDate,
            title: "Update Sale"
        })
    } catch (error) {
        res.status(400).send("Unable to find item in the database");
        }
})




module.exports = router;


// TO AUTHORISE A CERTAIN USER
//  router.get("/addSale/:id", async (req, res) => {
//   try {
//     if(req.user.role == "salesagent"){
//     const agents = await Register.find({ role: "salesagent" });
//     const produce = await Stock.findOne({ _id: req.params.id });
//     res.render("add_sale", {
//       title: "Sale",
//       agents: agents,
//       produce: produce,
//     });
//   }    else{res.send("This page is only accessed by Sales agents")
//    }
//   }catch (error) {
//     res.status(400).send("Unable to find sales agents in the database");
//   }
// });