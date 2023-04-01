const express = require("express");



const commentsRoute  = require("../routes/commentsRoute")

const router = express.Router()


router.use("/api/comments", commentsRoute)


module.exports = router