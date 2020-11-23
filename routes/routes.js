const express = require("express");
const router = express.Router();
const app = express();

const controller = require("../controllers/shopController");

// Routes
router.get('/', (req, res) => {
    app.set('layout', 'layouts/app')
    res.render('index',{
        title: "Home page"
    })
})

//Showing login form 
router.get("/login", function (req, res) { 
    app.set('layout', false)
    res.render('auth/login', {
        title: "Log in"
    });
}); 

router.get("/welcome", function (req, res) { 
    app.set('layout', false)
    res.render('auth/welcome', {
        title: "Sign Up"
    });
}); 

// router.get("/", controller.getHomePage);
// router.get("/login", controller.getLogIn);
// router.get("/welcome", controller.getWelcome);


module.exports = router;