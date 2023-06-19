const express = require('express');
const app = express();
// the dotenv package allows us to read variables
// from the .env files
const dotenv = require('dotenv').config();
const ejs = require('ejs');

// instruct Express to how to serve static files
// the first argument to the static function is the folder
// where all the static files should be
app.use(express.static('public'));

// inform express that we are using ejs as our template engine
app.set('view engine', 'ejs');

// middlewares are functions that are called before
// the request reaches the route

// the next argument is the next middleware to
// call or the route to call
app.use(function(req,res,next){
    // all EJS file will have the title avaiable
    res.locals.title = "My Awesome Page";

    // invoke the next middleware
    next();
})
// the building block of an express application are routes
// a route is essentially a URL fragement (or a path) associated with a function

app.get('/', function(req,res){
   res.render('home')
})

app.get('/luckyNumber', function(req,res){
    const n = Math.floor(Math.random() * 100 + 1);
    res.render('lucky', {
        'luckyNumber': n
    })
})

// create a GET route with app.get
// when the server recieves a request targeting '/about-us'
// call the function in second argument
app.get('/about-us', function(req, res){
    // req is an object representing the request
    // res is an object representing what the server will send back to the client
    res.send("About Us");
})

// routes can have parameters
// eg. /greet/paul
app.get('/greet/:name', function(req,res){
    const name = req.params.name;
    res.send("Hello " + name);
})

app.get('/sumTwo/:number1/:number2', function(req,res){
    const n1 = parseInt(req.params.number1);
    const n2 = parseInt(req.params.number2);
    res.send("Sum = " + (n1 + n2));
})

// register a helper
// the today() function will be available in all EJS files
app.locals.today = function() {
    return new Date().toLocaleDateString();
}


// start at port 3000
app.listen(process.env.PORT || 3000 , function(){
    console.log("Server has started");
})