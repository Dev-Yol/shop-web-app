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


app.get("/login", function(req, res) {
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    })
})

app.get("/welcome", function(req, res) {
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    })
})

app.get('/', (req, res) => {
    res.render('index', {
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

app.get('/admin/index', (req, res)=>{
    res.render('admin/index', {
        title: "Admin Homepage"
    });
});
app.get('*', (req, res) => {
    res.render('pages/404', {
        title: "Page not Found"
    });
});

app.listen(port, console.log(`Listening to port ${port}!`))