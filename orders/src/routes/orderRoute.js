
const express = require("express");
const { getAllOrders, deleteOrder} = require("../controllers/orderController");
const auth = require("../middlewares/auth")


const router = express.Router()

router.get("/",    auth, getAllOrders)
router.delete("/:orderId", auth,  deleteOrder)



module.exports = router