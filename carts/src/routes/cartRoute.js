const express = require("express");
const {deleteCartItem, getCartItems, countCartItems, createCart} = require("../controllers/cartController");
const auth = require("../middlewares/auth")


const router = express.Router()

router.get("/",  getCartItems)
router.post("/",  createCart)
router.delete("/:cartId", auth, deleteCartItem)
router.get("/count", auth, countCartItems)


module.exports = router