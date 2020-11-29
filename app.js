const express = require("express"),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressLayout = require('express-ejs-layouts'),
    app = express(),
    port = 3001,
    db = require("./services/dbConnection")
const { Product, Account } = require("./models")


// Static Files
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.use(expressLayout)


// function isLoggedIn(req, res, next) {
//     res.redirect("/login");
// }
app.get("/auth/login", function (req, res) {
    app.set('layout', false)
    res.render('auth/login', {
        title: "Sign In"
    })
})

app.get("/auth/registration", function (req, res) {
    app.set('layout', false)
    res.render('auth/registration', {
        title: "Sign Up"
    })
})

app.get("/user/order/:id", async function (req, res) {
    app.set('layout', 'layouts/app')
    let id = req.params.id
    if (!id) {
        res.redirect("/")
    }
    try {
        Product.findById(id, (err, product) => {
            if (err) {
                return res.redirect("/")
            }
            res.render('pages/order', {
                title: "Add to Cart",
                product,
                image: JSON.parse(JSON.stringify(product)).image
            })
        })
    } catch (error) {
        return res.redirect("/")
    }
})

app.get("/user/homepageUser", function (req, sres) {
    res.render('user/homepageUser', {
        title: "User",
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
        ],
        layout: 'layouts/app'
    })
})
app.get("/", (req, res) => {
    res.redirect("/products")
})
app.get('/products/:page?', async (req, res) => {
    app.set('layout', 'layouts/app')
    let data = [];
    let perPage = 8;
    var page = req.params.page || 1
    let count = 0;
    try {
        data = await Product.find({})
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
    } catch (error) {
        data = []
    }
    return res.render('pages/homepage', {
        title: "Shoe Shop",
        current: page,
        pages: Math.ceil(count / perPage),
        data: JSON.stringify(data),
        layout: 'layouts/app'
    })
})
// This is routes for admin
app.get('/admin/index', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/index', {
        title: "Dashboard"
    });
});

app.get('/admin/product', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/product', {
        title: "Product"
    });
});

app.get('/admin/order', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/order', {
        title: "Order"
    });
});

app.get('/admin/customer', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/customer', {
        title: "Customer"
    });
});

app.get('/admin/product/adding-new-product', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/addProduct', {
        title: "Adding Product"
    });
});

app.get('/admin/product/updating-product-details', (req, res) => {
    app.set('layout', 'admin/adminLayout/app')
    res.render('admin/adminPages/updateProduct', {
        title: "Updating Product"
    });
});

app.get("/seed", (req, res) => {
    Account.find({}, (err, data) => {
        res.send({ err, data })
    })
})

// this is for generic routes error
app.get('*', (req, res) => {
    app.set('layout', false)
    return res.render('pages/404', {
        title: "Page not Found"
    });
})

// app.get('/products/:page', function (req, res, next) {
//     var perPage = 8
//     var page = req.params.page || 1
//     Product
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function (err, products) {
//             Product.count().exec(function (err, count) {
//                 if (err) return next(err)
//                 res.render('main/products', {
//                     products: products,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 })
//             })
//         })
// })


app.use("/api/products", require("./router/product"))
app.use("/api/auth", require("./router/auth"))

db.connect();
app.listen(port, console.log(`Listening to port ${port}!`))