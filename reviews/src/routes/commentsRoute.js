const express = require("express")

const isAuth  = require("../middlewares/auth");
const {getComments, createComments} = require("../controllers/commentsController");

const router = express.Router()

router.get("/:postId",  isAuth, getComments)
router.post("/", isAuth, createComments)



module.exports = router