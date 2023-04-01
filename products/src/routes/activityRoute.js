const express = require("express")

const {createActivity, getAllActivity, updateActivity, deleteActivity}  = require("../controllers/activityController");
const isAuth  = require("../middlewares/auth");


const router = express.Router()

router.get("/api/activities",  isAuth, getAllActivity)


router.post("/api/create-activity", isAuth, createActivity)


router.put("/api/update-activity", isAuth, updateActivity)

router.delete("/api/activities/:activityId", isAuth, deleteActivity)


module.exports = router