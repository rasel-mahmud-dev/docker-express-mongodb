
const express = require("express");
const {createOrder, getAllOrders} = require("../controllers/orderController");
const auth = require("../middlewares/auth")


const router = express.Router()

router.get("/",    getAllOrders)


router.post("/", auth, createOrder)



module.exports = router