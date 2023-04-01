const express = require("express");

const productRoute  = require("../routes/productRoute")
const router = express.Router()


router.use("/api/products", productRoute)

module.exports = router