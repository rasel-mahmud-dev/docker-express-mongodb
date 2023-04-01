const express = require("express")
const isAuth  = require("../middlewares/auth");
const {getAllPosts, createPost, getPostDetail} = require("../controllers/postController");


const router = express.Router()

router.get("/",  isAuth, getAllPosts)
router.get("/:postId",  isAuth, getPostDetail)
router.post("/", isAuth, createPost)


module.exports = router