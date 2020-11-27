const upload = require('../services/ImageUpload')
const express = require("express");
const routes = express.Router();

routes.route("/upload").post(upload.single('img'), (req, res) => {
    let details = JSON.parse(req.body.details)
    let imageName = '';
    if (req.file) {
        imageName = req.file.filename
    }
});


module.exports = routes;