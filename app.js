const express = require("express"),
        bodyParser = require('body-parser'),
        expressLayout = require('express-ejs-layouts'),
        app = express(),
        port = 3000,
        routes = require("./routes/routes"),
        database = require("./services/dbConnection");

// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')
app.use(expressLayout)

// Routes
app.get('/', (req, res) => {
    res.render('index',{
        title: "Home page"
    })
})

//Showing login form 
app.get("/login", function (req, res) { 
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    });
}); 

app.get("/welcome", function (req, res) { 
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    });
}); 

app.get('/dashboard', (req,res)=>{
    res.render('layouts/dashboard', {
        title : "Shop Dashboard"
    })
})

app.get('/product', (req,res)=>{
    res.render('layouts/product', {
        title : "Shop Product"
    })
})

app.get('/order', (req,res)=>{
    res.render('layouts/order', {
        title : "Shop Order"
    })
})

app.use(routes);
database.connect();

app.listen(port, console.log(`Listening to port ${port}!`))