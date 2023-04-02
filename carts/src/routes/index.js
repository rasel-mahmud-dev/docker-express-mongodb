const express = require("express");

const cartRoute  = require("../routes/cartRoute")
const router = express.Router()


router.use("/api/carts", cartRoute)

module.exports = router