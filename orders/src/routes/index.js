const express = require("express");

const orderRoute  = require("../routes/orderRoute")
const router = express.Router()


router.use("/api/orders", orderRoute)

module.exports = router