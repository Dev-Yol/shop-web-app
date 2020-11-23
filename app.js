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

  

app.use(routes);
database.connect();

app.listen(port, console.log(`Listening to port ${port}!`))