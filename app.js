const express = require("express"),
    bodyParser = require('body-parser'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3000;

// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')
app.use(expressLayout)


app.get("/auth/login", function(req, res) {
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    })
})

app.get("/auth/welcome", function(req, res) {
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    })
})

app.get('/', (req, res) => {
    res.render('index', {
        title: "Shoe Shop"
    })
})
app.get('*', (req, res) => {
    res.render('pages/404', {
        title: "Page not Found"
    });
})


app.listen(port, console.log(`Listening to port ${port}!`))