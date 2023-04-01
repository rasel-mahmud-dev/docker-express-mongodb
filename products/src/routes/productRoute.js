
const express = require("express");
const {createProduct, getAllProduct, buyProducts, getProductDetail} = require("../controllers/productController");
const auth = require("../middlewares/auth")


const router = express.Router()

router.get("/",    getAllProduct)

router.get("/:slug",    getProductDetail)

router.post("/", auth, createProduct)

router.post("/buy", auth, buyProducts)


module.exports = router