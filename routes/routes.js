const express = require("express");
const router = express.Router();

const controller = require("../controllers/shopController");



// router.get("/", controller.getHomePage);
// router.get("/login", controller.getLogIn);
router.post("/login", (req , res)=>{
    let {email  , password} = req.body;
    if (email === "test" && password === "test") {
        return res.json({data:{token : "Lay" } , message:"ok"})
    }
    return res.status(400).json({data:null  , message:"Invalid credentials"})

});
// router.get("/welcome", controller.getWelcome);


module.exports = router;