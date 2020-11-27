const upload = require('../services/ImageUpload')
const express = require("express");
const { Product } = require('../models');
const routes = express.Router();

routes.route("/add").post(upload.single('image'), (req, res) => {
    let image = '';
    if (req.file) {
        image = req.file.filename
    }
let details = JSON.parse(req.body.details);
details.image = image;

let product = new Product(details);
    product.save((err, product)=>{
        if (err) {
            res.status(500).send({error: err})
        }
         res.send({message:'new product' ,  product })
    })
});


module.exports = routes;