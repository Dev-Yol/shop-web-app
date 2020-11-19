const express = require("express")
const bodyParser = require('body-parser')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000

// Static Files
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set Templating Engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')
app.use(expressLayout)

// Routes
app.get('', (req, res) => {
    res.render('index',{
        title: "Home page"
    })
})




app.listen(port, console.log(`Listening to port ${port}!`))