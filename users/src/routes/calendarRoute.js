const express = require("express")

const auth = require("../middlewares/auth");
const {createEvent, myEvents, allEvents} = require("../controllers/calendarController");


const router = express.Router()

router.get("/myevent", auth, myEvents)
router.get('/allevents', auth, allEvents)
router.post("/create", auth, createEvent)


module.exports = router