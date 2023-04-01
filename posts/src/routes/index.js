const express = require("express");


const router = express.Router()

const postRoute = require("./postRoute")

router.use("/api/posts", postRoute)

module.exports = router