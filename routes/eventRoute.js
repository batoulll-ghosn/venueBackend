const express = require("express");
const router = express.Router();
const control = require("../controller/eventControl");
router.get("/getEvents", control.getAllEvents);
router.post("/addEvent", control.postEvent);
router.get("/getEventById/:id", control.EventById);
router.delete("/deleteEvent/:id", control.deleteAllEvents);
router.put("/updateEvent/:ID", control.updatedEvent);
module.exports = router;
