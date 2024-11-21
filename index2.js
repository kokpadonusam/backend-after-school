var express = require("express");
let app = express();
app.set('json spaces', 3);
// const cors = require("cors");
// app.use(cors());

// In your main file (e.g., app.js)
// let myProduct= require('./lessons.js');

// Middleware function
app.use((req, res, next) => {
    console.log("In comes a request to: " + req.url);
    next(); // Ensure next middleware or route is called before sending response
  });

  app.get("/", (req, res) => {
    res.send("Welcome to our homepage!");
  });

  app.get("/collections/lessons", (req, res)=> {
   // res.send("This is the collections/products page");
   //console.log();
    // res.json(myProduct);
  });

  app.post("/", function(req, res) {
    res.send("a POST request? Let’s create a new element");
   });

   app.put("/", function(req, res) {
    res.send ("Ok, let’s change an element");
   });

   app.delete("/", function(req, res) {
    res.send("Are you sure??? Ok, let’s delete a record");
   });

   app.use((req, res) => {
    res.status(404).send("Resource not found");
  }); //must be at the end

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });