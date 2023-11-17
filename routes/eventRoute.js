const express = require("express");
const router = express.Router();
const control = require("../controller/eventControl");
router.get("/getEvents", control.getAll);
router.post("/addEvent", control.addEvent);
router.get("/getEventById/:ID", control.getByID);
router.delete("/deleteEvent/:ID", control.deleteByID);
router.put("/updateEvent/:ID", control. updateByID);
module.exports = router;
