const express = require("express"),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3001,
    db = require("./services/dbConnection")


// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')
app.use(expressLayout)


app.get("/auth/login", function (req, res) {
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    })
})

app.get("/auth/welcome", function (req, res) {
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    })
})

app.get('/', (req, res) => {
    return res.render('index', {
        title: "Shoe Shop",
        data: [{
            id: 1,
            name: "Waterproof walking shoes for men",
            image: "/image/image8.jpg",
            description: ""
        },
        {
            id: 2,
            name: "Everlane's First Sneaker",
            image: "/image/image9.png",
            description: ""
        },
        {
            id: 3,
            name: "Medical Work Shoe for Men",
            image: "/image/image10.jpg",
            description: ""
        },
        {
            id: 4,
            name: "Adidas Yung-1",
            image: "/image/image11.jpg",
            description: ""
        },
        {
            id: 5,
            name: "White Sneaker",
            image: "/image/image14.jpg"
        },
        {
            id: 6,
            name: "Adidas Running Shoes",
            image: "/image/image13.jpg",
            description: ""
        },
        {
            id: 7,
            name: "Swedish Men's Shoes",
            image: "/image/image15.jpg",
            description: ""
        },
        {
            id: 8,
            name: "Elten Smart Shoes",
            image: "/image/image16.jpg",
            description: ""
        },
        ]
    })
})
app.get('*', (req, res) => {
    app.set('layout', false)
    return res.render('pages/404', {
        title: "Page not Found"
    });
})

app.use("/api/product", require("./router/product"))
app.use("/api/auth", require("./router/auth"))
app.use('/images', express.static(path.join(__dirname, 'public/uploads')))

db.connect();
app.listen(port, console.log(`Listening to port ${port}!`))