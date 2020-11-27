const express = require("express"),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3000,
    db = require("./services/dbConnection")


// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.use(expressLayout)

//Display Log in form
app.get("/auth/login", function (req, res) {
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    })
})
// //Handling user login 
// app.post("/login", passport.authenticate("local", { 
//     successRedirect: "/secret", 
//     failureRedirect: "/login"
// }), function (req, res) { 
// }); 
  
// //Handling user logout  
// app.get("/logout", function (req, res) { 
//     req.logout(); 
//     res.redirect("/"); 
// }); 
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 

app.get("/auth/welcome", function (req, res) {
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    })
})

app.get('/', (req, res) => {
    app.set('layout', 'layouts/app')
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
// This is routes for admin
app.get('/admin/index', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/index', {
        title: "Dashboard"
    });
});

app.get('/admin/product', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/product', {
        title: "Product"
    });
});

app.get('/admin/order', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/order', {
        title: "Order"
    });
});

app.get('/admin/customer', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/customer', {
        title: "Customer"
    });
});

app.get('/admin/product/adding-new-product', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/addProduct', {
        title: "Adding Product"
    });
});

app.get('/admin/product/updating-product-details', (req, res)=>{
    app.set('layout','admin/adminLayout/app' )
    res.render('admin/adminPages/updateProduct', {
        title: "Updating Product"
    });
});

// this is for generic routes error
app.get('*', (req, res) => {
    app.set('layout', false)
    res.render('pages/404', {
        title: "Page not Found"
    });
})

app.use("/api/products", require("./router/product"))
app.use("/api/auth", require("./router/auth"))
app.use('/images', express.static(path.join(__dirname, 'public/uploads')))

db.connect();
app.listen(port, console.log(`Listening to port ${port}!`))