const express = require("express")
const bodyParser = require('body-parser')
const expressLayout = require('express-ejs-layouts')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.set('layout', 'layouts/app')
app.use(expressLayout)


app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send("Welcome");
})


app.listen(port, () => console.log(`Server is running in port ${port}`))