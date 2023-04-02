const express = require("express");

const orderRoute  = require("../routes/orderRoute")
const auth = require("../middlewares/auth");
const router = express.Router()


router.use("/api/orders", auth, orderRoute)

module.exports = router