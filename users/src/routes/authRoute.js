
const express = require("express");
const {login, register, verifyAuth} = require("../controllers/authController");


const router = express.Router()


router.get("/verify", verifyAuth)
router.post("/login", login)
router.post("/registration", register)


module.exports = router